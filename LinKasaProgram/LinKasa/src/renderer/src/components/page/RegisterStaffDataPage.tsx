import React, { useState } from 'react'
import { Staff, positions } from '../model/Staff'
import { Timestamp, collection, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'

const RegisterStaffDataPage: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Write to database logic
      await addDoc(collection(db, 'staff'), staffData)
      console.log('Staff data added to database')
      // Reset form
      setStaffData(emptyStaff)
    } catch (error) {
      console.error('Error adding staff data to database:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStaffData((prevState) => ({
      ...prevState,
      [name]:
        name === 'dateOfBirth' || name === 'dateOfHire'
          ? Timestamp.fromDate(new Date(value))
          : value
    }))
  }

  return (
    <div className="flex items-center justify-center content-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/6"
      >
        <h1 className="block text-gray-700 text-lg font-bold mb-2 text-center">
          Create New Staff Data
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="staffID">
            Staff ID:
          </label>
          <input
            type="text"
            id="staffID"
            name="staffID"
            value={staffData.staffID}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={staffData.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={staffData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={staffData.dateOfBirth.to}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={staffData.contactNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailAddress">
            Email Address:
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={staffData.emailAddress}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfHire">
            Date of Hire:
          </label>
          <input
            type="date"
            id="dateOfHire"
            name="dateOfHire"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4 mt-5 flex flex-col">
          <label className="block text-gray-700 text-sm font-bold mb-2 pr-7" htmlFor="staffID">
            Position:
          </label>
          <select
            id="position"
            className="block appearance-none w-full bg-white border border-gray-300 py-2 px-3 pl-5 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
        {/* Add more input fields for other staff data */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterStaffDataPage
