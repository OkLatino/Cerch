import { motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import { CONTACT, waLink } from '../data/site.js'

const STATS = [
  { num: '10+', label: 'Años cuidando riñones' },
  { num: '1000+', label: 'Pacientes atendidos' },
  { num: 'COFEPRIS', label: 'Establecimiento validado' },
]

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pill pill--soft hero__badge">
            <Icon name="shieldCheck" size={18} className="text-brand" />
            Centro validado por COFEPRIS
          </span>

          <h1 className="hero__title">
            Tus riñones merecen<br />
            <span className="hero__title-accent">atención especializada</span>
          </h1>

          <p className="hero__desc">
            Más de 10 años cuidando la salud renal en Chilpancingo. Hemodiálisis, nefrología
            y trasplante con tecnología de punta y trato humano en cada consulta.
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary btn--lg" href={waLink()} target="_blank" rel="noopener">
              <Icon name="calendar" /> Agendar cita ahora
            </a>
            <a className="btn btn--ghost btn--lg" href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>
              <Icon name="phone" /> {CONTACT.phones[0]}
            </a>
          </div>

          <div className="hero__social">
            <span className="hero__social-label">Síguenos</span>
            <div className="hero__social-links">
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a href={CONTACT.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><Icon name="tiktok" size={18} /></a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" size={18} /></a>
            </div>
          </div>

          <div className="hero__stats">
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-num">{s.num}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero__media"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__brandpanel">
            <img
              className="hero__logo"
              src="/images/logo-cerch-hero.webp"
              alt="CERCH — Centro de Especialidades Renales de Chilpancingo S.C."
            />
            <div className="hero__brandpanel-tags">
              <span><Icon name="droplet" size={15} /> Hemodiálisis</span>
              <span><Icon name="heart" size={15} /> Trasplante renal</span>
              <span><Icon name="shieldCheck" size={15} /> Nefrología</span>
            </div>
          </div>
          <div className="hero__media-card">
            <span className="hero__media-icon"><Icon name="clock" size={22} /></span>
            <div>
              <strong>Disponibilidad 24/7</strong>
              <span>Atención de urgencias renales</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
