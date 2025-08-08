import React, { useRef } from 'react'
import { BaggageIncident } from '../model/BaggageIncident'
import { CreateNewBaggageIncident } from '../controller/BaggageIncidentController'

const CreateBaggageIncidentPage = () => {
  const baggageIncidentIDRef = useRef<HTMLInputElement>(null)
  const baggageIncidentDateRef = useRef<HTMLInputElement>(null)
  const baggageIncidentTimeRef = useRef<HTMLInputElement>(null)
  const baggageIncidentLocationRef = useRef<HTMLInputElement>(null)
  const baggageIncidentDescriptionRef = useRef<HTMLInputElement>(null)
  const baggageIncidentStatusRef = useRef<HTMLInputElement>(null)
  const responseTimeRef = useRef<HTMLInputElement>(null)
  const actionTakenRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      baggageIncidentIDRef?.current?.value &&
      baggageIncidentDateRef?.current?.value &&
      baggageIncidentTimeRef?.current?.value &&
      baggageIncidentLocationRef?.current?.value &&
      baggageIncidentDescriptionRef?.current?.value &&
      baggageIncidentStatusRef?.current?.value &&
      responseTimeRef?.current?.value &&
      actionTakenRef?.current?.value
    ) {
      const data: BaggageIncident = {
        baggageIncidentID: baggageIncidentIDRef.current?.value,
        baggageIncidentDate: baggageIncidentDateRef.current?.value,
        baggageIncidentTime: baggageIncidentTimeRef.current?.value,
        baggageIncidentLocation: baggageIncidentLocationRef.current?.value,
        baggageIncidentDescription: baggageIncidentDescriptionRef.current?.value,
        baggageIncidentStatus: baggageIncidentStatusRef.current?.value,
        responseTime: responseTimeRef.current?.value,
        actionTaken: actionTakenRef.current?.value
      }

      CreateNewBaggageIncident(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Baggage Incident</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Baggage Incident ID</label>
        <input
          ref={baggageIncidentIDRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Baggage Incident Date</label>
        <input
          ref={baggageIncidentDateRef}
          type="date"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Baggage Incident Time</label>
        <input
          ref={baggageIncidentTimeRef}
          type="time"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Baggage Incident Location</label>
        <input
          ref={baggageIncidentLocationRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Baggage Incident Description</label>
        <input
          ref={baggageIncidentDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Baggage Incident Status</label>
        <input
          ref={baggageIncidentStatusRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Response Time</label>
        <input
          ref={responseTimeRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Action Taken</label>
        <input ref={actionTakenRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Baggage Incident
        </button>
      </form>
    </div>
  )
}

export default CreateBaggageIncidentPage
