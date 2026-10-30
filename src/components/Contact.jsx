import { TELEFONO, WHATSAPP, EMAIL, INSTAGRAM } from '../contacto'

const fieldClass =
  'w-full bg-transparent border-b border-white/30 focus:border-naranja outline-none py-3 text-lg text-white placeholder:text-white/45 transition-colors'

export default function Contact() {
  // El formulario arma el mensaje y lo abre en WhatsApp, que es donde se responde
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const lines = [
      `Hola, soy ${data.get('nombre')}.`,
      data.get('tipo') && `Tipo de obra: ${data.get('tipo')}`,
      data.get('zona') && `Zona: ${data.get('zona')}`,
      data.get('mensaje'),
    ].filter(Boolean)
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
  }

  return (
    <section id="contacto" className="bg-grafito text-white py-20 sm:py-28 lg:py-36">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-14 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 className="font-medium text-5xl sm:text-6xl lg:text-7xl leading-[1] tracking-[-0.03em] max-w-[12ch]">
            Contanos qué querés revestir
          </h2>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mt-6 max-w-[38ch]">
            Te respondemos dentro de las 24 horas con una primera idea de costos y plazos.
          </p>

          <dl className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-6 text-lg">
            <div>
              <dt className="text-white/55">WhatsApp y teléfono</dt>
              <dd>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-naranja-claro transition-colors">
                  {TELEFONO}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/55">Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="hover:text-naranja-claro transition-colors break-all">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/55">Instagram</dt>
              <dd>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-naranja-claro transition-colors">
                  @revestimientosafg
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-white/55">Ubicación</dt>
              <dd>Buenos Aires, Argentina</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-5 lg:col-start-8 flex flex-col gap-6 lg:pt-3">
          <label className="block">
            <span className="sr-only">Nombre</span>
            <input name="nombre" type="text" required placeholder="Tu nombre" autoComplete="name" className={fieldClass} />
          </label>
          <label className="block">
            <span className="sr-only">Tipo de obra</span>
            <select name="tipo" defaultValue="" className={`${fieldClass} [&>option]:text-tinta`}>
              <option value="">Tipo de obra</option>
              <option>Casa o departamento</option>
              <option>Local u oficina</option>
              <option>Nave o industria</option>
              <option>Exterior o pileta</option>
              <option>Reparación</option>
            </select>
          </label>
          <label className="block">
            <span className="sr-only">Zona</span>
            <input name="zona" type="text" placeholder="Zona o barrio" className={fieldClass} />
          </label>
          <label className="block">
            <span className="sr-only">Mensaje</span>
            <textarea
              name="mensaje"
              rows={4}
              placeholder="Qué superficie es y cuántos metros, más o menos"
              className={`${fieldClass} resize-none`}
            />
          </label>
          <button
            type="submit"
            className="mt-2 bg-naranja text-tinta font-medium text-lg px-7 py-4 rounded hover:bg-naranja-claro transition-colors"
          >
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}
