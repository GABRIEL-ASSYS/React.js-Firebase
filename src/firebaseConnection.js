import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDU98rqywO6h_onrmpUNvSP1vxXZJih7Mk",
    authDomain: "banco-dados-7de6d.firebaseapp.com",
    projectId: "banco-dados-7de6d",
    storageBucket: "banco-dados-7de6d.appspot.com",
    messagingSenderId: "394890451575",
    appId: "1:394890451575:web:ec07cb4a942ece42e7c472",
    measurementId: "G-REBLT43DLG"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }