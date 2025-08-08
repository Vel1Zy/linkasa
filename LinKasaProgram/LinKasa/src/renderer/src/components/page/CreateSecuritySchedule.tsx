import React, { useRef } from 'react'
import { SecuritySchedule } from '../model/SecuritySchedule'
import { CreateNewSecuritySchedule } from '../controller/SecurityScheduleController'

const CreateSecuritySchedule = () => {
  const dateRef = useRef<HTMLInputElement>(null)
  const shiftStartRef = useRef<HTMLInputElement>(null)
  const shiftEndRef = useRef<HTMLInputElement>(null)
  const securityNameRef = useRef<HTMLInputElement>(null)
  const securitySpecialistRef = useRef<HTMLInputElement>(null)
  const securityGenderRef = useRef<HTMLInputElement>(null)
  const securityDOBRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      dateRef?.current?.value &&
      shiftStartRef?.current?.value &&
      shiftEndRef?.current?.value &&
      securityNameRef?.current?.value &&
      securitySpecialistRef?.current?.value &&
      securityGenderRef?.current?.value &&
      securityDOBRef?.current?.value &&
      locationRef?.current?.value &&
      statusRef?.current?.value
    ) {
      const data: SecuritySchedule = {
        date: dateRef.current?.value,
        shiftStart: shiftStartRef.current?.value,
        shiftEnd: shiftEndRef.current?.value,
        securityName: securityNameRef.current?.value,
        securitySpecialist: securitySpecialistRef.current?.value,
        securityGender: securityGenderRef.current?.value,
        securityDOB: securityDOBRef.current?.value,
        location: locationRef.current?.value,
        status: statusRef.current?.value
      }

      CreateNewSecuritySchedule(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Security Schedule</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Date</label>
        <input ref={dateRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Shift Start</label>
        <input ref={shiftStartRef} type="time" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Shift End</label>
        <input ref={shiftEndRef} type="time" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Security Name</label>
        <input
          ref={securityNameRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Security Specialist</label>
        <input
          ref={securitySpecialistRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Security Gender</label>
        <input
          ref={securityGenderRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Security DOB</label>
        <input ref={securityDOBRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Location</label>
        <input ref={locationRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Status</label>
        <input ref={statusRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Security Schedule
        </button>
      </form>
    </div>
  )
}

export default CreateSecuritySchedule
