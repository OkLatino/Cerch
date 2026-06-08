import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db, COLLECTION_NAME } from '../firebase.js'

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000

// Lee la colección "quejas" en tiempo real (reseñas, comentarios y quejas).
// publicOnly => sólo las de los últimos 30 días (regla del sitio original).
export function useReviews({ publicOnly = true } = {}) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('fecha', 'desc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        const now = Date.now()
        const filtered = publicOnly
          ? all.filter((c) => now - new Date(c.fecha).getTime() < ONE_MONTH_MS)
          : all
        setReviews(filtered)
        setLoading(false)
      },
      (err) => {
        console.error('Error al leer reseñas:', err)
        setError(err)
        setLoading(false)
      },
    )
    return () => unsub()
  }, [publicOnly])

  return { reviews, loading, error }
}
