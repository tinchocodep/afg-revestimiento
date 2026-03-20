import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Martín Rodríguez',
    role: 'Propietario',
    text: 'El equipo de AFG transformó por completo nuestro living. El microcemento quedó impecable y superó todas nuestras expectativas. Profesionalismo de primera.',
    rating: 5,
    location: 'Nordelta, Buenos Aires',
  },
  {
    name: 'Arq. Florencia Morales',
    role: 'Arquitecta',
    text: 'Trabajar con AFG es sinónimo de confianza. Los plazos se cumplen, la calidad es excepcional y la atención al detalle es algo que valoro muchísimo como profesional.',
    rating: 5,
    location: 'Palermo, CABA',
  },
  {
    name: 'Carlos Fernández',
    role: 'Dueño Restaurant',
    text: 'Renovaron todo el local comercial en tiempo récord. Los clientes siempre elogian el acabado de las paredes. Sin duda, la mejor inversión que hicimos.',
    rating: 5,
    location: 'Puerto Madero, CABA',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-24 lg:py-32 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
            Testimonios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 italic">
            Lo que Dicen Nuestros Clientes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <Quote className="w-16 h-16 text-orange-brand/20 absolute -top-4 -left-4" />

          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-brand text-orange-brand" />
              ))}
            </div>

            <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8 font-light italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            <div>
              <div className="font-semibold text-lg">{testimonials[current].name}</div>
              <div className="text-white/50 text-sm">
                {testimonials[current].role} &middot; {testimonials[current].location}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-orange-brand hover:border-orange-brand transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-orange-brand w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-orange-brand hover:border-orange-brand transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
