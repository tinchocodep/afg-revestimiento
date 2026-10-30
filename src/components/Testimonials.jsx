const testimonials = [
  {
    name: 'Martín Rodríguez',
    role: 'Propietario',
    text: 'El equipo de AFG transformó por completo nuestro living. El microcemento quedó impecable y superó todas nuestras expectativas.',
    location: 'Nordelta, Buenos Aires',
  },
  {
    name: 'Arq. Florencia Morales',
    role: 'Arquitecta',
    text: 'Trabajar con AFG es sinónimo de confianza. Cumplen los plazos, la calidad es excepcional y cuidan cada detalle.',
    location: 'Palermo, CABA',
  },
  {
    name: 'Carlos Fernández',
    role: 'Dueño de restaurante',
    text: 'Renovaron todo el local en tiempo récord. Los clientes siempre elogian el acabado de las paredes.',
    location: 'Puerto Madero, CABA',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-cal py-20 sm:py-28 lg:py-36">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <h2 className="font-medium text-5xl sm:text-6xl leading-[1] tracking-[-0.03em] max-w-[14ch]">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mt-12 sm:mt-16">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t-2 border-tinta pt-6">
              <blockquote className="text-xl sm:text-2xl leading-snug tracking-[-0.01em]">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="block font-medium text-lg">{t.name}</span>
                <span className="block text-piedra">
                  {t.role}, {t.location}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
