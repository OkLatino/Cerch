import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { waLink } from '../data/site.js'

const FEATURES = [
  { icon: 'users', title: 'Equipo médico certificado', text: 'Nefrólogos con especialidad y más de 10 años de experiencia.' },
  { icon: 'sparkle', title: 'Tecnología de vanguardia', text: 'Equipos modernos de hemodiálisis y diagnóstico avanzado.' },
  { icon: 'heart', title: 'Atención personalizada', text: 'Tratamiento adaptado a las necesidades de cada paciente.' },
  { icon: 'shieldCheck', title: 'Seguridad respaldada', text: 'Validación COFEPRIS y protocolos clínicos estrictos.' },
]

export default function WhyUs() {
  return (
    <section className="section section--tint" id="nosotros">
      <div className="container why__grid">
        <Reveal className="why__media">
          <img src="/images/servicios.webp" alt="Paciente recibiendo atención en CERCH" />
          <div className="why__badge">
            <span className="why__badge-num">24/7</span>
            <span className="why__badge-label">Disponibilidad de urgencias</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="why__text">
          <span className="eyebrow">¿Por qué CERCH?</span>
          <h2>Tu salud es nuestra prioridad</h2>
          <p className="lead">
            Combinamos experiencia médica, tecnología avanzada y trato humano para brindarte
            la mejor atención en salud renal de Chilpancingo y la región.
          </p>

          <div className="why__features">
            {FEATURES.map((f) => (
              <div className="why__feature" key={f.title}>
                <span className="why__feature-icon"><Icon name={f.icon} size={20} /></span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener">
            Agenda tu cita <Icon name="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
