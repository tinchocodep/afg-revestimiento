import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Transparente mientras corre el video de arriba, sólida cuando termina
  useEffect(() => {
    const onScroll = () => {
      const film = document.getElementById('inicio')
      setScrolled(film ? film.getBoundingClientRect().bottom < 80 : window.scrollY > 50)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-grafito/95 md:bg-grafito/85 md:backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-20">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-[0.02em] text-white">
            AFG
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">
            Revestimientos
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.95rem] text-white hover:text-white/65 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-naranja text-tinta font-medium px-5 py-2.5 rounded hover:bg-naranja-claro transition-colors"
          >
            Presupuesto
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-xl"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="bg-naranja text-tinta text-center font-medium px-6 py-3.5 rounded hover:bg-naranja-claro transition-colors"
              >
                Presupuesto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
