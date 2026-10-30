import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { INSTAGRAM } from '../contacto'

// ratio: proporción con la que se muestra la foto en la tira
const projects = [
  { title: 'Movistar Arena', category: 'Comercial', image: 'IMG_9302', ratio: 16 / 9, description: 'Piso de hormigón pulido' },
  { title: 'Movistar Arena, en obra', category: 'Comercial', image: 'IMG_9301', ratio: 16 / 9, description: 'El equipo de AFG puliendo el piso' },
  { title: 'Pradecon Racing', category: 'Comercial', image: 'IMG_0185', ratio: 16 / 9, description: 'Piso pulido espejado en la nave' },
  { title: 'Pradecon Racing, taller', category: 'Comercial', image: 'IMG_0189', ratio: 16 / 9, description: 'Revestimiento integral del taller de competición' },
  { title: 'Living de diseño', category: 'Casa', image: 'IMG_9309', ratio: 4 / 5, description: 'Microcemento integral en paredes y piso' },
  { title: 'Baño suite', category: 'Casa', image: 'IMG_9304', ratio: 4 / 5, description: 'Microcemento y mármol en baño principal' },
  { title: 'Salón con piso dorado', category: 'Casa', image: 'IMG_9300', ratio: 4 / 5, description: 'Hormigón pulido con acabado dorado' },
  { title: 'Salón con vista al jardín', category: 'Casa', image: 'IMG_9307', ratio: 4 / 5, description: 'Piso de microcemento continuo' },
  { title: 'Cocina moderna', category: 'Casa', image: 'IMG_7348', ratio: 4 / 5, description: 'Microcemento en piso de cocina' },
  { title: 'Baño de diseño', category: 'Casa', image: 'IMG_9079', ratio: 4 / 5, description: 'Revestimiento en baño con piedra natural' },
  { title: 'Cocina con quincho', category: 'Casa', image: 'IMG_9296', ratio: 3 / 2, description: 'Mesada de microcemento y parrilla' },
  { title: 'Borde de pileta', category: 'Exterior', image: 'IMG_9299', ratio: 4 / 3, description: 'Solárium y borde de piscina en microcemento' },
  { title: 'Fachada de casa moderna', category: 'Exterior', image: 'IMG_9295', ratio: 3 / 4, description: 'Piso exterior de hormigón alisado' },
  { title: 'Quincho con techo de madera', category: 'Exterior', image: 'IMG_9297', ratio: 3 / 2, description: 'Revestimiento en paredes de quincho' },
  { title: 'Sendero de entrada', category: 'Exterior', image: 'IMG_9298', ratio: 3 / 4, description: 'Camino de hormigón alisado' },
]

const src = (image) => `/obras/${image}.webp`

function Lightbox({ index, onClose, onMove }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (index === null) {
      if (dialog.open) dialog.close()
      return
    }
    if (!dialog.open) dialog.showModal()
  }, [index])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') onMove(1)
    if (e.key === 'ArrowLeft') onMove(-1)
  }

  const item = index === null ? null : projects[index]

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-0 p-0 w-full h-full max-w-none max-h-none bg-grafito/95 text-white backdrop:bg-transparent"
    >
      {item && (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-5 sm:px-8 py-4">
            <p className="text-white/60 text-sm tabular-nums">
              {index + 1} / {projects.length}
            </p>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="w-11 h-11 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 min-h-0 flex items-center gap-2 px-2 sm:px-6">
            <button
              onClick={() => onMove(-1)}
              aria-label="Foto anterior"
              className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <img src={src(item.image)} alt={item.title} className="flex-1 min-w-0 h-full object-contain" />
            <button
              onClick={() => onMove(1)}
              aria-label="Foto siguiente"
              className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
          <div className="px-5 sm:px-8 py-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-lg font-medium">{item.title}</p>
              <p className="text-white/60">{item.description}</p>
            </div>
            <div className="flex sm:hidden gap-2">
              <button onClick={() => onMove(-1)} aria-label="Foto anterior" className="w-11 h-11 flex items-center justify-center rounded bg-white/10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => onMove(1)} aria-label="Foto siguiente" className="w-11 h-11 flex items-center justify-center rounded bg-white/10">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}

// La sección queda fija mientras el scroll vertical corre la tira de fotos hacia la izquierda
export default function Projects() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const [open, setOpen] = useState(null)

  useLayoutEffect(() => {
    const measure = () => setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)
  const current = useTransform(scrollYProgress, (v) => String(Math.min(projects.length, Math.floor(v * projects.length) + 1)))

  const move = (delta) => setOpen((i) => (i + delta + projects.length) % projects.length)

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative bg-grafito text-white"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div ref={viewportRef} className="sticky top-0 h-[100svh] overflow-hidden flex flex-col">
        <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-medium text-4xl sm:text-5xl lg:text-6xl leading-none tracking-[-0.025em]">Obras</h2>
            <p className="text-white/60 mt-3">De estadios y talleres a casas en Buenos Aires.</p>
          </div>
          <p className="text-white/60 tabular-nums shrink-0" aria-hidden="true">
            <motion.span className="text-white">{current}</motion.span> / {projects.length}
          </p>
        </div>

        <div className="flex-1 min-h-0 flex items-center">
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="flex items-start gap-4 sm:gap-6 px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-1360px)/2+3rem))] [--strip-h:56svh] sm:[--strip-h:58svh] [--strip-max-w:82vw] sm:[--strip-max-w:90vw] will-change-transform"
          >
            {projects.map((project, i) => (
              <li key={project.image} className="shrink-0">
                <button
                  onClick={() => setOpen(i)}
                  aria-label={`Ver foto: ${project.title}`}
                  className="block overflow-hidden group"
                >
                  <img
                    src={src(project.image)}
                    alt={project.title}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ height: 'var(--strip-h)', width: `min(calc(var(--strip-h) * ${project.ratio.toFixed(3)}), var(--strip-max-w))` }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </button>
                <div className="mt-4 flex gap-4 justify-between w-0 min-w-full">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-white/55 text-sm mt-0.5">{project.description}</p>
                  </div>
                  <p className="text-white/40 text-sm shrink-0">{project.category}</p>
                </div>
              </li>
            ))}
            <li className="shrink-0 self-stretch">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[var(--strip-h)] aspect-[4/5] max-w-[var(--strip-max-w)] flex flex-col justify-end p-6 sm:p-8 border border-white/15 hover:border-white/40 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-medium leading-tight tracking-[-0.02em]">Más obras en Instagram</span>
                <span className="text-white/60 mt-2">@revestimientosafg</span>
              </a>
            </li>
          </motion.ul>
        </div>
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onMove={move} />
    </section>
  )
}
