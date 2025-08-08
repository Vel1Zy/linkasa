import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const CreateNewFlight = async (data: any) => {
  try {
    await addDoc(collection(db, 'flight'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewFlight }
