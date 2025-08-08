import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { InterviewSchedule } from '../model/InterviewSchedule'
const CreateNewInterviewSchedule = async (data: InterviewSchedule) => {
  try {
    await addDoc(collection(db, 'interviewSchedule'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewInterviewSchedule }
