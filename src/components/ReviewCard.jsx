import Icon, { Stars } from './Icon.jsx'

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?'
}

const TIPO_STYLE = {
  Felicitación: { bg: 'rgba(53,189,173,0.14)', color: 'var(--brand-800)' },
  Sugerencia: { bg: 'rgba(92,113,175,0.14)', color: 'var(--indigo-700)' },
  Queja: { bg: 'rgba(171,76,126,0.14)', color: 'var(--wine)' },
}

export default function ReviewCard({ review }) {
  const date = review.fecha
    ? new Date(review.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''
  const tipo = review.tipo
  const tStyle = TIPO_STYLE[tipo]

  return (
    <article className="rev">
      <Icon name="quote" size={34} className="rev__mark" />
      {typeof review.calificacion === 'number' && review.calificacion > 0 && (
        <Stars value={review.calificacion} />
      )}
      <p className="rev__text">{review.mensaje}</p>
      <div className="rev__foot">
        <span className="rev__avatar" aria-hidden="true">{initials(review.nombre)}</span>
        <div className="rev__meta">
          <strong>{review.nombre}</strong>
          <span>Paciente · Chilpancingo{date ? ` · ${date}` : ''}</span>
        </div>
        {tStyle && (
          <span className="rev__tag" style={{ background: tStyle.bg, color: tStyle.color }}>{tipo}</span>
        )}
      </div>
    </article>
  )
}
