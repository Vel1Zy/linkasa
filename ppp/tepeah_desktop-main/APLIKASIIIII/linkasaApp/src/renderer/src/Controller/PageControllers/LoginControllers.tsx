import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, employees, passengerCollection } from '../FirebaseConfig/firebaseConfig'
import { getDocs, query, where } from 'firebase/firestore'
import { Employee } from '../Interfaces/EmployeeInterface'

const LoginAction = async (email: string, password: string) => {
  try {
    let isEmployee = true
    let isPassenger = true
    isEmployee = await checkEmployeeEmail(email)
    isPassenger = await checkPassengerEmail(email)
    console.log(isEmployee)
    if (isEmployee && !isPassenger) {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } else if (isPassenger && !isEmployee) {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

const signOutAction = async (): Promise<boolean> => {
  try {
    await signOut(auth)
    window.location.replace('/employee-login')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const checkEmployeeEmail = async (email: string): Promise<boolean> => {
  console.log(email)
  // const docs = (await getDocs(query(employees, where('companyEmail', '==', email)))).docs;
  const docs = await getDocs(query(employees, where('companyEmail', '==', email)))
  const d = await getDocs(employees)
  console.log(d.docs.length)
  console.log(docs.docs.length)
  return docs.docs.length == 1
}

const checkPassengerEmail = async (email: string): Promise<boolean> => {
  console.log(email)
  // const docs = (await getDocs(query(employees, where('companyEmail', '==', email)))).docs;
  const docs = await getDocs(query(passengerCollection, where('email', '==', email)))
  console.log(docs.docs.length)
  return docs.docs.length == 1
}

const getEmployeeInformation = async (email: string) => {
  const employeeDocs = await getDocs(query(employees, where('companyEmail', '==', email)))
  const employeeDocData = employeeDocs.docs[0].data() as Employee
  return employeeDocData
}

export { LoginAction, getEmployeeInformation, signOutAction }
