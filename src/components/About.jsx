import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Award, Users, MapPin, ThumbsUp } from 'lucide-react'

const stats = [
  { icon: Award, number: '500+', label: 'Proyectos Completados' },
  { icon: Users, number: '15+', label: 'Años de Experiencia' },
  { icon: MapPin, number: '50+', label: 'Ciudades Alcanzadas' },
  { icon: ThumbsUp, number: '98%', label: 'Clientes Satisfechos' },
]

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with parallax */}
          <motion.div style={{ y: imageY }} className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="/IMG_9301.JPG"
                alt="AFG Revestimientos equipo de trabajo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-orange-brand text-white p-8 rounded-2xl shadow-xl hidden lg:block">
              <div className="font-serif text-4xl font-bold">500+</div>
              <div className="text-sm mt-1 text-white/80">Proyectos<br/>Completados</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, x: 40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
              Sobre nosotros
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-6 italic">
              ADN AFG Revestimientos
            </h2>
            <p className="text-gray-medium text-lg leading-relaxed mb-6">
              Con más de 15 años de trayectoria en el mercado argentino, nos especializamos en revestimientos continuos de alta gama. Cada proyecto es una oportunidad para crear superficies que combinan belleza, durabilidad y funcionalidad.
            </p>
            <p className="text-gray-medium leading-relaxed mb-10">
              Nuestra filosofía se basa en la combinación de técnicas artesanales con materiales de última generación, logrando acabados únicos que superan las expectativas de nuestros clientes. Trabajamos con arquitectos, diseñadores y propietarios para materializar su visión.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-orange-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <stat.icon className="w-6 h-6 text-orange-brand" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold">{stat.number}</div>
                    <div className="text-gray-medium text-xs">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
