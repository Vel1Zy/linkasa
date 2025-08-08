import React, { useRef } from 'react'
import { MaintenanceSchedule } from '../model/MaintenanceSchedule'
import { CreateNewMaintenanceSchedule } from '../controller/MaintenanceScheduleController'

const CreateMaintenanceSchedule = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const facilityRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLInputElement>(null)
  const personnelAssignedRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      titleRef?.current?.value &&
      descriptionRef?.current?.value &&
      locationRef?.current?.value &&
      facilityRef?.current?.value &&
      dateRef?.current?.value &&
      timeRef?.current?.value &&
      personnelAssignedRef?.current?.value &&
      statusRef?.current?.value
    ) {
      const data: MaintenanceSchedule = {
        id: '',
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        location: locationRef.current?.value,
        facility: facilityRef.current?.value,
        date: dateRef.current?.value,
        time: timeRef.current?.value,
        personnelAssigned: personnelAssignedRef.current?.value,
        status: statusRef.current?.value
      }

      CreateNewMaintenanceSchedule(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Maintenance Schedule</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Title</label>
        <input ref={titleRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Description</label>
        <input ref={descriptionRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Location</label>
        <input ref={locationRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Facility</label>
        <input ref={facilityRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Date</label>
        <input ref={dateRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Time</label>
        <input ref={timeRef} type="time" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Personnel Assigned</label>
        <input
          ref={personnelAssignedRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Status</label>
        <input ref={statusRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Maintenance Schedule
        </button>
      </form>
    </div>
  )
}

export default CreateMaintenanceSchedule
