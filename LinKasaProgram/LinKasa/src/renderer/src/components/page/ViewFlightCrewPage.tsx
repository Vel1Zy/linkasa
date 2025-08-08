import React, { useEffect, useState, useRef } from 'react'
import { FlightCrew, roles } from '../model/FlightCrew'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchFlightCrewData: () => Promise<FlightCrew[]> = async () => {
  const q = query(collection(db, 'flightCrew'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { name, emailAddress, role } = doc.data()
    const flightCrew = {
      name: name,
      emailAddress: emailAddress,
      role: role
    }
    return flightCrew
  })
}

const deleteFlightCrewData = async (emailAddress: string) => {
  const q = query(collection(db, 'flightCrew'), where('emailAddress', '==', emailAddress))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewFlightCrewPage = () => {
  const [flightCrew, setFlightCrew] = useState<FlightCrew[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedCrew, setSelectedCrew] = useState<FlightCrew | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLSelectElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFlightCrewData().then((flightCrew) => setFlightCrew(flightCrew))
  }, [])

  const handleDelete = async (emailAddress: string) => {
    await deleteFlightCrewData(emailAddress)
    // Refresh the flight crew data after deletion
    fetchFlightCrewData().then((flightCrew) => setFlightCrew(flightCrew))
  }

  const handleEdit = (crew: FlightCrew) => {
    setSelectedCrew(crew)
    console.log(crew.name)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(collection(db, 'flightCrew'), where('name', '==', selectedCrew?.name))
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        name: nameRef.current?.value,
        emailAddress: emailAddressRef.current?.value,
        role: roleRef.current?.value
      })
      fetchFlightCrewData().then((flightCrew) => setFlightCrew(flightCrew))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {flightCrew?.map((crew, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold">{crew.name}</div>
            <div>{crew.emailAddress}</div>
            <div>{crew.role}</div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(crew.emailAddress)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(crew)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedCrew && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Staff Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedCrew.name}
                />
                <label className="text-gray-600">Email Address</label>
                <input
                  ref={emailAddressRef}
                  type="email"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedCrew.emailAddress}
                />
                <label className="text-gray-600">Position</label>
                <select
                  ref={roleRef}
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedCrew.role}
                >
                  {roles.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update User
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewFlightCrewPage
