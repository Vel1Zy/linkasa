import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { SecurityIncident } from '../model/SecurityIncident'

const CreateNewSecurityIncident = async (data: SecurityIncident) => {
  try {
    await addDoc(collection(db, 'securityIncident'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewSecurityIncident }
