import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'

import { InspectionRecord } from '../model/InspectionRecord'

const CreateNewInspectionRecord = async (data: InspectionRecord) => {
  try {
    await addDoc(collection(db, 'inspectionRecord'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewInspectionRecord }
