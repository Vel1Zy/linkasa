import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { MaintenanceSchedule } from '../model/MaintenanceSchedule'

const CreateNewMaintenanceSchedule = async (data: MaintenanceSchedule) => {
  try {
    await addDoc(collection(db, 'maintenanceSchedule'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewMaintenanceSchedule }
