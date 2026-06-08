import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { BLOG_POSTS } from '../data/site.js'

export default function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3)
  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Blog de salud renal</span>
          <h2>Información y consejos que cuidan tus riñones</h2>
          <p>Mantente al día sobre prevención, tratamientos y hábitos saludables.</p>
        </div>

        <div className="blog__grid">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} as="article" className="blog">
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
                <a className="blog__link" href={p.href}>
                  Leer artículo <Icon name="arrow" size={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="blog__cta">
          <Link className="btn btn--ghost" to="/blog">
            Ver todos los artículos <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
