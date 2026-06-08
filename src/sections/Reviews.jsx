import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { useReviews } from '../hooks/useReviews.js'

function avgRating(reviews) {
  const rated = reviews.filter((r) => typeof r.calificacion === 'number' && r.calificacion > 0)
  if (!rated.length) return null
  const avg = rated.reduce((s, r) => s + r.calificacion, 0) / rated.length
  return { avg: avg.toFixed(1), count: rated.length }
}

export default function Reviews() {
  const { reviews, loading, error } = useReviews({ publicOnly: true })
  const featured = reviews.slice(0, 6)
  const rating = avgRating(reviews)

  return (
    <section className="section reviews" id="resenas">
      <div className="container">
        <div className="reviews__head">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">La voz de nuestros pacientes</span>
            <h2>Reseñas y experiencias reales</h2>
            <p>
              Cada comentario llega directo de quienes confían su salud renal a CERCH.
              {rating
                ? ` Promedio de ${rating.avg} ★ basado en ${rating.count} ${rating.count === 1 ? 'calificación' : 'calificaciones'}.`
                : ' Comparte tu experiencia y ayuda a otras familias a decidir.'}
            </p>
          </div>
          <Link className="btn btn--primary" to="/buzon">
            <Icon name="chat" size={18} /> Comparte tu experiencia
          </Link>
        </div>

        {loading && (
          <div className="reviews__grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rev rev--skeleton">
                <div className="skeleton" style={{ height: 18, width: 110, marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 14, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 14, marginBottom: 8, width: '92%' }} />
                <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 24 }} />
                <div className="skeleton" style={{ height: 44, width: 180 }} />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="reviews__empty">
            <Icon name="alert" size={30} />
            <p>No pudimos cargar las reseñas en este momento. Vuelve a intentarlo más tarde.</p>
          </div>
        )}

        {!loading && !error && featured.length === 0 && (
          <div className="reviews__empty">
            <Icon name="chat" size={30} />
            <h3>Sé la primera persona en compartir tu experiencia</h3>
            <p>Tu opinión ayuda a otras familias de Chilpancingo a dar el primer paso con confianza.</p>
            <Link className="btn btn--primary" to="/buzon">
              Escribir una reseña <Icon name="arrow" size={18} />
            </Link>
          </div>
        )}

        {!loading && !error && featured.length > 0 && (
          <>
            <div className="reviews__grid">
              {featured.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 0.06}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>
            {reviews.length > 6 && (
              <div className="reviews__more">
                <Link className="btn btn--ghost" to="/resenas">
                  Ver las {reviews.length} reseñas <Icon name="arrow" size={18} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
