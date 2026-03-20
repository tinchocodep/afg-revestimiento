import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Paintbrush, Building2, Home, Layers, Hammer, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Paintbrush,
    title: 'Microcemento',
    description: 'Acabados continuos y modernos para pisos, paredes y mobiliario con infinitas posibilidades de color.',
  },
  {
    icon: Layers,
    title: 'Revestimiento Plástico',
    description: 'Texturas decorativas para fachadas e interiores con alta resistencia y durabilidad.',
  },
  {
    icon: Building2,
    title: 'Proyectos Comerciales',
    description: 'Soluciones integrales para locales, oficinas y espacios comerciales de alto tránsito.',
  },
  {
    icon: Home,
    title: 'Proyectos Residenciales',
    description: 'Transformamos tu hogar con revestimientos que combinan estética y funcionalidad.',
  },
  {
    icon: Hammer,
    title: 'Reparación y Restauración',
    description: 'Renovamos superficies dañadas devolviéndoles su aspecto original o uno completamente nuevo.',
  },
  {
    icon: Sparkles,
    title: 'Efectos Decorativos',
    description: 'Técnicas especiales como óxido, hormigón visto, mármol y piedra para acabados únicos.',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-5 sm:p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-orange-brand/20 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-14 h-14 bg-orange-brand/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-brand group-hover:text-white transition-all duration-300">
        <service.icon className="w-7 h-7 text-orange-brand group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-serif text-xl font-bold mb-3">{service.title}</h3>
      <p className="text-gray-medium text-sm leading-relaxed">{service.description}</p>
    </motion.div>
  )
}

export default function Services() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="servicios" className="py-16 sm:py-24 lg:py-32 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
            Lo que hacemos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 sm:mb-5">
            Nuestros Servicios
          </h2>
          <p className="text-gray-medium max-w-2xl mx-auto text-base sm:text-lg">
            Especializados en revestimientos continuos y soluciones de alta gama para transformar cualquier superficie.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Licenciatarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12"
        >
          <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 sm:px-8 sm:py-5 shadow-sm border border-gray-100">
            <div className="w-3 h-3 bg-orange-brand rounded-full" />
            <div>
              <div className="text-xs text-gray-medium uppercase tracking-wider">Licenciatario Oficial</div>
              <div className="font-serif text-xl font-bold">Edfan</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 sm:px-8 sm:py-5 shadow-sm border border-gray-100">
            <div className="w-3 h-3 bg-orange-brand rounded-full" />
            <div>
              <div className="text-xs text-gray-medium uppercase tracking-wider">Licenciatario Oficial</div>
              <div className="font-serif text-xl font-bold">NewConcret</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
