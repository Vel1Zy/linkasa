import React, { useEffect, useRef, useState } from 'react'
import { LostAndFoundEntry } from '../model/LostAndFound'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchLostAndFoundData: () => Promise<LostAndFoundEntry[]> = async () => {
  const q = query(collection(db, 'lostAndFound'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { id, itemName, itemDescription, locationFound, dateFound } = doc.data()
    const lostAndFoundEntry = {
      id: id,
      itemName: itemName,
      itemDescription: itemDescription,
      locationFound: locationFound,
      dateFound: dateFound
    }
    return lostAndFoundEntry
  })
}

const deleteLostAndFoundData = async (itemName: string) => {
  const q = query(collection(db, 'lostAndFound'), where('itemName', '==', itemName))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewLostAndFoundEntryPage = () => {
  const [lostAndFound, setLostAndFound] = useState<LostAndFoundEntry[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<LostAndFoundEntry | null>(null)
  const itemNameRef = useRef<HTMLInputElement>(null)
  const itemDescriptionRef = useRef<HTMLInputElement>(null)
  const locationFoundRef = useRef<HTMLInputElement>(null)
  const dateFoundRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLostAndFoundData().then((entries) => setLostAndFound(entries))
  }, [])

  const handleDelete = async (itemName: string) => {
    await deleteLostAndFoundData(itemName)
    // Refresh the lost and found data after deletion
    fetchLostAndFoundData().then((entries) => setLostAndFound(entries))
  }

  const handleEdit = (entry: LostAndFoundEntry) => {
    setSelectedEntry(entry)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(collection(db, 'lostAndFound'), where('id', '==', selectedEntry?.id))
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        itemName: itemNameRef.current?.value,
        itemDescription: itemDescriptionRef.current?.value,
        locationFound: locationFoundRef.current?.value,
        dateFound: dateFoundRef.current?.value
      })
      fetchLostAndFoundData().then((entries) => setLostAndFound(entries))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    setEditModalOpen(false)
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {lostAndFound?.map((entry, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {entry.itemName}</div>
            <div>
              <strong>Item Description : </strong>
              {entry.itemDescription}
            </div>
            <div>
              <strong>Location Found : </strong>
              {entry.locationFound}
            </div>
            <div>
              <strong>Date Found : </strong>
              {entry.dateFound}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(entry.itemName)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(entry)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedEntry && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Item Name</label>
                <input
                  ref={itemNameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedEntry.itemName}
                />
                <label className="text-gray-600">Item Description</label>
                <input
                  ref={itemDescriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedEntry.itemDescription}
                />
                <label className="text-gray-600">Location Found</label>
                <input
                  ref={locationFoundRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedEntry.locationFound}
                />
                <label className="text-gray-600">Date Found</label>
                <input
                  ref={dateFoundRef}
                  type="date"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedEntry.dateFound}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Entry
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

export default ViewLostAndFoundEntryPage
