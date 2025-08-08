import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { StaffTraining } from '../model/StaffTraining'

const CreateNewStaffTraining = async (data: StaffTraining) => {
  try {
    await addDoc(collection(db, 'staffTraining'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewStaffTraining }
