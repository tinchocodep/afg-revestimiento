import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'

// El video de obra está exportado cuadro por cuadro (public/film), a 12 cuadros por segundo:
// "d" en 16:9 para pantallas apaisadas y "m" recortado en vertical, siguiendo a cada toma.
const FRAME_COUNT = 258
const LAST = FRAME_COUNT - 1
const DECODE_AHEAD = 6
const framePath = (set, i) => `/film/${set}/${String(i).padStart(3, '0')}.webp`

// Tomas, en cuadros (con fundidos de 6 cuadros entre una y otra):
// 0–48 llana sobre microcemento, 42–90 aplicación en piso, 84–132 equipo en el Movistar Arena,
// 126–174 piso espejado de Pradecon Racing, 168–216 pileta, 210–257 living terminado.
const chapters = [
  {
    from: 50,
    to: 84,
    label: 'Paso 1 de 3',
    title: 'Aplicamos a mano',
    text: 'Microcemento en capas finas y sin juntas, sobre pisos, paredes y mesadas.',
  },
  {
    from: 92,
    to: 126,
    label: 'Paso 2 de 3',
    title: 'Pulimos con equipo propio',
    text: 'Maquinaria profesional y personal de AFG en cada obra. Acá, en el Movistar Arena.',
  },
  {
    from: 134,
    to: 168,
    label: 'Paso 3 de 3',
    title: 'Hasta que el piso refleja',
    text: 'Hormigón pulido con brillo espejo, hecho para tránsito pesado. Nave de Pradecon Racing.',
  },
  {
    from: 176,
    to: 210,
    title: 'También al aire libre',
    text: 'Bordes de pileta, solárium y caminos que aguantan sol y lluvia.',
  },
]

// Primero el cuadro 0, después cada 16, 8, 4, 2 y al final el resto:
// así se puede recorrer el video entero mientras terminan de llegar los cuadros.
function loadOrder() {
  const seen = new Set()
  const order = []
  for (const stride of [LAST, 16, 8, 4, 2, 1]) {
    for (let i = 0; i <= LAST; i += stride) {
      if (!seen.has(i)) {
        seen.add(i)
        order.push(i)
      }
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
  const targetRef = useRef(0)
  const drawnRef = useRef(null)
  const rafRef = useRef(0)
  const sizeRef = useRef(null)
  const set = useFrameSet()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Un poco de inercia para que el video no salte con cada rueda del mouse
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 36, restDelta: 0.0005 })

  const render = () => {
    rafRef.current = 0
    const canvas = canvasRef.current
    if (!canvas) return
    const frames = framesRef.current
    const target = targetRef.current
    let img = frames[target]
    for (let d = 1; !img && d <= LAST; d++) img = frames[target - d] || frames[target + d]
    if (!img || !sizeRef.current || img === drawnRef.current) return

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
    canvas.getContext('2d', { alpha: false }).drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    drawnRef.current = img
  }

  const requestRender = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(render)
  }

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.min(LAST, Math.max(0, Math.round(v * LAST)))
    if (next === targetRef.current) return
    const direction = next > targetRef.current ? 1 : -1
    targetRef.current = next
    // Decodificar por adelantado solo los cuadros que vienen: tenerlos todos
    // decodificados a la vez puede agotar la memoria de un celular.
    for (let k = 1; k <= DECODE_AHEAD; k++) framesRef.current[next + direction * k]?.decode().catch(() => {})
    requestRender()
  })

  // Carga de cuadros, de a 6 en paralelo
  useEffect(() => {
    let cancelled = false
    const frames = new Array(FRAME_COUNT)
    framesRef.current = frames
    drawnRef.current = null
    const order = loadOrder()
    let next = 0

    const worker = async () => {
      while (!cancelled && next < order.length) {
        const i = order[next++]
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

  const introEnd = toProgress(38)
  const introOpacity = useTransform(progress, [0, introEnd - 0.06, introEnd], [1, 1, 0])
  const introY = useTransform(progress, [0, introEnd], [0, -40])
  const cueOpacity = useTransform(progress, [0, 0.03], [1, 0])

  const outroStart = toProgress(214)
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
