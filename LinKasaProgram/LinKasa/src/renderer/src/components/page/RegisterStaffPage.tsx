import React, { useRef } from 'react'
import { positions } from '../model/Staff'
import {
  CreateNewStaff,
  CreateNewStaffLoginData
} from '../../components/controller/RegisterStaffController'

const RegisterStaff = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const contactNumberRef = useRef<HTMLInputElement>(null)
  const dateOfBirthRef = useRef<HTMLInputElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const positionRef = useRef<HTMLSelectElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [error, setError] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      nameRef?.current?.value &&
      contactNumberRef?.current?.value &&
      dateOfBirthRef?.current?.value &&
      emailAddressRef?.current?.value &&
      positionRef?.current?.value &&
      passwordRef?.current?.value
    ) {
      const data = {
        name: nameRef.current?.value,
        contactNumber: contactNumberRef.current?.value,
        dateOfBirth: dateOfBirthRef.current?.value,
        emailAddress: emailAddressRef.current?.value,
        position: positionRef.current?.value,
        password: passwordRef.current?.value
      }
      setError('')

      const firebaseAuthenticationData = {
        emailAddress: emailAddressRef.current?.value,
        password: passwordRef.current?.value
      }

      CreateNewStaff(data)
      CreateNewStaffLoginData(firebaseAuthenticationData)
    } else if (emailAddressRef.current?.value && emailAddressRef.current?.value.includes('@')) {
      setError('Invalid email address, you need to have @ in your email address')
    } else if (passwordRef.current?.value && passwordRef.current?.value.length < 8) {
      setError('Password must be at least 8 characters long')
    } else {
      setError('Please fill in all the fields')
    }
  }

  return (
    <div>
      <form className="flex flex-col items-center">
        <label className="text-gray-600">Staff Name</label>
        <input ref={nameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Contact Number</label>
        <input
          ref={contactNumberRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Date Of Birth</label>
        <input ref={dateOfBirthRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Email Address</label>
        <input
          ref={emailAddressRef}
          type="email"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Position</label>
        <select ref={positionRef} className="border border-gray-300 rounded-md p-2">
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        <label className="text-gray-600">Password</label>
        <input
          ref={passwordRef}
          type="password"
          className="border border-gray-300 rounded-md p-2"
        />
        {error && <span className="text-red-500">{error}</span>}
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create new User
        </button>
      </form>
    </div>
  )
}

export default RegisterStaff
