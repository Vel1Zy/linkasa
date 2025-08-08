import React, { useEffect, useRef, useState } from 'react'
import { StaffTraining } from '../model/StaffTraining'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchStaffTrainingData: () => Promise<StaffTraining[]> = async () => {
  const q = query(collection(db, 'staffTraining'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      trainingID,
      trainingName,
      trainingDate,
      trainingTime,
      trainingLocation,
      trainerName,
      trainerEmail,
      status
    } = doc.data()
    const staffTraining = {
      trainingID: trainingID,
      trainingName: trainingName,
      trainingDate: trainingDate,
      trainingTime: trainingTime,
      trainingLocation: trainingLocation,
      trainerName: trainerName,
      trainerEmail: trainerEmail,
      status: status
    }
    return staffTraining
  })
}

const deleteStaffTrainingData = async (trainingID: string) => {
  const q = query(collection(db, 'staffTraining'), where('trainingID', '==', trainingID))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewStaffTraining = () => {
  const [staffTraining, setStaffTraining] = useState<StaffTraining[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedStaffTraining, setSelectedStaffTraining] = useState<StaffTraining | null>(null)
  const trainingNameRef = useRef<HTMLInputElement>(null)
  const trainingDateRef = useRef<HTMLInputElement>(null)
  const trainingTimeRef = useRef<HTMLInputElement>(null)
  const trainingLocationRef = useRef<HTMLInputElement>(null)
  const trainerNameRef = useRef<HTMLInputElement>(null)
  const trainerEmailRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStaffTrainingData().then((staffTraining) => setStaffTraining(staffTraining))
  }, [])

  const handleDelete = async (trainingID: string) => {
    await deleteStaffTrainingData(trainingID)
    // Refresh the staff training data after deletion
    fetchStaffTrainingData().then((staffTraining) => setStaffTraining(staffTraining))
  }

  const handleEdit = (staffTraining: StaffTraining) => {
    setSelectedStaffTraining(staffTraining)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'staffTraining'),
      where('trainingID', '==', selectedStaffTraining?.trainingID)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        trainingName: trainingNameRef.current?.value,
        trainingDate: trainingDateRef.current?.value,
        trainingTime: trainingTimeRef.current?.value,
        trainingLocation: trainingLocationRef.current?.value,
        trainerName: trainerNameRef.current?.value,
        trainerEmail: trainerEmailRef.current?.value,
        status: statusRef.current?.value
      })
      fetchStaffTrainingData().then((staffTraining) => setStaffTraining(staffTraining))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {staffTraining?.map((staffTraining, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {staffTraining.trainingName}</div>
            <div>
              <strong>Date : </strong>
              {staffTraining.trainingDate}
            </div>
            <div>
              <strong>Time : </strong>
              {staffTraining.trainingTime}
            </div>
            <div>
              <strong>Location : </strong>
              {staffTraining.trainingLocation}
            </div>
            <div>
              <strong>Trainer Name : </strong>
              {staffTraining.trainerName}
            </div>
            <div>
              <strong>Trainer Email : </strong>
              {staffTraining.trainerEmail}
            </div>
            <div>
              <strong>Status : </strong>
              {staffTraining.status}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(staffTraining.trainingID)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(staffTraining)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedStaffTraining && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Training Name</label>
                <input
                  ref={trainingNameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.trainingName}
                />
                <label className="text-gray-600">Training Date</label>
                <input
                  ref={trainingDateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.trainingDate}
                />
                <label className="text-gray-600">Training Time</label>
                <input
                  ref={trainingTimeRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.trainingTime}
                />
                <label className="text-gray-600">Training Location</label>
                <input
                  ref={trainingLocationRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.trainingLocation}
                />
                <label className="text-gray-600">Trainer Name</label>
                <input
                  ref={trainerNameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.trainerName}
                />
                <label className="text-gray-600">Trainer Email</label>
                <input
                  ref={trainerEmailRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.trainerEmail}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={statusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaffTraining.status}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Staff Training
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

export default ViewStaffTraining
