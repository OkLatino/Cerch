import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, COLLECTION_NAME } from '../firebase.js'
import Icon from '../components/Icon.jsx'

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000

export default function Admin() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('fecha', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return () => unsub()
  }, [])

  async function remove(id) {
    if (!confirm('¿Eliminar este mensaje permanentemente?')) return
    try { await deleteDoc(doc(db, COLLECTION_NAME, id)) }
    catch (e) { alert('Error al borrar el documento.') }
  }

  async function saveEdit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateDoc(doc(db, COLLECTION_NAME, edit.id), {
        nombre: edit.nombre, telefono: edit.telefono, correo: edit.correo, mensaje: edit.mensaje,
      })
      setEdit(null)
    } catch (e) { alert('Error al editar.') }
    finally { setSaving(false) }
  }

  const now = Date.now()
  const visibles = rows.filter((r) => r.fecha && now - new Date(r.fecha).getTime() <= ONE_MONTH_MS).length

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="container admin__bar-in">
          <Link to="/" className="admin__brand">
            <img src="/images/logo.webp" alt="" width="34" height="34" /> CERCH · Gestor de quejas
          </Link>
          <Link to="/" className="admin__back"><Icon name="arrowLeft" size={16} /> Sitio público</Link>
        </div>
      </header>

      <main className="container admin__main">
        <div className="admin__stats">
          <div className="admin__stat"><span>{rows.length}</span> mensajes totales</div>
          <div className="admin__stat"><span>{visibles}</span> visibles (≤ 30 días)</div>
          <div className="admin__stat"><span>{rows.length - visibles}</span> archivados</div>
        </div>

        {loading ? (
          <div className="admin__empty">Cargando mensajes…</div>
        ) : rows.length === 0 ? (
          <div className="admin__empty">No hay mensajes registrados aún.</div>
        ) : (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr><th>Fecha</th><th>Nombre</th><th>Contacto</th><th>Tipo / ★</th><th>Mensaje</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isOld = r.fecha ? now - new Date(r.fecha).getTime() > ONE_MONTH_MS : false
                  return (
                    <tr key={r.id}>
                      <td className="nowrap">{r.fecha ? new Date(r.fecha).toLocaleString('es-MX') : 'N/A'}</td>
                      <td>{r.nombre}</td>
                      <td className="admin__contact"><div>📞 {r.telefono}</div><div>✉️ {r.correo}</div></td>
                      <td className="nowrap">{r.tipo || '—'}{typeof r.calificacion === 'number' ? ` · ${r.calificacion}★` : ''}</td>
                      <td className="admin__msg">{r.mensaje}</td>
                      <td><span className={`badge ${isOld ? 'badge--off' : 'badge--on'}`}>{isOld ? 'Archivado' : 'Visible'}</span></td>
                      <td className="nowrap">
                        <button className="admin__act" onClick={() => setEdit({ ...r })}>Editar</button>
                        <button className="admin__act admin__act--del" onClick={() => remove(r.id)}>Borrar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {edit && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && setEdit(null)}>
          <form className="modal__box card" onSubmit={saveEdit}>
            <h2>Editar mensaje</h2>
            <div className="field"><label>Nombre</label><input value={edit.nombre || ''} onChange={(e) => setEdit({ ...edit, nombre: e.target.value })} /></div>
            <div className="grid-2">
              <div className="field"><label>Teléfono</label><input value={edit.telefono || ''} onChange={(e) => setEdit({ ...edit, telefono: e.target.value })} /></div>
              <div className="field"><label>Correo</label><input value={edit.correo || ''} onChange={(e) => setEdit({ ...edit, correo: e.target.value })} /></div>
            </div>
            <div className="field"><label>Mensaje</label><textarea value={edit.mensaje || ''} onChange={(e) => setEdit({ ...edit, mensaje: e.target.value })} /></div>
            <div className="modal__actions">
              <button type="submit" className="btn btn--primary btn--block" disabled={saving}>{saving ? 'Guardando…' : 'Guardar cambios'}</button>
              <button type="button" className="btn btn--ghost btn--block" onClick={() => setEdit(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
