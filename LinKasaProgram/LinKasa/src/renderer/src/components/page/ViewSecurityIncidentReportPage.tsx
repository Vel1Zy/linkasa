import React, { useEffect, useRef, useState } from 'react'
import { SecurityIncident } from '../model/SecurityIncident'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchSecurityIncidentData: () => Promise<SecurityIncident[]> = async () => {
  const q = query(collection(db, 'securityIncident'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      id,
      title,
      description,
      suspectName,
      suspectDescription,
      locationHappened,
      dateHappened,
      timeHappened,
      status
    } = doc.data()
    const securityIncident = {
      id: id,
      title: title,
      description: description,
      suspectName: suspectName,
      suspectDescription: suspectDescription,
      locationHappened: locationHappened,
      dateHappened: dateHappened,
      timeHappened: timeHappened,
      status: status
    }
    return securityIncident
  })
}

const deleteSecurityIncidentData = async (id: string) => {
  const q = query(collection(db, 'securityIncident'), where('id', '==', id))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewSecurityIncident = () => {
  const [securityIncident, setSecurityIncident] = useState<SecurityIncident[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedSecurityIncident, setSelectedSecurityIncident] = useState<SecurityIncident | null>(
    null
  )
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const suspectNameRef = useRef<HTMLInputElement>(null)
  const suspectDescriptionRef = useRef<HTMLInputElement>(null)
  const locationHappenedRef = useRef<HTMLInputElement>(null)
  const dateHappenedRef = useRef<HTMLInputElement>(null)
  const timeHappenedRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSecurityIncidentData().then((securityIncident) => setSecurityIncident(securityIncident))
  }, [])

  const handleDelete = async (id: string) => {
    await deleteSecurityIncidentData(id)
    // Refresh the security incident data after deletion
    fetchSecurityIncidentData().then((securityIncident) => setSecurityIncident(securityIncident))
  }

  const handleEdit = (securityIncident: SecurityIncident) => {
    setSelectedSecurityIncident(securityIncident)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'securityIncident'),
      where('id', '==', selectedSecurityIncident?.id)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        suspectName: suspectNameRef.current?.value,
        suspectDescription: suspectDescriptionRef.current?.value,
        locationHappened: locationHappenedRef.current?.value,
        dateHappened: dateHappenedRef.current?.value,
        timeHappened: timeHappenedRef.current?.value,
        status: statusRef.current?.value
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {securityIncident?.map((securityIncident, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {securityIncident.title}</div>
            <div>
              <strong>Description : </strong>
              {securityIncident.description}
            </div>
            <div>
              <strong>Suspect Name : </strong>
              {securityIncident.suspectName}
            </div>
            <div>
              <strong>Suspect Description : </strong>
              {securityIncident.suspectDescription}
            </div>
            <div>
              <strong>Location Happened : </strong>
              {securityIncident.locationHappened}
            </div>
            <div>
              <strong>Date Happened : </strong>
              {securityIncident.dateHappened}
            </div>
            <div>
              <strong>Time Happened : </strong>
              {securityIncident.timeHappened}
            </div>
            <div>
              <strong>Status : </strong>
              {securityIncident.status}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(securityIncident.id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(securityIncident)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedSecurityIncident && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Title</label>
                <input
                  ref={titleRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.title}
                />
                <label className="text-gray-600">Description</label>
                <input
                  ref={descriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.description}
                />
                <label className="text-gray-600">Suspect Name</label>
                <input
                  ref={suspectNameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.suspectName}
                />
                <label className="text-gray-600">Suspect Description</label>
                <input
                  ref={suspectDescriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.suspectDescription}
                />
                <label className="text-gray-600">Location Happened</label>
                <input
                  ref={locationHappenedRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.locationHappened}
                />
                <label className="text-gray-600">Date Happened</label>
                <input
                  ref={dateHappenedRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.dateHappened}
                />
                <label className="text-gray-600">Time Happened</label>
                <input
                  ref={timeHappenedRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.timeHappened}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={statusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedSecurityIncident.status}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Security Incident
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

export default ViewSecurityIncident
