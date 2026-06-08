import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'

const ITEMS = [
  { icon: 'shieldCheck', title: 'Validados por COFEPRIS', text: 'Licencia sanitaria oficial para operar una unidad de hemodiálisis.' },
  { icon: 'award', title: 'Especialistas certificados', text: 'Nefrólogos con cédula profesional y años de experiencia clínica.' },
  { icon: 'sparkle', title: 'Tecnología de punta', text: 'Equipos modernos de diálisis y diagnóstico renal.' },
  { icon: 'heart', title: 'Trato humano', text: 'Acompañamiento cercano al paciente y a su familia.' },
]

export default function TrustStrip() {
  return (
    <section className="trust">
      <div className="container">
        <Reveal className="trust__grid">
          {ITEMS.map((it) => (
            <div className="trust__item" key={it.title}>
              <span className="trust__icon"><Icon name={it.icon} size={22} /></span>
              <div>
                <strong>{it.title}</strong>
                <p>{it.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
