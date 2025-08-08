import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { PassportVisa } from '../model/PassportVisa'

const CreateNewPassportVisa = async (data: PassportVisa) => {
  try {
    await addDoc(collection(db, 'passportVisa'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewPassportVisa }
