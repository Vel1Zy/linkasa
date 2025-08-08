import React, { useEffect, useRef, useState } from 'react'
import { MaintenanceSchedule } from '../model/MaintenanceSchedule'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchMaintenanceScheduleData: () => Promise<MaintenanceSchedule[]> = async () => {
  const q = query(collection(db, 'maintenanceSchedule'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { id, title, description, location, facility, date, time, personnelAssigned, status } =
      doc.data()
    const maintenanceSchedule = {
      id: id,
      title: title,
      description: description,
      location: location,
      facility: facility,
      date: date,
      time: time,
      personnelAssigned: personnelAssigned,
      status: status
    }
    return maintenanceSchedule
  })
}

const deleteMaintenanceScheduleData = async (title: string) => {
  const q = query(collection(db, 'maintenanceSchedule'), where('title', '==', title))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewMaintenanceSchedulePage = () => {
  const [maintenanceSchedule, setMaintenanceSchedule] = useState<
    MaintenanceSchedule[] | undefined
  >()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedMaintenanceSchedule, setSelectedMaintenanceSchedule] =
    useState<MaintenanceSchedule | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const facilityRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLInputElement>(null)
  const personnelAssignedRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMaintenanceScheduleData().then((maintenanceSchedule) =>
      setMaintenanceSchedule(maintenanceSchedule)
    )
  }, [])

  const handleDelete = async (title: string) => {
    await deleteMaintenanceScheduleData(title)
    // Refresh the maintenance schedule data after deletion
    fetchMaintenanceScheduleData().then((maintenanceSchedule) =>
      setMaintenanceSchedule(maintenanceSchedule)
    )
  }

  const handleEdit = (maintenanceSchedule: MaintenanceSchedule) => {
    setSelectedMaintenanceSchedule(maintenanceSchedule)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'maintenanceSchedule'),
      where('id', '==', selectedMaintenanceSchedule?.id)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        location: locationRef.current?.value,
        facility: facilityRef.current?.value,
        date: dateRef.current?.value,
        time: timeRef.current?.value,
        personnelAssigned: personnelAssignedRef.current?.value,
        status: statusRef.current?.value
      })
      fetchMaintenanceScheduleData().then((maintenanceSchedule) =>
        setMaintenanceSchedule(maintenanceSchedule)
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {maintenanceSchedule?.map((maintenanceSchedule, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {maintenanceSchedule.title}</div>
            <div>
              <strong>Description : </strong>
              {maintenanceSchedule.description}
            </div>
            <div>
              <strong>Location : </strong>
              {maintenanceSchedule.location}
            </div>
            <div>
              <strong>Facility : </strong>
              {maintenanceSchedule.facility}
            </div>
            <div>
              <strong>Date : </strong>
              {maintenanceSchedule.date}
            </div>
            <div>
              <strong>Time : </strong>
              {maintenanceSchedule.time}
            </div>
            <div>
              <strong>Personnel Assigned : </strong>
              {maintenanceSchedule.personnelAssigned}
            </div>
            <div>
              <strong>Status : </strong>
              {maintenanceSchedule.status}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(maintenanceSchedule.title)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(maintenanceSchedule)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedMaintenanceSchedule && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Title</label>
                <input
                  ref={titleRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.title}
                />
                <label className="text-gray-600">Description</label>
                <input
                  ref={descriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.description}
                />
                <label className="text-gray-600">Location</label>
                <input
                  ref={locationRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.location}
                />
                <label className="text-gray-600">Facility</label>
                <input
                  ref={facilityRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.facility}
                />
                <label className="text-gray-600">Date</label>
                <input
                  ref={dateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.date}
                />
                <label className="text-gray-600">Time</label>
                <input
                  ref={timeRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.time}
                />
                <label className="text-gray-600">Personnel Assigned</label>
                <input
                  ref={personnelAssignedRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.personnelAssigned}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={statusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedMaintenanceSchedule.status}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Maintenance Schedule
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

export default ViewMaintenanceSchedulePage
