import React, { useRef } from 'react'
import { Infrastructure } from '../model/Infrastructure'
import { CreateNewInfrastructure } from '../controller/InfrastructureController'

const CreateInfrastructurePage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const conditionRef = useRef<HTMLInputElement>(null)
  const scheduledMaintenanceRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      nameRef?.current?.value &&
      descriptionRef?.current?.value &&
      locationRef?.current?.value &&
      conditionRef?.current?.value &&
      scheduledMaintenanceRef?.current?.value
    ) {
      const data: Infrastructure = {
        id: '',
        name: nameRef.current?.value,
        description: descriptionRef.current?.value,
        location: locationRef.current?.value,
        condition: conditionRef.current?.value,
        scheduledMaintenance: Number(scheduledMaintenanceRef.current?.value)
      }

      CreateNewInfrastructure(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Infrastructure</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Name</label>
        <input ref={nameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Description</label>
        <input ref={descriptionRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Location</label>
        <input ref={locationRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Condition</label>
        <input ref={conditionRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Scheduled Maintenance</label>
        <input
          ref={scheduledMaintenanceRef}
          type="number"
          className="border border-gray-300 rounded-md p-2"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Infrastructure
        </button>
      </form>
    </div>
  )
}

export default CreateInfrastructurePage
