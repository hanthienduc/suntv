// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAybBdycr9LtzMhZbSCW1tnV87vNK9xcCM',
  authDomain: 'suntv-e3784.firebaseapp.com',
  projectId: 'suntv-e3784',
  storageBucket: 'suntv-e3784.appspot.com',
  messagingSenderId: '191285671527',
  appId: '1:191285671527:web:17e2ba8090dab9cc08c6c2',
  measurementId: 'G-YJHRTFT70Z',
}

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
