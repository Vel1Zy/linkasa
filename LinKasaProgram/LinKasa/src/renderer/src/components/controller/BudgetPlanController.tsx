import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import { BudgetPlan } from '../model/BudgetPlan'

const CreateNewBudgetPlan = async (data: BudgetPlan) => {
  try {
    await addDoc(collection(db, 'budgetPlan'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export { CreateNewBudgetPlan }
