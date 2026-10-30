const stats = [
  { number: '500+', label: 'obras terminadas' },
  { number: '15+', label: 'años de experiencia' },
  { number: '50+', label: 'ciudades alcanzadas' },
  { number: '98%', label: 'clientes satisfechos' },
]

const brands = [
  'Movistar Arena',
  'Pradecon Racing',
  'Zanazzi Porsche',
  'Ford',
  'Toyota',
  'Volkswagen',
  'Baterías Moura',
  'NewConcret',
  'Weber',
  'Conteplat',
  'Cozzuol',
]

export default function About() {
  return (
    <section className="bg-micro py-20 sm:py-28 lg:py-36">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <img
            src="/obras/IMG_9301.webp"
            alt="Equipo de AFG puliendo el piso del Movistar Arena"
            loading="lazy"
            decoding="async"
            className="lg:col-span-7 w-full aspect-[4/3] lg:aspect-[16/11] object-cover"
          />

          <div className="lg:col-span-5">
            <h2 className="font-medium text-5xl sm:text-6xl leading-[1] tracking-[-0.03em]">
              Un equipo que trabaja en la obra
            </h2>
            <p className="text-piedra text-lg leading-relaxed mt-6 max-w-[48ch]">
              Hace más de 15 años que hacemos revestimientos continuos de alta gama en todo el país. Combinamos técnicas
              artesanales con materiales de última generación, y trabajamos junto a arquitectos, diseñadores y
              propietarios para llevar cada proyecto a la superficie.
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 mt-10 pt-8 border-t border-tinta/15">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-medium text-4xl sm:text-5xl tracking-[-0.02em]">{stat.number}</dd>
                  <dd className="text-piedra mt-1">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.01em]">Empresas que nos eligieron</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 mt-6">
            {brands.map((brand) => (
              <li key={brand} className="border-t border-tinta/15 py-4 text-lg sm:text-xl text-tinta/80">
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
