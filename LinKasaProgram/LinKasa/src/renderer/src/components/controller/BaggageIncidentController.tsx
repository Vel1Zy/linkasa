import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { BaggageIncident } from '../model/BaggageIncident'

const CreateNewBaggageIncident = async (data: BaggageIncident) => {
  try {
    await addDoc(collection(db, 'baggageIncident'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewBaggageIncident }
