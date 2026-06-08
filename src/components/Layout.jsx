import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { CONTACT, waLink } from '../data/site.js'

const NAV = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Reseñas', id: 'resenas' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contacto', id: 'contacto' },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 70
  window.scrollTo({ top: id === 'inicio' ? 0 : y, behavior: 'smooth' })
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Navega a la sección del home; si estamos en otra ruta, vuelve al home primero.
  function goTo(id) {
    setOpen(false)
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(id), 140)
    } else {
      scrollToId(id)
    }
  }

  return (
    <header className={`hd ${scrolled ? 'hd--scrolled' : ''}`}>
      <div className="container hd__inner">
        <Link to="/" className="hd__logo" aria-label="CERCH inicio">
          <img src="/images/logo.webp" alt="" width="44" height="44" />
          <span>
            CERCH
            <small>Especialidades Renales</small>
          </span>
        </Link>

        <nav className={`hd__nav ${open ? 'is-open' : ''}`}>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <button type="button" className="hd__link" onClick={() => goTo(n.id)}>
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary hd__cta-mobile" href={waLink()} target="_blank" rel="noopener">
            Agendar cita <Icon name="arrow" />
          </a>
        </nav>

        <a className="btn btn--primary hd__cta" href={waLink()} target="_blank" rel="noopener">
          Agendar cita <Icon name="arrow" />
        </a>

        <button className={`hd__toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)}
          aria-label="Menú" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  const { cofepris } = CONTACT
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function goTo(id) {
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(id), 140)
    } else {
      scrollToId(id)
    }
  }

  return (
    <footer className="ft">
      <div className="container ft__grid">
        <div className="ft__brand">
          <div className="ft__logo">
            <img src="/images/logo.webp" alt="" width="48" height="48" />
            <strong>CERCH</strong>
          </div>
          <p>{CONTACT.legal}. Comprometidos con tu salud renal en Chilpancingo, Guerrero.</p>
          <div className="ft__social">
            <a href={CONTACT.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
            <a href={CONTACT.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
            <a href={CONTACT.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><Icon name="tiktok" size={18} /></a>
            <a href={CONTACT.social.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" size={18} /></a>
          </div>
        </div>

        <div className="ft__col">
          <h4>Servicios</h4>
          <ul>
            <li><button className="ft__linkbtn" onClick={() => goTo('servicios')}>Hemodiálisis</button></li>
            <li><button className="ft__linkbtn" onClick={() => goTo('servicios')}>Nefrología de adultos</button></li>
            <li><button className="ft__linkbtn" onClick={() => goTo('servicios')}>Nefrología pediátrica</button></li>
            <li><button className="ft__linkbtn" onClick={() => goTo('servicios')}>Diálisis peritoneal</button></li>
            <li><button className="ft__linkbtn" onClick={() => goTo('servicios')}>Trasplante renal</button></li>
          </ul>
        </div>

        <div className="ft__col">
          <h4>Enlaces</h4>
          <ul>
            <li><button className="ft__linkbtn" onClick={() => goTo('inicio')}>Inicio</button></li>
            <li><Link to="/resenas">Reseñas de pacientes</Link></li>
            <li><Link to="/buzon">Buzón de atención</Link></li>
            <li><Link to="/blog">Blog de salud</Link></li>
            <li><button className="ft__linkbtn" onClick={() => goTo('contacto')}>Contacto</button></li>
          </ul>
        </div>

        <div className="ft__col">
          <h4>Contacto</h4>
          <ul className="ft__contact">
            <li><Icon name="pin" size={16} /> {CONTACT.address.line1}, {CONTACT.address.city}</li>
            <li><Icon name="phone" size={16} /> <a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>{CONTACT.phones[0]}</a></li>
            <li><Icon name="mail" size={16} /> <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a></li>
          </ul>
        </div>
      </div>

      <div className="ft__cofepris container">
        <span className="ft__cofepris-logo">
          <img src="/images/Logo_COFEPRIS.webp" alt="Logo oficial de COFEPRIS" />
        </span>
        <span>
          Establecimiento validado por <strong>COFEPRIS</strong>. Clave de autorización {cofepris.clave} ·
          Cédula profesional {cofepris.cedula} · Título expedido por {cofepris.institucion}.
        </span>
      </div>

      <div className="ft__bottom container">
        <p>© {new Date().getFullYear()} CERCH — {CONTACT.legal}. Todos los derechos reservados.</p>
        <Link to="/admin" className="ft__admin">Gestor de quejas (Admin)</Link>
      </div>
    </footer>
  )
}

function WhatsAppFab() {
  return (
    <a className="wa-fab" href={waLink()} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
      <Icon name="whatsapp" size={28} />
      <span className="wa-fab__pulse" />
    </a>
  )
}

// Barra de navegación inferior — solo móvil. Acceso rápido con el pulgar.
function MobileNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function goTo(id) {
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(id), 140)
    } else {
      scrollToId(id)
    }
  }

  return (
    <nav className="mnav" aria-label="Navegación rápida">
      <button type="button" className="mnav__item" onClick={() => goTo('inicio')}>
        <Icon name="home" size={21} /><span>Inicio</span>
      </button>
      <button type="button" className="mnav__item" onClick={() => goTo('servicios')}>
        <Icon name="droplet" size={21} /><span>Servicios</span>
      </button>
      <a className="mnav__wa" href={waLink()} target="_blank" rel="noopener" aria-label="Agendar por WhatsApp">
        <Icon name="whatsapp" size={26} />
      </a>
      <Link className="mnav__item" to="/resenas">
        <Icon name="chat" size={21} /><span>Reseñas</span>
      </Link>
      <a className="mnav__item" href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>
        <Icon name="phone" size={21} /><span>Llamar</span>
      </a>
    </nav>
  )
}

export default function Layout() {
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppFab />
      <MobileNav />
    </>
  )
}
