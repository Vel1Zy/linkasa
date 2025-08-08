import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { Infrastructure } from '../model/Infrastructure'

const CreateNewInfrastructure = async (data: Infrastructure) => {
  try {
    await addDoc(collection(db, 'infrastructure'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewInfrastructure }
