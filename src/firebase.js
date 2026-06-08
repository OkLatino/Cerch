// Firebase connection — preserved from the original CERCH site.
// Same project (cerch-app) and same Firestore collection ("quejas"),
// so existing reseñas, comentarios y quejas remain intact.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCIe4Etwj_C_A5TniuqTfHFEsL5uYedZAY',
  authDomain: 'cerch-app.firebaseapp.com',
  projectId: 'cerch-app',
  storageBucket: 'cerch-app.firebasestorage.app',
  messagingSenderId: '881069781418',
  appId: '1:881069781418:web:f03bee969d2848e2ddbbd3',
  measurementId: 'G-3HGG18SJB5',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Collection name kept identical to the legacy site.
export const COLLECTION_NAME = 'quejas'
