import React, { useEffect, useState } from 'react'
import { SecuritySchedule } from '../model/SecuritySchedule'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchSecurityScheduleData: () => Promise<SecuritySchedule[]> = async () => {
  const q = query(collection(db, 'securitySchedule'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      date,
      shiftStart,
      shiftEnd,
      securityName,
      securitySpecialist,
      securityGender,
      securityDOB,
      location,
      status
    } = doc.data()
    const securitySchedule: SecuritySchedule = {
      date: date,
      shiftStart: shiftStart,
      shiftEnd: shiftEnd,
      securityName: securityName,
      securitySpecialist: securitySpecialist,
      securityGender: securityGender,
      securityDOB: securityDOB,
      location: location,
      status: status
    }
    return securitySchedule
  })
}

const deleteSecurityScheduleData = async (securityName: string) => {
  const q = query(collection(db, 'securitySchedule'), where('securityName', '==', securityName))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewSecuritySchedule = () => {
  const [securitySchedule, setSecuritySchedule] = useState<SecuritySchedule[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedSecuritySchedule, setSelectedSecuritySchedule] = useState<SecuritySchedule | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSecurityScheduleData().then((securitySchedule) => setSecuritySchedule(securitySchedule))
  }, [])

  const handleDelete = async (securityName: string) => {
    await deleteSecurityScheduleData(securityName)
    // Refresh the security schedule data after deletion
    fetchSecurityScheduleData().then((securitySchedule) => setSecuritySchedule(securitySchedule))
  }

  const handleEdit = (securitySchedule: SecuritySchedule) => {
    setSelectedSecuritySchedule(securitySchedule)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const q = query(
      collection(db, 'securitySchedule'),
      where('securityName', '==', selectedSecuritySchedule?.securityName)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        date: selectedSecuritySchedule?.date,
        shiftStart: selectedSecuritySchedule?.shiftStart,
        shiftEnd: selectedSecuritySchedule?.shiftEnd,
        securityName: selectedSecuritySchedule?.securityName,
        securitySpecialist: selectedSecuritySchedule?.securitySpecialist,
        securityGender: selectedSecuritySchedule?.securityGender,
        securityDOB: selectedSecuritySchedule?.securityDOB,
        location: selectedSecuritySchedule?.location,
        status: selectedSecuritySchedule?.status
      })
      fetchSecurityScheduleData().then((securitySchedule) => setSecuritySchedule(securitySchedule))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {securitySchedule?.map((securitySchedule, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {securitySchedule.securityName}</div>
            <div>
              <strong>Date : </strong>
              {securitySchedule.date}
            </div>
            <div>
              <strong>Shift Start : </strong>
              {securitySchedule.shiftStart}
            </div>
            <div>
              <strong>Shift End : </strong>
              {securitySchedule.shiftEnd}
            </div>
            <div>
              <strong>Security Specialist : </strong>
              {securitySchedule.securitySpecialist}
            </div>
            <div>
              <strong>Security Gender : </strong>
              {securitySchedule.securityGender}
            </div>
            <div>
              <strong>Security DOB : </strong>
              {securitySchedule.securityDOB}
            </div>
            <div>
              <strong>Location : </strong>
              {securitySchedule.location}
            </div>
            <div>
              <strong>Status : </strong>
              {securitySchedule.status}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(securitySchedule.securityName)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(securitySchedule)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedSecuritySchedule && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Date</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.date}
                />
                <label className="text-gray-600">Shift Start</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.shiftStart}
                />
                <label className="text-gray-600">Shift End</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.shiftEnd}
                />
                <label className="text-gray-600">Security Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.securityName}
                />
                <label className="text-gray-600">Security Specialist</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.securitySpecialist}
                />
                <label className="text-gray-600">Security Gender</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.securityGender}
                />
                <label className="text-gray-600">Security DOB</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.securityDOB}
                />
                <label className="text-gray-600">Location</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.location}
                />
                <label className="text-gray-600">Status</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecuritySchedule.status}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Security Schedule
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

export default ViewSecuritySchedule
