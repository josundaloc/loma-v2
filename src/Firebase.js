import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCpK5nym_wncNlLRcAaAKgJJ4Ek6r5G0yg',
  authDomain: 'loma-b3a1a.firebaseapp.com',
  projectId: 'loma-b3a1a',
  storageBucket: 'loma-b3a1a.appspot.com',
  messagingSenderId: '936413611566',
  appId: '1:936413611566:web:73c348348cb268422b41bf',
  measurementId: 'G-PQMFLTFXC0',
})

export const auth = app.auth()
export const db = app.firestore()
export default app
