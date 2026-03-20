import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Instagram } from 'lucide-react'

const categories = ['Todos', 'Comerciales', 'Residenciales', 'Exteriores']

const projects = [
  // Comerciales
  {
    title: 'Pradecon Racing - Nave',
    category: 'Comerciales',
    image: '/IMG_0185.jpg',
    description: 'Piso pulido espejado en nave de Pradecon Racing',
  },
  {
    title: 'Pradecon Racing - Taller',
    category: 'Comerciales',
    image: '/IMG_0189.jpg',
    description: 'Revestimiento integral del taller de competición',
  },
  {
    title: 'Pradecon Racing - Detalle',
    category: 'Comerciales',
    image: '/IMG_0188.jpg',
    description: 'Acabado espejado de hormigón pulido',
  },
  {
    title: 'Movistar Arena',
    category: 'Comerciales',
    image: '/IMG_9302.JPG',
    description: 'Piso de hormigón pulido en Movistar Arena',
  },
  {
    title: 'Movistar Arena - En Obra',
    category: 'Comerciales',
    image: '/IMG_9301.JPG',
    description: 'Equipo AFG en acción en el Movistar Arena',
  },
  // Residenciales
  {
    title: 'Cocina Moderna',
    category: 'Residenciales',
    image: '/IMG_7348.JPG',
    description: 'Microcemento en piso de cocina premium',
  },
  {
    title: 'Baño de Diseño',
    category: 'Residenciales',
    image: '/IMG_9079.JPG',
    description: 'Revestimiento en baño con piedra natural',
  },
  {
    title: 'Baño Suite Premium',
    category: 'Residenciales',
    image: '/IMG_9304.JPG',
    description: 'Microcemento y mármol en baño principal',
  },
  {
    title: 'Salón con Vista al Jardín',
    category: 'Residenciales',
    image: '/IMG_9307.JPG',
    description: 'Piso de microcemento continuo',
  },
  {
    title: 'Living de Diseño',
    category: 'Residenciales',
    image: '/IMG_9309.JPG',
    description: 'Microcemento integral en paredes y piso',
  },
  {
    title: 'Salón con Piso Dorado',
    category: 'Residenciales',
    image: '/IMG_9300.JPG',
    description: 'Hormigón pulido con acabado dorado',
  },
  {
    title: 'Cocina con Quincho',
    category: 'Residenciales',
    image: '/IMG_9296.JPG',
    description: 'Mesada con microcemento y parrilla',
  },
  {
    title: 'Cocina Funcional',
    category: 'Residenciales',
    image: '/IMG_9305.JPG',
    description: 'Piso de microcemento en cocina integral',
  },
  // Exteriores
  {
    title: 'Fachada Casa Moderna',
    category: 'Exteriores',
    image: '/IMG_9295.JPG',
    description: 'Piso exterior de hormigón alisado',
  },
  {
    title: 'Quincho con Techo de Madera',
    category: 'Exteriores',
    image: '/IMG_9297.JPG',
    description: 'Revestimiento en paredes de quincho',
  },
  {
    title: 'Sendero de Entrada',
    category: 'Exteriores',
    image: '/IMG_9298.JPG',
    description: 'Camino de hormigón alisado exterior',
  },
  {
    title: 'Borde de Pileta',
    category: 'Exteriores',
    image: '/IMG_9299.JPG',
    description: 'Solario y borde de piscina en microcemento',
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const filtered =
    activeFilter === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="proyectos" className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
            Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Proyectos Destacados
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-orange-brand text-white'
                  : 'bg-gray-light text-dark hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                  <span className="text-orange-brand text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-white font-serif text-sm sm:text-xl font-bold mt-0.5 sm:mt-1">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-16 text-center"
        >
          <a
            href="https://www.instagram.com/revestimientosafg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <Instagram className="w-6 h-6" />
            Seguinos en Instagram para ver más proyectos
          </a>
          <p className="text-gray-medium text-sm mt-3">@revestimientosafg</p>
        </motion.div>
      </div>
    </section>
  )
}
