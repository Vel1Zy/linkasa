import React, { useEffect, useRef, useState } from 'react'
import { BaggageIncident } from '../model/BaggageIncident'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchBaggageIncidentData: () => Promise<BaggageIncident[]> = async () => {
  const q = query(collection(db, 'baggageIncident'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      baggageIncidentID,
      baggageIncidentDate,
      baggageIncidentTime,
      baggageIncidentLocation,
      baggageIncidentDescription,
      baggageIncidentStatus,
      responseTime,
      actionTaken
    } = doc.data()
    const baggageIncident: BaggageIncident = {
      baggageIncidentID: baggageIncidentID,
      baggageIncidentDate: baggageIncidentDate,
      baggageIncidentTime: baggageIncidentTime,
      baggageIncidentLocation: baggageIncidentLocation,
      baggageIncidentDescription: baggageIncidentDescription,
      baggageIncidentStatus: baggageIncidentStatus,
      responseTime: responseTime,
      actionTaken: actionTaken
    }
    return baggageIncident
  })
}

const deleteBaggageIncidentData = async (baggageIncidentID: string) => {
  const q = query(
    collection(db, 'baggageIncident'),
    where('baggageIncidentID', '==', baggageIncidentID)
  )
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewBaggageIncident = () => {
  const [baggageIncident, setBaggageIncident] = useState<BaggageIncident[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedBaggageIncident, setSelectedBaggageIncident] = useState<BaggageIncident | null>(
    null
  )
  const baggageIncidentDateRef = useRef<HTMLInputElement>(null)
  const baggageIncidentTimeRef = useRef<HTMLInputElement>(null)
  const baggageIncidentLocationRef = useRef<HTMLInputElement>(null)
  const baggageIncidentDescriptionRef = useRef<HTMLInputElement>(null)
  const baggageIncidentStatusRef = useRef<HTMLInputElement>(null)
  const responseTimeRef = useRef<HTMLInputElement>(null)
  const actionTakenRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBaggageIncidentData().then((baggageIncident) => setBaggageIncident(baggageIncident))
  }, [])

  const handleDelete = async (baggageIncidentID: string) => {
    await deleteBaggageIncidentData(baggageIncidentID)
    // Refresh the baggage incident data after deletion
    fetchBaggageIncidentData().then((baggageIncident) => setBaggageIncident(baggageIncident))
  }

  const handleEdit = (baggageIncident: BaggageIncident) => {
    setSelectedBaggageIncident(baggageIncident)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'baggageIncident'),
      where('baggageIncidentID', '==', selectedBaggageIncident?.baggageIncidentID)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        baggageIncidentDate: baggageIncidentDateRef.current?.value,
        baggageIncidentTime: baggageIncidentTimeRef.current?.value,
        baggageIncidentLocation: baggageIncidentLocationRef.current?.value,
        baggageIncidentDescription: baggageIncidentDescriptionRef.current?.value,
        baggageIncidentStatus: baggageIncidentStatusRef.current?.value,
        responseTime: responseTimeRef.current?.value,
        actionTaken: actionTakenRef.current?.value
      })
      fetchBaggageIncidentData().then((baggageIncident) => setBaggageIncident(baggageIncident))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {baggageIncident?.map((baggageIncident, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl">
              {' '}
              {baggageIncident.baggageIncidentID}
            </div>
            <div>
              <strong>Date : </strong>
              {baggageIncident.baggageIncidentDate}
            </div>
            <div>
              <strong>Time : </strong>
              {baggageIncident.baggageIncidentTime}
            </div>
            <div>
              <strong>Location : </strong>
              {baggageIncident.baggageIncidentLocation}
            </div>
            <div>
              <strong>Description : </strong>
              {baggageIncident.baggageIncidentDescription}
            </div>
            <div>
              <strong>Status : </strong>
              {baggageIncident.baggageIncidentStatus}
            </div>
            <div>
              <strong>Response Time : </strong>
              {baggageIncident.responseTime}
            </div>
            <div>
              <strong>Action Taken : </strong>
              {baggageIncident.actionTaken}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(baggageIncident.baggageIncidentID)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(baggageIncident)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedBaggageIncident && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Date</label>
                <input
                  ref={baggageIncidentDateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.baggageIncidentDate}
                />
                <label className="text-gray-600">Time</label>
                <input
                  ref={baggageIncidentTimeRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.baggageIncidentTime}
                />
                <label className="text-gray-600">Location</label>
                <input
                  ref={baggageIncidentLocationRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.baggageIncidentLocation}
                />
                <label className="text-gray-600">Description</label>
                <input
                  ref={baggageIncidentDescriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.baggageIncidentDescription}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={baggageIncidentStatusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.baggageIncidentStatus}
                />
                <label className="text-gray-600">Response Time</label>
                <input
                  ref={responseTimeRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.responseTime}
                />
                <label className="text-gray-600">Action Taken</label>
                <input
                  ref={actionTakenRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBaggageIncident.actionTaken}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Baggage Incident
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

export default ViewBaggageIncident
