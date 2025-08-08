import { db } from '@renderer/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'

export const CreateNewFlightCrew = async (data: any) => {
  try {
    await addDoc(collection(db, 'flightCrew'), data)
    console.log('Document successfully written!')
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}
