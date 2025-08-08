import React, { useEffect, useRef, useState } from 'react'
import { Staff, Position, positions } from '../model/Staff'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchStaffData: () => Promise<Staff[]> = async () => {
  const q = query(collection(db, 'staff'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { name, dateOfBirth, contactNumber, emailAddress, position, password } = doc.data()
    const staff: Staff = {
      name: name,
      dateOfBirth: dateOfBirth,
      contactNumber: contactNumber,
      emailAddress: emailAddress,
      position: position,
      password: password
    }
    return staff
  })
}

const deleteStaffData = async (name: string) => {
  const q = query(collection(db, 'staff'), where('name', '==', name))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewStaffData = () => {
  const [staff, setStaff] = useState<Staff[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const dateOfBirthRef = useRef<HTMLInputElement>(null)
  const contactNumberRef = useRef<HTMLInputElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const positionRef = useRef<HTMLSelectElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStaffData().then((staff) => setStaff(staff))
  }, [])

  const handleDelete = async (name: string) => {
    await deleteStaffData(name)
    // Refresh the staff data after deletion
    fetchStaffData().then((staff) => setStaff(staff))
  }

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(collection(db, 'staff'), where('name', '==', selectedStaff?.name))
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        name: nameRef.current?.value,
        dateOfBirth: dateOfBirthRef.current?.value,
        contactNumber: contactNumberRef.current?.value,
        emailAddress: emailAddressRef.current?.value,
        position: positionRef.current?.value as Position,
        password: passwordRef.current?.value
      })
      fetchStaffData().then((staff) => setStaff(staff))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {staff?.map((staff, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {staff.name}</div>
            <div>
              <strong>Date of Birth : </strong>
              {staff.dateOfBirth}
            </div>
            <div>
              <strong>Contact Number : </strong>
              {staff.contactNumber}
            </div>
            <div>
              <strong>Email Address : </strong>
              {staff.emailAddress}
            </div>
            <div>
              <strong>Position : </strong>
              {staff.position}
            </div>
            <div>
              <strong>Password : </strong>
              {staff.password}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(staff.name)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(staff)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedStaff && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaff.name}
                />
                <label className="text-gray-600">Date of Birth</label>
                <input
                  ref={dateOfBirthRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaff.dateOfBirth}
                />
                <label className="text-gray-600">Contact Number</label>
                <input
                  ref={contactNumberRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaff.contactNumber}
                />
                <label className="text-gray-600">Email Address</label>
                <input
                  ref={emailAddressRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaff.emailAddress}
                />
                <label className="text-gray-600">Position</label>
                <select
                  ref={positionRef}
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaff.position}
                >
                  {Object.values(positions).map((position, index) => (
                    // Code continues...
                    <option key={index} value={position as string}>
                      {position}
                    </option>
                  ))}
                </select>
                <label className="text-gray-600">Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedStaff.password}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Staff
                </button>
                <button
                  className="bg-red-500 text-white rounded-md p-2 mt-2"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewStaffData
