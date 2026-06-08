import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { CONTACT, waLink } from '../data/site.js'

export default function CofeprisBand() {
  const { cofepris } = CONTACT
  return (
    <section className="section cofe">
      <div className="container">
        <Reveal className="cofe__card">
          <div className="cofe__left">
            <span className="pill cofe__pill"><Icon name="shieldCheck" size={18} /> Diferenciador CERCH</span>
            <h2>Una clínica que sí puede comprobar su seguridad</h2>
            <p>
              Operar una unidad de hemodiálisis exige licencia sanitaria oficial. CERCH está
              <strong> validada por COFEPRIS</strong>, un respaldo que protege a cada paciente y que
              pocas clínicas privadas de la zona pueden mostrar.
            </p>
            <div className="cofe__seal">
              <img src="/images/Logo_COFEPRIS.webp" alt="Logo oficial de COFEPRIS — Comisión Federal para la Protección contra Riesgos Sanitarios" />
              <span><Icon name="check" size={15} /> Licencia sanitaria vigente</span>
            </div>
            <a className="btn btn--onbrand btn--lg" href={waLink()} target="_blank" rel="noopener">
              <Icon name="calendar" /> Agenda con confianza
            </a>
          </div>
          <div className="cofe__data">
            <div className="cofe__datum">
              <span>Clave de autorización COFEPRIS</span>
              <strong>{cofepris.clave}</strong>
            </div>
            <div className="cofe__datum">
              <span>Cédula profesional</span>
              <strong>{cofepris.cedula}</strong>
            </div>
            <div className="cofe__datum">
              <span>Título expedido por</span>
              <strong>{cofepris.institucion}</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
