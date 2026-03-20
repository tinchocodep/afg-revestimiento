import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: form */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
              Contactanos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 italic">
              Iniciemos tu Proyecto
            </h2>
            <p className="text-gray-medium text-lg mb-10">
              Completá el formulario y nos pondremos en contacto dentro de las próximas 24 horas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/20 outline-none transition-all text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/20 outline-none transition-all text-sm"
                />
              </div>
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/20 outline-none transition-all text-sm"
              />
              <select
                className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/20 outline-none transition-all text-sm text-gray-medium"
              >
                <option value="">Tipo de Proyecto</option>
                <option>Residencial</option>
                <option>Comercial</option>
                <option>Restauración</option>
                <option>Otro</option>
              </select>
              <textarea
                placeholder="Contanos sobre tu proyecto..."
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-orange-brand focus:ring-2 focus:ring-orange-brand/20 outline-none transition-all text-sm resize-none"
              />
              <button
                type="submit"
                className="w-full bg-orange-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-brand-dark transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {submitted ? (
                  'Mensaje Enviado ✓'
                ) : (
                  <>
                    Enviar Solicitud
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right: info + image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-orange-brand rounded-3xl p-8 text-white">
              <h3 className="font-serif text-2xl font-bold mb-6">AFG Revestimientos</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Teléfono</div>
                    <div className="text-white/80 text-sm">+54 9 11 3275-9319</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-white/80 text-sm">gfeito@afgconstructora.com.ar</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Ubicación</div>
                    <div className="text-white/80 text-sm">Buenos Aires, Argentina</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden flex-1 min-h-[300px]">
              <img
                src="/IMG_9309.JPG"
                alt="AFG Revestimientos oficina"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
