import { Instagram, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl font-bold mb-2">AFG</div>
            <div className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4">
              Revestimientos
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Transformando superficies en obras de arte desde hace más de 15 años.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Navegación</h4>
            <div className="flex flex-col gap-2">
              <a href="#servicios" className="text-white/60 text-sm hover:text-orange-brand transition-colors">Servicios</a>
              <a href="#proyectos" className="text-white/60 text-sm hover:text-orange-brand transition-colors">Portfolio</a>
              <a href="#proceso" className="text-white/60 text-sm hover:text-orange-brand transition-colors">Proceso</a>
              <a href="#contacto" className="text-white/60 text-sm hover:text-orange-brand transition-colors">Contacto</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Servicios</h4>
            <div className="flex flex-col gap-2">
              <span className="text-white/60 text-sm">Microcemento</span>
              <span className="text-white/60 text-sm">Revestimiento Plástico</span>
              <span className="text-white/60 text-sm">Efectos Decorativos</span>
              <span className="text-white/60 text-sm">Restauración</span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Seguinos</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-brand transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-brand transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-brand transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2024 AFG Revestimientos. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
