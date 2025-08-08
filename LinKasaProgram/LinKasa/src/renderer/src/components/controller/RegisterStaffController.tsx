import { setDoc, doc, collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const CreateNewStaff = async (data: any) => {
  try {
    await addDoc(collection(db, 'staff'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export const CreateNewStaffLoginData = async (firebaseAuthenticationData: any) => {
  createUserWithEmailAndPassword(
    auth,
    firebaseAuthenticationData.emailAddress,
    firebaseAuthenticationData.password
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      console.log('create Email and Password Fail')
    })
}
