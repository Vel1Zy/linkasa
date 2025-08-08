import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { JobVacancy } from '../model/JobVacancy'

const WriteJobVacancy = async (data: JobVacancy) => {
  try {
    await addDoc(collection(db, 'jobVacancy'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { WriteJobVacancy }
