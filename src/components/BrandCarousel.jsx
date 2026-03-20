import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const brands = [
  'Ford',
  'Toyota',
  'Volkswagen',
  'Pradecon Racing',
  'Movistar Arena',
  'Baterías Moura',
  'Zanazzi Porsche',
  'NewConcret',
  'Weber',
  'Conteplat',
  'Cozzuol',
]

function InfiniteScroll({ direction = 'left', children }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-12 items-center"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export default function BrandCarousel() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-orange-brand text-sm font-semibold uppercase tracking-[0.15em]">
            Confían en nosotros
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">
            Marcas que nos Eligen
          </h2>
        </motion.div>
      </div>

      <InfiniteScroll direction="left">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center shrink-0 h-20 px-10 bg-gray-light rounded-xl min-w-[200px]"
          >
            <span className="text-dark font-semibold text-lg whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
              {brand}
            </span>
          </div>
        ))}
      </InfiniteScroll>
    </section>
  )
}
