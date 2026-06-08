import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { BLOG_POSTS } from '../data/site.js'

const CATS = ['Todos', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))]

export default function Blog() {
  const [cat, setCat] = useState('Todos')
  useEffect(() => window.scrollTo({ top: 0 }), [])
  const posts = cat === 'Todos' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat)

  return (
    <section className="page subpage">
      <div className="container">
        <Link to="/" className="back-link"><Icon name="arrowLeft" size={18} /> Volver al inicio</Link>

        <div className="subpage__head subpage__head--center">
          <span className="eyebrow">Blog de salud renal</span>
          <h1>Información y consejos para cuidar tus riñones</h1>
          <p>Artículos sobre prevención, tratamientos, nutrición y hábitos saludables.</p>
        </div>

        <div className="blog__filters">
          {CATS.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="blog__grid">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.05} as="article" className="blog">
              <a className="blog__media" href={p.href}>
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="blog__cat">{p.category}</span>
              </a>
              <div className="blog__body">
                <div className="blog__meta">
                  <span><Icon name="calendar" size={15} /> {p.date}</span>
                  <span><Icon name="clock" size={15} /> {p.read}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <a className="blog__link" href={p.href}>Leer artículo <Icon name="arrow" size={16} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
