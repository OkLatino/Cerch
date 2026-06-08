import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { CONTACT, waLink } from '../data/site.js'

export default function Contact() {
  return (
    <section className="section section--tint" id="contacto">
      <div className="container contact__grid">
        <Reveal className="contact__info">
          <span className="eyebrow">Contáctanos</span>
          <h2>Estamos aquí para ti</h2>
          <p className="lead">
            ¿Tienes preguntas? Nuestro equipo está listo para atenderte y darte toda la
            información que necesitas sobre tu tratamiento renal.
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__ico"><Icon name="pin" size={20} /></span>
              <div>
                <strong>Ubicación</strong>
                <p>{CONTACT.address.line1}<br />{CONTACT.address.line2}<br />{CONTACT.address.city}</p>
                <a className="contact__map" href={CONTACT.mapsUrl} target="_blank" rel="noopener">
                  Ver en Google Maps <Icon name="external" size={15} />
                </a>
              </div>
            </li>
            <li>
              <span className="contact__ico"><Icon name="phone" size={20} /></span>
              <div>
                <strong>Teléfonos</strong>
                <p>
                  <a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>{CONTACT.phones[0]}</a><br />
                  <a href={`tel:${CONTACT.phones[1].replace(/\s/g, '')}`}>{CONTACT.phones[1]}</a> (Ext. 101 y 102)
                </p>
              </div>
            </li>
            <li>
              <span className="contact__ico"><Icon name="clock" size={20} /></span>
              <div>
                <strong>Horarios</strong>
                <p>Consultas: Lun a Vie 17:30–20:00 · Sáb 11:00–14:00<br />Pediatría: Lun a Sáb 10:30–13:00</p>
              </div>
            </li>
            <li>
              <span className="contact__ico"><Icon name="mail" size={20} /></span>
              <div>
                <strong>Correos</strong>
                <p>
                  <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a><br />
                  <a href={`mailto:${CONTACT.emails[1]}`}>{CONTACT.emails[1]}</a>
                </p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="contact__panel card">
          <h3>Agenda por WhatsApp</h3>
          <p>Comunícate directamente con nosotros. Respuesta rápida y atención personalizada.</p>

          <div className="contact__actions">
            <a className="btn btn--primary btn--block btn--lg" href={waLink()} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} /> Agendar cita por WhatsApp
            </a>
            <a className="btn btn--ghost btn--block" href={waLink('Hola, necesito información sobre los servicios de CERCH')} target="_blank" rel="noopener">
              <Icon name="chat" size={20} /> Solicitar información
            </a>
            <a className="btn btn--ghost btn--block" href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>
              <Icon name="phone" size={20} /> Llamar: {CONTACT.phones[0]}
            </a>
          </div>

          <div className="contact__note">
            <strong>Horario de atención telefónica</strong>
            <span>Lunes a viernes 10:00–20:00 · Sábados 10:00–14:00</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
