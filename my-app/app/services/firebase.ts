import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyB4C1fi6CA1Vp7ED7komyQR3ngkMDRUuYA",
  authDomain: "teste-d4d72.firebaseapp.com",
  projectId: "teste-d4d72",
  storageBucket: "teste-d4d72.firebasestorage.app",
  messagingSenderId: "420440934684",
  appId: "1:420440934684:web:9a9ae8fec0349dd16c12d9"
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp