import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

// El video de obra está exportado cuadro por cuadro (public/film), a 24 cuadros por segundo:
// "d" en 16:9 para pantallas apaisadas y "m" recortado en vertical, siguiendo a cada toma.
const FRAME_COUNT = 516
const LAST = FRAME_COUNT - 1
const DECODE_AHEAD = 6
const framePath = (set, i) => `/film/${set}/${String(i).padStart(3, '0')}.webp`

// Tomas, en cuadros (con fundidos de 12 cuadros entre una y otra):
// 0–96 llana sobre microcemento, 84–180 aplicación en piso, 168–264 equipo en el Movistar Arena,
// 252–348 piso espejado de Pradecon Racing, 336–432 pileta, 420–515 living terminado.
const chapters = [
  {
    from: 100,
    to: 168,
    label: 'Paso 1 de 3',
    title: 'Aplicamos a mano',
    text: 'Microcemento en capas finas y sin juntas, sobre pisos, paredes y mesadas.',
  },
  {
    from: 184,
    to: 252,
    label: 'Paso 2 de 3',
    title: 'Pulimos con equipo propio',
    text: 'Maquinaria profesional y personal de AFG en cada obra. Acá, en el Movistar Arena.',
  },
  {
    from: 268,
    to: 336,
    label: 'Paso 3 de 3',
    title: 'Hasta que el piso refleja',
    text: 'Hormigón pulido con brillo espejo, hecho para tránsito pesado. Nave de Pradecon Racing.',
  },
  {
    from: 352,
    to: 420,
    title: 'También al aire libre',
    text: 'Bordes de pileta, solárium y caminos que aguantan sol y lluvia.',
  },
]

// Primero una pasada gruesa, para poder recorrer todo el video desde el principio.
function coarseOrder() {
  const order = []
  for (const stride of [LAST, 16, 8]) {
    for (let i = 0; i <= LAST; i += stride) {
      if (!order.includes(i)) order.push(i)
    }
  }
  return order
}

const isPortrait = () => window.matchMedia('(orientation: portrait)').matches

function useFrameSet() {
  const [set, setSet] = useState(() => (isPortrait() ? 'm' : 'd'))
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)')
    const onChange = () => setSet(mq.matches ? 'm' : 'd')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return set
}

const toProgress = (frame) => frame / LAST

function Chapter({ chapter, progress }) {
  const a = toProgress(chapter.from)
  const b = toProgress(chapter.to)
  const fade = 0.025
  const opacity = useTransform(progress, [a, a + fade, b - fade, b], [0, 1, 1, 0])
  const y = useTransform(progress, [a, a + fade, b - fade, b], [24, 0, 0, -16])

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0 pointer-events-none">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-28">
        {chapter.label && <p className="text-white/90 text-sm mb-4">{chapter.label}</p>}
        <h2 className="text-white font-medium text-[2.25rem] sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.025em] max-w-[16ch]">
          {chapter.title}
        </h2>
        <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-5 max-w-[38ch]">{chapter.text}</p>
      </div>
    </motion.div>
  )
}

