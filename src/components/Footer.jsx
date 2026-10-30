import { INSTAGRAM } from '../contacto'

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Instagram', href: INSTAGRAM, external: true },
]

export default function Footer() {
  return (
    <footer className="bg-grafito text-white border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <div className="text-3xl font-semibold tracking-[0.02em] leading-none">AFG</div>
          <div className="text-[0.7rem] uppercase tracking-[0.32em] text-white/60 mt-2">Revestimientos</div>
          <p className="text-white/50 text-sm mt-6">© {new Date().getFullYear()} AFG Revestimientos</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
