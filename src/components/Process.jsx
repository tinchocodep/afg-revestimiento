import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Ruler, HardHat, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consulta',
    description: 'Nos reunimos para entender tu visión, necesidades y presupuesto. Asesoramos sobre los mejores materiales y técnicas.',
  },
  {
    number: '02',
    icon: Ruler,
    title: 'Planificación',
    description: 'Diseñamos una propuesta detallada con materiales, cronograma y presupuesto ajustado a tu proyecto.',
  },
  {
    number: '03',
    icon: HardHat,
    title: 'Ejecución',
    description: 'Nuestro equipo especializado ejecuta cada etapa con precisión, control de calidad y mínima interrupción.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Entrega',
    description: 'Inspección final, limpieza y entrega con garantía. Tu espacio transformado, listo para disfrutar.',
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex gap-6 items-start"
    >
      {/* Number & line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-16 h-16 bg-orange-brand rounded-2xl flex items-center justify-center text-white font-serif text-2xl font-bold shadow-lg shadow-orange-brand/25">
          {step.number}
        </div>
        {index < steps.length - 1 && (
          <div className="w-0.5 h-full bg-orange-brand/20 mt-2 min-h-[40px]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="flex items-center gap-3 mb-2">
          <step.icon className="w-5 h-5 text-orange-brand" />
          <h3 className="font-serif text-2xl font-bold">{step.title}</h3>
        </div>
        <p className="text-gray-medium leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="proceso" className="py-24 lg:py-32 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: title */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
              Cómo trabajamos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-5 italic">
              Nuestro Proceso
            </h2>
            <p className="text-gray-medium text-lg leading-relaxed">
              Un enfoque metódico y profesional que garantiza resultados excepcionales en cada proyecto que emprendemos.
            </p>
            <div className="mt-8 p-6 bg-white rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-serif font-bold text-orange-brand">15+</div>
                <div className="text-sm text-gray-medium">
                  Años de experiencia<br />en revestimientos
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: steps */}
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
