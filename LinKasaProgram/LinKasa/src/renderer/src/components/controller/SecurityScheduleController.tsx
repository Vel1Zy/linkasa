import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { SecuritySchedule } from '../model/SecuritySchedule'

const CreateNewSecuritySchedule = async (data: SecuritySchedule) => {
  try {
    await addDoc(collection(db, 'securitySchedule'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewSecuritySchedule }
