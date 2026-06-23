import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBrJ0qG0VheMjmjPwwqAYI8Ex9jSG-gsNQ',
  authDomain: 'queueless-mvp.firebaseapp.com',
  projectId: 'queueless-mvp',
  storageBucket: 'queueless-mvp.firebasestorage.app',
  messagingSenderId: '636362694613',
  appId: '1:636362694613:web:2190049c759f65559aa75c',
  measurementId: 'G-J8C8H80FJW',
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
