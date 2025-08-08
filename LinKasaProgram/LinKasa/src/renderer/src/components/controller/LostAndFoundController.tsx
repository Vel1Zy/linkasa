import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
const CreateNewLostAndFound = async (data: any) => {
  try {
    await addDoc(collection(db, 'lostAndFound'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewLostAndFound }
