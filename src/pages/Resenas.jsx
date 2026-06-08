import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { useReviews } from '../hooks/useReviews.js'

export default function Resenas() {
  const { reviews, loading, error } = useReviews({ publicOnly: true })
  useEffect(() => window.scrollTo({ top: 0 }), [])

  return (
    <section className="page subpage">
      <div className="container">
        <Link to="/" className="back-link"><Icon name="arrowLeft" size={18} /> Volver al inicio</Link>

        <div className="subpage__head subpage__head--center">
          <span className="eyebrow">La voz de nuestros pacientes</span>
          <h1>Reseñas y experiencias</h1>
          <p>Comentarios reales de quienes confían su salud renal a CERCH. Se mantienen visibles durante 30 días.</p>
          <Link className="btn btn--primary" to="/buzon"><Icon name="chat" size={18} /> Comparte tu experiencia</Link>
        </div>

        {loading && (
          <div className="reviews__grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="rev rev--skeleton">
                <div className="skeleton" style={{ height: 18, width: 110, marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 14, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, width: '75%', marginBottom: 24 }} />
                <div className="skeleton" style={{ height: 44, width: 170 }} />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="reviews__empty"><Icon name="alert" size={30} /><p>No pudimos cargar las reseñas. Intenta más tarde.</p></div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="reviews__empty">
            <Icon name="chat" size={30} />
            <h3>Aún no hay reseñas publicadas</h3>
            <p>Sé la primera persona en compartir tu experiencia con CERCH.</p>
            <Link className="btn btn--primary" to="/buzon">Escribir una reseña <Icon name="arrow" size={18} /></Link>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className="reviews__grid">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 0.05}><ReviewCard review={r} /></Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
