import React, { useRef } from 'react'
import { InspectionRecord } from '../model/InspectionRecord'
import { CreateNewInspectionRecord } from '../controller/InspectionRecordController'

const CreateInspectionRecordPage = () => {
  const recordIDRef = useRef<HTMLInputElement>(null)
  const recordDescriptionRef = useRef<HTMLInputElement>(null)
  const recordStatusRef = useRef<HTMLInputElement>(null)
  const postedDateRef = useRef<HTMLInputElement>(null)
  const inspectedByRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      recordIDRef?.current?.value &&
      recordDescriptionRef?.current?.value &&
      recordStatusRef?.current?.value &&
      postedDateRef?.current?.value &&
      inspectedByRef?.current?.value
    ) {
      const data: InspectionRecord = {
        recordID: recordIDRef.current?.value,
        recordDescription: recordDescriptionRef.current?.value,
        recordStatus: recordStatusRef.current?.value,
        postedDate: postedDateRef.current?.value,
        inspectedBy: inspectedByRef.current?.value
      }

      CreateNewInspectionRecord(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Inspection Record</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Record ID</label>
        <input ref={recordIDRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Record Description</label>
        <input
          ref={recordDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Record Status</label>
        <input
          ref={recordStatusRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Posted Date</label>
        <input ref={postedDateRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Inspected By</label>
        <input ref={inspectedByRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Inspection Record
        </button>
      </form>
    </div>
  )
}

export default CreateInspectionRecordPage
