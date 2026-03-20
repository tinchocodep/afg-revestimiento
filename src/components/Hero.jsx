import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Orange accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-orange-brand z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block bg-orange-brand text-white text-xs font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-6"
          >
            Revestimientos de Excelencia
          </motion.span>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl text-white leading-[1.1] mb-6">
            Transformamos{' '}
            <br />
            superficies en{' '}
            <br />
            <span className="italic text-orange-brand">obras de arte</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/80 text-base md:text-xl mb-8 md:mb-10 max-w-lg"
          >
            Más de 15 años transformando espacios con revestimientos de alta calidad para proyectos comerciales y residenciales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a
              href="#contacto"
              className="bg-orange-brand text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-orange-brand-dark transition-all hover:scale-105 text-center text-sm sm:text-base"
            >
              Pedí tu Presupuesto
            </a>
            <a
              href="#proyectos"
              className="border-2 border-white text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-white hover:text-dark transition-all hover:scale-105 text-center text-sm sm:text-base"
            >
              Ver Proyectos
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
