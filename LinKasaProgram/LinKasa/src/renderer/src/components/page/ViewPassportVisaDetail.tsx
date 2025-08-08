import React, { useEffect, useRef, useState } from 'react'
import { PassportVisa } from '../model/PassportVisa'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchPassportVisaData: () => Promise<PassportVisa[]> = async () => {
  const q = query(collection(db, 'passportVisa'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { fullName, dateOfBirth, placeOfBirth, nationality, passportNumber, visaNumber } =
      doc.data()
    const passportVisa: PassportVisa = {
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      placeOfBirth: placeOfBirth,
      nationality: nationality,
      passportNumber: passportNumber,
      visaNumber: visaNumber
    }
    return passportVisa
  })
}

const deletePassportVisaData = async (fullName: string) => {
  const q = query(collection(db, 'passportVisa'), where('fullName', '==', fullName))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewPassportVisaDetail = () => {
  const [passportVisa, setPassportVisa] = useState<PassportVisa[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedPassportVisa, setSelectedPassportVisa] = useState<PassportVisa | null>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)
  const dateOfBirthRef = useRef<HTMLInputElement>(null)
  const placeOfBirthRef = useRef<HTMLInputElement>(null)
  const nationalityRef = useRef<HTMLInputElement>(null)
  const passportNumberRef = useRef<HTMLInputElement>(null)
  const visaNumberRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPassportVisaData().then((passportVisa) => setPassportVisa(passportVisa))
  }, [])

  const handleDelete = async (fullName: string) => {
    await deletePassportVisaData(fullName)
    // Refresh the passportVisa data after deletion
    fetchPassportVisaData().then((passportVisa) => setPassportVisa(passportVisa))
  }

  const handleEdit = (passportVisa: PassportVisa) => {
    setSelectedPassportVisa(passportVisa)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'passportVisa'),
      where('fullName', '==', selectedPassportVisa?.fullName)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        fullName: fullNameRef.current?.value,
        dateOfBirth: dateOfBirthRef.current?.value,
        placeOfBirth: placeOfBirthRef.current?.value,
        nationality: nationalityRef.current?.value,
        passportNumber: passportNumberRef.current?.value,
        visaNumber: visaNumberRef.current?.value
      })
      fetchPassportVisaData().then((passportVisa) => setPassportVisa(passportVisa))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {passportVisa?.map((passportVisa, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {passportVisa.fullName}</div>
            <div>
              <strong>Date of Birth : </strong>
              {passportVisa.dateOfBirth}
            </div>
            <div>
              <strong>Place of Birth : </strong>
              {passportVisa.placeOfBirth}
            </div>
            <div>
              <strong>Nationality : </strong>
              {passportVisa.nationality}
            </div>
            <div>
              <strong>Passport Number : </strong>
              {passportVisa.passportNumber}
            </div>
            <div>
              <strong>Visa Number : </strong>
              {passportVisa.visaNumber}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(passportVisa.fullName)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(passportVisa)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedPassportVisa && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Full Name</label>
                <input
                  ref={fullNameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedPassportVisa.fullName}
                />
                <label className="text-gray-600">Date of Birth</label>
                <input
                  ref={dateOfBirthRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedPassportVisa.dateOfBirth}
                />
                <label className="text-gray-600">Place of Birth</label>
                <input
                  ref={placeOfBirthRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedPassportVisa.placeOfBirth}
                />
                <label className="text-gray-600">Nationality</label>
                <input
                  ref={nationalityRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedPassportVisa.nationality}
                />
                <label className="text-gray-600">Passport Number</label>
                <input
                  ref={passportNumberRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedPassportVisa.passportNumber}
                />
                <label className="text-gray-600">Visa Number</label>
                <input
                  ref={visaNumberRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedPassportVisa.visaNumber}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update PassportVisa
                </button>
                <button
                  className="bg-red-500 text-white rounded-md p-2 mt-2"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewPassportVisaDetail
