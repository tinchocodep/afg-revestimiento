const steps = [
  {
    title: 'Consulta',
    text: 'Nos contás qué querés hacer y te asesoramos sobre el material y la técnica que mejor van.',
  },
  {
    title: 'Planificación',
    text: 'Armamos una propuesta con materiales, plazos y presupuesto ajustado a tu obra.',
  },
  {
    title: 'Ejecución',
    text: 'Nuestro equipo trabaja cada etapa con control de calidad y la menor interrupción posible.',
  },
  {
    title: 'Entrega',
    text: 'Inspección final, limpieza y entrega con garantía. El espacio queda listo para usar.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="bg-micro py-20 sm:py-28 lg:py-36">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <h2 className="font-medium text-5xl sm:text-6xl leading-[1] tracking-[-0.03em] max-w-[16ch]">
          Cómo empezamos un trabajo
        </h2>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-12 mt-12 sm:mt-16">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-tinta/15 pt-5">
              <span className="block text-6xl font-light text-hormigon leading-none tracking-[-0.04em]">{i + 1}</span>
              <h3 className="text-2xl font-medium mt-6">{step.title}</h3>
              <p className="text-piedra text-lg leading-relaxed mt-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
