// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDwm2MjjcOo2JsdiEaJXAqzoyAg28dr1jI',
  authDomain: 'pre-tpa-ba4fc.firebaseapp.com',
  projectId: 'pre-tpa-ba4fc',
  storageBucket: 'pre-tpa-ba4fc.appspot.com',
  messagingSenderId: '191800398201',
  appId: '1:191800398201:web:9f17230fb7920035065fa8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
