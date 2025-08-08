import React, { useRef } from 'react'
import { AirportGoal } from '../model/AirportGoal'
import { CreateNewAirportGoal } from '../controller/AirportGoalController'

const CreateAirportGoal = () => {
  const goalIDRef = useRef<HTMLInputElement>(null)
  const goalDescriptionRef = useRef<HTMLInputElement>(null)
  const goalStatusRef = useRef<HTMLInputElement>(null)
  const postedDateRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      goalIDRef?.current?.value &&
      goalDescriptionRef?.current?.value &&
      goalStatusRef?.current?.value &&
      postedDateRef?.current?.value
    ) {
      const data: AirportGoal = {
        goalID: goalIDRef.current?.value,
        goalDescription: goalDescriptionRef.current?.value,
        goalStatus: goalStatusRef.current?.value,
        postedDate: postedDateRef.current?.value
      }

      CreateNewAirportGoal(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Airport Goal</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Goal ID</label>
        <input ref={goalIDRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Goal Description</label>
        <input
          ref={goalDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Goal Status</label>
        <input ref={goalStatusRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Posted Date</label>
        <input ref={postedDateRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Airport Goal
        </button>
      </form>
    </div>
  )
}

export default CreateAirportGoal
