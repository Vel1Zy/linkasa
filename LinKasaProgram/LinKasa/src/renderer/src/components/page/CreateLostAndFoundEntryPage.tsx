import React, { useRef } from 'react'
import { LostAndFoundEntry } from '../model/LostAndFound'
import { CreateNewLostAndFound } from '../controller/LostAndFoundController'

const CreateLostAndFoundEntryPage = () => {
  const itemNameRef = useRef<HTMLInputElement>(null)
  const itemDescriptionRef = useRef<HTMLInputElement>(null)
  const locationFoundRef = useRef<HTMLInputElement>(null)
  const dateFoundRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      itemNameRef?.current?.value &&
      itemDescriptionRef?.current?.value &&
      locationFoundRef?.current?.value &&
      dateFoundRef?.current?.value
    ) {
      const data: LostAndFoundEntry = {
        id: '',
        itemName: itemNameRef.current?.value,
        itemDescription: itemDescriptionRef.current?.value,
        locationFound: locationFoundRef.current?.value,
        dateFound: dateFoundRef.current?.value
      }

      CreateNewLostAndFound(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Lost And Found Entry</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Item Name</label>
        <input ref={itemNameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Item Description</label>
        <input
          ref={itemDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Location Found</label>
        <input
          ref={locationFoundRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Date Found</label>
        <input ref={dateFoundRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Lost and Found Entry
        </button>
      </form>
    </div>
  )
}

export default CreateLostAndFoundEntryPage
