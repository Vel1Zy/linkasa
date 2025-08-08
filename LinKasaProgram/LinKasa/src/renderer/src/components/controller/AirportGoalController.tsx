import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { AirportGoal } from '../model/AirportGoal'

const CreateNewAirportGoal = async (data: AirportGoal) => {
  try {
    await addDoc(collection(db, 'airportGoal'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewAirportGoal }
