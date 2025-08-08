import React, { useRef } from 'react'
import { StaffTraining } from '../model/StaffTraining'
import { CreateNewStaffTraining } from '../controller/StaffTrainingController'

const CreateStaffTraining = () => {
  const trainingIDRef = useRef<HTMLInputElement>(null)
  const trainingNameRef = useRef<HTMLInputElement>(null)
  const trainingDateRef = useRef<HTMLInputElement>(null)
  const trainingTimeRef = useRef<HTMLInputElement>(null)
  const trainingLocationRef = useRef<HTMLInputElement>(null)
  const trainerNameRef = useRef<HTMLInputElement>(null)
  const trainerEmailRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      trainingIDRef?.current?.value &&
      trainingNameRef?.current?.value &&
      trainingDateRef?.current?.value &&
      trainingTimeRef?.current?.value &&
      trainingLocationRef?.current?.value &&
      trainerNameRef?.current?.value &&
      trainerEmailRef?.current?.value &&
      statusRef?.current?.value
    ) {
      const data: StaffTraining = {
        trainingID: trainingIDRef.current?.value,
        trainingName: trainingNameRef.current?.value,
        trainingDate: trainingDateRef.current?.value,
        trainingTime: trainingTimeRef.current?.value,
        trainingLocation: trainingLocationRef.current?.value,
        trainerName: trainerNameRef.current?.value,
        trainerEmail: trainerEmailRef.current?.value,
        status: statusRef.current?.value
      }

      CreateNewStaffTraining(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Staff Training</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Training ID</label>
        <input ref={trainingIDRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Training Name</label>
        <input
          ref={trainingNameRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Training Date</label>
        <input
          ref={trainingDateRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Training Time</label>
        <input
          ref={trainingTimeRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Training Location</label>
        <input
          ref={trainingLocationRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Trainer Name</label>
        <input ref={trainerNameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Trainer Email</label>
        <input
          ref={trainerEmailRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Status</label>
        <input ref={statusRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Staff Training
        </button>
      </form>
    </div>
  )
}

export default CreateStaffTraining