export default function Film() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const positionRef = useRef(0)
  const directionRef = useRef(1)
  const drawnRef = useRef(null)
  const rafRef = useRef(0)
  const sizeRef = useRef(null)
  const set = useFrameSet()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Inercia suave: el video se desliza en vez de seguir cada salto de la rueda o del dedo
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0001 })

  const render = () => {
    rafRef.current = 0
    const canvas = canvasRef.current
    if (!canvas) return
    const frames = framesRef.current
    const position = positionRef.current
    const base = Math.floor(position)
    let img = frames[base]
    for (let d = 1; !img && d <= LAST; d++) img = frames[base - d] || frames[base + d]
    if (!img || !sizeRef.current) return

    // Entre un cuadro y el siguiente se funden según cuánto se bajó, así el movimiento
    // sigue siendo continuo aunque se baje muy despacio.
    const next = img === frames[base] ? frames[base + 1] : undefined
    const blend = next ? Math.round((position - base) * 16) / 16 : 0
    const drawn = drawnRef.current
    if (drawn && drawn.img === img && drawn.next === next && drawn.blend === blend) return

    // El canvas nunca tiene más píxeles que el cuadro: dibujar es mucho más barato
    // y la GPU lo agranda por CSS sin costo.
    const { width: cssW, height: cssH } = sizeRef.current
    const cover = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight)
    const density = Math.min(window.devicePixelRatio || 1, 1 / cover)
    const w = Math.round(cssW * density)
    const h = Math.round(cssH * density)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    const ctx = canvas.getContext('2d', { alpha: false })
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    if (blend > 0) {
      ctx.globalAlpha = blend
      ctx.drawImage(next, (w - dw) / 2, (h - dh) / 2, dw, dh)
      ctx.globalAlpha = 1
    }
    drawnRef.current = { img, next, blend }
  }

  const requestRender = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(render)
  }

  useMotionValueEvent(progress, 'change', (v) => {
    const position = Math.min(LAST, Math.max(0, v * LAST))
    const base = Math.floor(position)
    if (base !== Math.floor(positionRef.current)) {
      const direction = position > positionRef.current ? 1 : -1
      directionRef.current = direction
      // Decodificar por adelantado solo los cuadros que vienen: tenerlos todos
      // decodificados a la vez puede agotar la memoria de un celular.
      for (let k = 1; k <= DECODE_AHEAD; k++) framesRef.current[base + direction * k]?.decode().catch(() => {})
    }
    positionRef.current = position
    requestRender()
  })

  // Carga de cuadros, de a 6 en paralelo
  useEffect(() => {
    let cancelled = false
    const frames = new Array(FRAME_COUNT)
    framesRef.current = frames
    drawnRef.current = null
    const coarse = coarseOrder()
    const claimed = new Set()

    const pick = () => {
      while (coarse.length) {
        const i = coarse.shift()
        if (!claimed.has(i)) {
          claimed.add(i)
          return i
        }
      }
      // Después, lo más cercano a donde está mirando, primero en la dirección en la que baja
      const at = Math.round(positionRef.current)
      for (let d = 0; d <= LAST; d++) {
        for (const i of [at + directionRef.current * d, at - directionRef.current * d]) {
          if (i >= 0 && i <= LAST && !claimed.has(i)) {
            claimed.add(i)
            return i
          }
        }
      }
      return null
    }

    const worker = async () => {
      while (!cancelled) {
        const i = pick()
        if (i === null) return
        const img = new Image()
        const ok = await new Promise((resolve) => {
          img.onload = () => resolve(true)
          img.onerror = () => resolve(false)
          img.src = framePath(set, i)
        })
        if (cancelled) return
        if (!ok) continue
        frames[i] = img
        requestRender()
      }
    }
    for (let k = 0; k < 6; k++) worker()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set])

  // Redibujar cuando cambia el tamaño de la pantalla
  useEffect(() => {
    const canvas = canvasRef.current
    const ro = new ResizeObserver(([entry]) => {
      sizeRef.current = entry.contentRect
      drawnRef.current = null
      requestRender()
    })
    ro.observe(canvas)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const introEnd = toProgress(76)
  const introOpacity = useTransform(progress, [0, introEnd - 0.06, introEnd], [1, 1, 0])
  const introY = useTransform(progress, [0, introEnd], [0, -40])
  const cueOpacity = useTransform(progress, [0, 0.03], [1, 0])

  const outroStart = toProgress(428)
  const outroOpacity = useTransform(progress, [outroStart, outroStart + 0.04], [0, 1])
  const outroY = useTransform(progress, [outroStart, outroStart + 0.04], [32, 0])
  const outroPointer = useTransform(outroOpacity, (v) => (v > 0.6 ? 'auto' : 'none'))

  return (
    <section ref={sectionRef} id="inicio" className="relative h-[760vh] bg-grafito">
      <div className="sticky top-0 h-[100lvh] overflow-hidden">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Video: aplicación de microcemento, el equipo de AFG puliendo el piso del Movistar Arena, un piso espejado, una pileta y un living terminados."
          className="absolute inset-0 w-full h-full"
        />

        {/* Oscurecer arriba para la barra de navegación y abajo para los textos */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,20,19,0.92)_0%,rgba(20,20,19,0.72)_42%,rgba(20,20,19,0.3)_66%,transparent_84%)] md:bg-[linear-gradient(to_top,rgba(20,20,19,0.85)_0%,rgba(20,20,19,0.55)_35%,rgba(20,20,19,0.15)_65%,transparent_82%)]" />

        {/* Los textos se apoyan en la parte siempre visible, aunque esté la barra del navegador */}
        <div className="absolute inset-x-0 top-0 h-[100svh]">
          {/* Apertura */}
          <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute inset-x-0 bottom-0">
            <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pb-28 md:flex md:justify-end">
              <div className="md:w-[min(46rem,52%)]">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white font-medium text-[2.5rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.03em]"
                >
                  Transformamos superficies en obras de arte
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-[38ch]"
                >
                  Microcemento, hormigón pulido y revestimientos para obras comerciales y casas en Buenos Aires.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {chapters.map((chapter) => (
            <Chapter key={chapter.title} chapter={chapter} progress={progress} />
          ))}

          {/* Cierre, sobre el living terminado */}
          <motion.div
            style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroPointer }}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20">
              <h2 className="text-white font-medium text-[2.25rem] sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.025em] max-w-[16ch]">
                Más de 15 años y 500 obras terminadas
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-5 max-w-[40ch]">
                De naves industriales y estadios a livings y baños. Contanos qué querés revestir y te pasamos presupuesto.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a
                  href="#contacto"
                  className="bg-naranja text-tinta font-medium px-6 py-3.5 rounded hover:bg-naranja-claro transition-colors text-center"
                >
                  Pedir presupuesto
                </a>
                <a
                  href="#proyectos"
                  className="border border-white/60 text-white font-medium px-6 py-3.5 rounded hover:bg-white hover:text-tinta transition-colors text-center"
                >
                  Ver obras
                </a>
              </div>
            </div>
          </motion.div>

          {/* Indicación para empezar a bajar */}
          <motion.p
            style={{ opacity: cueOpacity }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/70 text-sm flex flex-col items-center gap-2 pointer-events-none"
          >
            Bajá para ver cómo trabajamos
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="block w-px h-6 bg-white/70"
            />
          </motion.p>

          {/* Avance del video */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-naranja origin-left"
          />
        </div>
      </div>
    </section>
  )
}
