import React, { useEffect, useRef, useState } from 'react'
import { AirportGoal } from '../model/AirportGoal'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchAirportGoalData: () => Promise<AirportGoal[]> = async () => {
  const q = query(collection(db, 'airportGoal'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { goalID, goalDescription, goalStatus, postedDate } = doc.data()
    const airportGoal: AirportGoal = {
      goalID: goalID,
      goalDescription: goalDescription,
      goalStatus: goalStatus,
      postedDate: postedDate
    }
    return airportGoal
  })
}

const deleteAirportGoalData = async (goalID: string) => {
  const q = query(collection(db, 'airportGoal'), where('goalID', '==', goalID))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewAirportGoal = () => {
  const [airportGoal, setAirportGoal] = useState<AirportGoal[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedAirportGoal, setSelectedAirportGoal] = useState<AirportGoal | null>(null)
  const goalDescriptionRef = useRef<HTMLInputElement>(null)
  const goalStatusRef = useRef<HTMLInputElement>(null)
  const postedDateRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAirportGoalData().then((airportGoal) => setAirportGoal(airportGoal))
  }, [])

  const handleDelete = async (goalID: string) => {
    await deleteAirportGoalData(goalID)
    // Refresh the airport goal data after deletion
    fetchAirportGoalData().then((airportGoal) => setAirportGoal(airportGoal))
  }

  const handleEdit = (airportGoal: AirportGoal) => {
    setSelectedAirportGoal(airportGoal)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'airportGoal'),
      where('goalID', '==', selectedAirportGoal?.goalID)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        goalDescription: goalDescriptionRef.current?.value,
        goalStatus: goalStatusRef.current?.value,
        postedDate: postedDateRef.current?.value
      })
      fetchAirportGoalData().then((airportGoal) => setAirportGoal(airportGoal))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {airportGoal?.map((airportGoal, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {airportGoal.goalID}</div>
            <div>
              <strong>Description : </strong>
              {airportGoal.goalDescription}
            </div>
            <div>
              <strong>Status : </strong>
              {airportGoal.goalStatus}
            </div>
            <div>
              <strong>Posted Date : </strong>
              {airportGoal.postedDate}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(airportGoal.goalID)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(airportGoal)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedAirportGoal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Goal Description</label>
                <input
                  ref={goalDescriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedAirportGoal.goalDescription}
                />
                <label className="text-gray-600">Goal Status</label>
                <input
                  ref={goalStatusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedAirportGoal.goalStatus}
                />
                <label className="text-gray-600">Posted Date</label>
                <input
                  ref={postedDateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedAirportGoal.postedDate}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Airport Goal
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

export default ViewAirportGoal
