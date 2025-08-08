import React, { useRef } from 'react'
import { SecurityIncident } from '../model/SecurityIncident'
import { CreateNewSecurityIncident } from '../controller/SecurityIncidentController'

const CreateSecurityIncidentReport = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const suspectNameRef = useRef<HTMLInputElement>(null)
  const suspectDescriptionRef = useRef<HTMLInputElement>(null)
  const locationHappenedRef = useRef<HTMLInputElement>(null)
  const dateHappenedRef = useRef<HTMLInputElement>(null)
  const timeHappenedRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      titleRef?.current?.value &&
      descriptionRef?.current?.value &&
      suspectNameRef?.current?.value &&
      suspectDescriptionRef?.current?.value &&
      locationHappenedRef?.current?.value &&
      dateHappenedRef?.current?.value &&
      timeHappenedRef?.current?.value
    ) {
      const data: SecurityIncident = {
        id: '',
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        suspectName: suspectNameRef.current?.value,
        suspectDescription: suspectDescriptionRef.current?.value,
        locationHappened: locationHappenedRef.current?.value,
        dateHappened: dateHappenedRef.current?.value,
        timeHappened: timeHappenedRef.current?.value,
        status: ''
      }

      CreateNewSecurityIncident(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Security Incident Report</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Title</label>
        <input ref={titleRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Description</label>
        <input ref={descriptionRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Suspect Name</label>
        <input ref={suspectNameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Suspect Description</label>
        <input
          ref={suspectDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Location Happened</label>
        <input
          ref={locationHappenedRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Date Happened</label>
        <input
          ref={dateHappenedRef}
          type="date"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Time Happened</label>
        <input
          ref={timeHappenedRef}
          type="time"
          className="border border-gray-300 rounded-md p-2"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Security Incident Report
        </button>
      </form>
    </div>
  )
}

export default CreateSecurityIncidentReport
