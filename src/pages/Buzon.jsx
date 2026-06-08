import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db, COLLECTION_NAME } from '../firebase.js'
import Icon, { Stars } from '../components/Icon.jsx'
import { containsBadWords } from '../utils/moderation.js'

const TIPOS = ['Felicitación', 'Sugerencia', 'Queja']
const EMPTY = { nombre: '', telefono: '', correo: '', mensaje: '', tipo: 'Felicitación', calificacion: 5 }

export default function Buzon() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [preview, setPreview] = useState(false)
  const [status, setStatus] = useState('idle') // idle | saving | done
  const [hoverStar, setHoverStar] = useState(0)

  useEffect(() => window.scrollTo({ top: 0 }), [])

  const set = (k) => (e) => {
    let v = e.target.value
    if (k === 'telefono') v = v.replace(/[^0-9]/g, '')
    setForm((f) => ({ ...f, [k]: v }))
  }

  function validate() {
    const er = {}
    if (!form.nombre.trim()) er.nombre = 'Ingresa tu nombre completo.'
    if (!form.telefono.trim() || form.telefono.length < 7) er.telefono = 'Ingresa un teléfono válido.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) er.correo = 'Ingresa un correo válido.'
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10) er.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'
    if (containsBadWords(form.nombre) || containsBadWords(form.mensaje))
      er.mensaje = 'Tu mensaje contiene lenguaje inapropiado. Modifícalo para poder enviarlo.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  function onSubmit(e) {
    e.preventDefault()
    if (validate()) setPreview(true)
  }

  async function publish() {
    setStatus('saving')
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        nombre: form.nombre.trim(),
        telefono: form.telefono.trim(),
        correo: form.correo.trim(),
        mensaje: form.mensaje.trim(),
        tipo: form.tipo,
        calificacion: form.calificacion,
        fecha: new Date().toISOString(),
      })
      setStatus('done')
      setPreview(false)
      setForm(EMPTY)
    } catch (err) {
      console.error('Error al guardar:', err)
      setStatus('idle')
      setErrors({ submit: 'No se pudo guardar tu mensaje. Inténtalo de nuevo.' })
    }
  }

  if (status === 'done') {
    return (
      <section className="page subpage">
        <div className="container narrow">
          <div className="card success-card">
            <span className="success-card__icon"><Icon name="check" size={34} /></span>
            <h1>¡Gracias por compartir tu experiencia!</h1>
            <p>Tu mensaje se publicó correctamente y será visible en nuestras reseñas. Si dejaste una petición, nuestro equipo te dará seguimiento.</p>
            <div className="success-card__actions">
              <Link className="btn btn--primary" to="/resenas">Ver reseñas <Icon name="arrow" size={18} /></Link>
              <button className="btn btn--ghost" onClick={() => setStatus('idle')}>Enviar otro mensaje</button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page subpage">
      <div className="container narrow">
        <Link to="/" className="back-link"><Icon name="arrowLeft" size={18} /> Volver al inicio</Link>

        <div className="subpage__head">
          <span className="eyebrow">Atención al paciente</span>
          <h1>Buzón de atención</h1>
          <p>¿Quieres dejar una <strong>felicitación, sugerencia o inconformidad</strong>? Completa el formulario y nuestro equipo dará seguimiento a tu petición.</p>
        </div>

        <form className="card buzon-form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label>Tipo de mensaje</label>
            <div className="chip-group">
              {TIPOS.map((t) => (
                <button type="button" key={t}
                  className={`chip ${form.tipo === t ? 'is-active' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, tipo: t }))}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Tu calificación</label>
            <div className="rate" onMouseLeave={() => setHoverStar(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} className="rate__star"
                  aria-label={`${n} estrellas`}
                  onMouseEnter={() => setHoverStar(n)}
                  onClick={() => setForm((f) => ({ ...f, calificacion: n }))}>
                  <svg width="30" height="30" viewBox="0 0 24 24"
                    fill={n <= (hoverStar || form.calificacion) ? '#f5a623' : 'none'}
                    stroke={n <= (hoverStar || form.calificacion) ? '#f5a623' : '#cdd9d7'} strokeWidth="2"
                    strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="nombre">Nombre completo <span className="req">*</span></label>
            <input id="nombre" value={form.nombre} onChange={set('nombre')} placeholder="Ingresa tu nombre completo" />
            {errors.nombre && <span className="field__error">{errors.nombre}</span>}
          </div>

          <div className="grid-2">
            <div className="field">
              <label htmlFor="telefono">Teléfono <span className="req">*</span></label>
              <input id="telefono" inputMode="numeric" value={form.telefono} onChange={set('telefono')} placeholder="10 dígitos" maxLength={15} />
              {errors.telefono && <span className="field__error">{errors.telefono}</span>}
            </div>
            <div className="field">
              <label htmlFor="correo">Correo electrónico <span className="req">*</span></label>
              <input id="correo" type="email" value={form.correo} onChange={set('correo')} placeholder="ejemplo@correo.com" />
              {errors.correo && <span className="field__error">{errors.correo}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="mensaje">Tu mensaje <span className="req">*</span></label>
            <textarea id="mensaje" value={form.mensaje} onChange={set('mensaje')} placeholder="Escribe aquí tu reseña, sugerencia o felicitación..." />
            {errors.mensaje && <span className="field__error">{errors.mensaje}</span>}
          </div>

          <div className="privacy">
            <strong>Aviso de privacidad</strong>
            <p>Proporciona datos de contacto reales para poder dar seguimiento a tu solicitud. Tus datos personales son confidenciales y están protegidos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
          </div>

          {errors.submit && <p className="field__error" style={{ marginBottom: 12 }}>{errors.submit}</p>}

          <button type="submit" className="btn btn--primary btn--block btn--lg">
            Revisar y enviar <Icon name="send" size={18} />
          </button>
        </form>
      </div>

      {preview && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setPreview(false)}>
          <div className="modal__box card">
            <h2>Vista previa</h2>
            <p className="modal__sub">Así se verá tu reseña publicada:</p>
            <div className="rev rev--preview">
              <Stars value={form.calificacion} />
              <p className="rev__text">{form.mensaje}</p>
              <div className="rev__foot">
                <span className="rev__avatar">{form.nombre.slice(0, 2).toUpperCase()}</span>
                <div className="rev__meta">
                  <strong>{form.nombre}</strong>
                  <span>Paciente · Chilpancingo · {new Date().toLocaleDateString('es-MX')}</span>
                </div>
                <span className="rev__tag" style={{ background: 'rgba(53,189,173,0.14)', color: 'var(--brand-800)' }}>{form.tipo}</span>
              </div>
            </div>
            <div className="modal__actions">
              <button className="btn btn--primary btn--block" onClick={publish} disabled={status === 'saving'}>
                {status === 'saving' ? 'Publicando…' : 'Confirmar y publicar'}
              </button>
              <button className="btn btn--ghost btn--block" onClick={() => setPreview(false)} disabled={status === 'saving'}>
                Volver a editar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
