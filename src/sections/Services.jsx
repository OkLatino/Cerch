import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { SERVICES, waLink } from '../data/site.js'

export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Nuestros servicios</span>
          <h2>Especialistas en salud renal</h2>
          <p>Atención integral para cada etapa de la enfermedad renal, con tecnología de vanguardia y el mejor equipo médico de la región.</p>
        </div>

        <div className="svc__grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05} className={`svc ${s.featured ? 'svc--featured' : ''}`}>
              {s.featured && <span className="svc__flag">Servicio principal</span>}
              <span className="svc__icon"><Icon name={s.icon} size={26} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>

              {s.features && (
                <ul className="svc__list">
                  {s.features.map((f) => (
                    <li key={f}><Icon name="check" size={16} /> {f}</li>
                  ))}
                </ul>
              )}

              {s.schedule && (
                <p className="svc__schedule"><Icon name="clock" size={16} /> {s.schedule}</p>
              )}

              <a className={`svc__cta ${s.featured ? 'btn btn--primary' : ''}`}
                href={waLink(`Hola, me interesa información sobre ${s.title} en CERCH`)}
                target="_blank" rel="noopener">
                {s.featured ? 'Agendar consulta' : 'Solicitar información'} <Icon name="arrow" size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
