const services = [
  {
    name: 'Microcemento',
    text: 'Revestimiento continuo para pisos, paredes, baños y mesadas. Sin juntas y en el color que elijas.',
    image: '/obras/IMG_9309.webp',
    alt: 'Living con paredes y piso de microcemento',
  },
  {
    name: 'Hormigón pulido',
    text: 'Pisos de alto tránsito pulidos hasta el brillo espejo, para naves, locales y estadios.',
    image: '/obras/IMG_0185.webp',
    alt: 'Nave de Pradecon Racing con piso de hormigón pulido espejado',
  },
  {
    name: 'Revestimiento plástico',
    text: 'Texturas para fachadas e interiores, resistentes y duraderas.',
    image: '/obras/IMG_9297.webp',
    alt: 'Quincho con paredes revestidas y techo de madera',
  },
  {
    name: 'Efectos decorativos',
    text: 'Óxido, hormigón visto, mármol y piedra: acabados únicos para cada ambiente.',
    image: '/obras/IMG_9300.webp',
    alt: 'Salón con piso de hormigón pulido de acabado dorado',
  },
  {
    name: 'Reparación y restauración',
    text: 'Recuperamos superficies dañadas, o les damos un aspecto completamente nuevo.',
    image: '/obras/IMG_9298.webp',
    alt: 'Sendero de entrada de hormigón alisado',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-micro py-20 sm:py-28 lg:py-36">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16 lg:items-end">
          <h2 className="lg:col-span-7 font-medium text-5xl sm:text-6xl lg:text-7xl leading-[1] tracking-[-0.03em]">
            Qué hacemos
          </h2>
          <p className="lg:col-span-5 text-piedra text-lg sm:text-xl leading-relaxed max-w-[42ch]">
            Revestimientos continuos para obras comerciales y casas. Somos licenciatarios oficiales de Edfan y NewConcret.
          </p>
        </div>

        <ul>
          {services.map((service) => (
            <li
              key={service.name}
              className="grid grid-cols-[1fr_88px] sm:grid-cols-[1fr_140px] lg:grid-cols-12 gap-x-5 lg:gap-x-12 gap-y-2 items-center border-t border-tinta/15 py-6 sm:py-8"
            >
              <h3 className="lg:col-span-5 font-medium text-[1.75rem] sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em]">
                {service.name}
              </h3>
              <p className="col-start-1 row-start-2 lg:row-start-1 lg:col-start-6 lg:col-span-4 text-piedra text-base sm:text-lg leading-relaxed max-w-[44ch]">
                {service.text}
              </p>
              <img
                src={service.image}
                alt={service.alt}
                loading="lazy"
                decoding="async"
                className="col-start-2 row-start-1 row-span-2 lg:row-span-1 lg:col-start-10 lg:col-span-3 w-full aspect-square lg:aspect-[4/3] object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
