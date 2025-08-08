import React, { useEffect, useRef, useState } from 'react'
import { Infrastructure } from '../model/Infrastructure'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchInfrastructureData: () => Promise<Infrastructure[]> = async () => {
  const q = query(collection(db, 'infrastructure'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { id, name, description, location, condition, scheduledMaintenance } = doc.data()
    const infrastructure = {
      id: id,
      name: name,
      description: description,
      location: location,
      condition: condition,
      scheduledMaintenance: scheduledMaintenance
    }
    return infrastructure
  })
}

const deleteInfrastructureData = async (name: string) => {
  const q = query(collection(db, 'infrastructure'), where('name', '==', name))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewInfrastructure = () => {
  const [infrastructure, setInfrastructure] = useState<Infrastructure[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<Infrastructure | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const conditionRef = useRef<HTMLInputElement>(null)
  const scheduledMaintenanceRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInfrastructureData().then((infrastructure) => setInfrastructure(infrastructure))
  }, [])

  const handleDelete = async (name: string) => {
    await deleteInfrastructureData(name)
    // Refresh the infrastructure data after deletion
    fetchInfrastructureData().then((infrastructure) => setInfrastructure(infrastructure))
  }

  const handleEdit = (infrastructure: Infrastructure) => {
    setSelectedInfrastructure(infrastructure)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'infrastructure'),
      where('name', '==', selectedInfrastructure?.name)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        name: nameRef.current?.value,
        description: descriptionRef.current?.value,
        location: locationRef.current?.value,
        condition: conditionRef.current?.value,
        scheduledMaintenance: scheduledMaintenanceRef.current?.value
      })
      fetchInfrastructureData().then((infrastructure) => setInfrastructure(infrastructure))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {infrastructure?.map((infrastructure, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {infrastructure.name}</div>
            <div>
              <strong>Description : </strong>
              {infrastructure.description}
            </div>
            <div>
              <strong>Location : </strong>
              {infrastructure.location}
            </div>
            <div>
              <strong>Condition : </strong>
              {infrastructure.condition}
            </div>
            <div>
              <strong>Scheduled Maintenance : </strong>
              {infrastructure.scheduledMaintenance}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(infrastructure.name)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(infrastructure)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedInfrastructure && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInfrastructure.name}
                />
                <label className="text-gray-600">Description</label>
                <input
                  ref={descriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInfrastructure.description}
                />
                <label className="text-gray-600">Location</label>
                <input
                  ref={locationRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInfrastructure.location}
                />
                <label className="text-gray-600">Condition</label>
                <input
                  ref={conditionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInfrastructure.condition}
                />
                <label className="text-gray-600">Scheduled Maintenance</label>
                <input
                  ref={scheduledMaintenanceRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInfrastructure.scheduledMaintenance}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Infrastructure
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

export default ViewInfrastructure
