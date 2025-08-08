import React, { useRef } from 'react'
import { roles, FlightCrew, Role } from '../model/FlightCrew'
import { CreateNewFlightCrew } from '../controller/CreateFlightCrewController'

const CreateFlightCrewPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (nameRef?.current?.value && emailAddressRef?.current?.value && roleRef?.current?.value) {
      const data: FlightCrew = {
        name: nameRef.current?.value,
        emailAddress: emailAddressRef.current?.value,
        role: roleRef.current?.value as Role
      }

      CreateNewFlightCrew(data)
    }
  }

  return (
    <div>
      <form className="flex flex-col items-center">
        <label className="text-gray-600">Name</label>
        <input ref={nameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Email Address</label>
        <input
          ref={emailAddressRef}
          type="email"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Role</label>
        <select ref={roleRef} className="border border-gray-300 rounded-md p-2">
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Flight Crew
        </button>
      </form>
    </div>
  )
}

export default CreateFlightCrewPage
