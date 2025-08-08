import React, { useEffect, useRef, useState } from 'react'
import { InspectionRecord } from '../model/InspectionRecord'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchInspectionRecordData: () => Promise<InspectionRecord[]> = async () => {
  const q = query(collection(db, 'inspectionRecord'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const { recordID, recordDescription, recordStatus, postedDate, inspectedBy } = doc.data()
    const inspectionRecord = {
      recordID: recordID,
      recordDescription: recordDescription,
      recordStatus: recordStatus,
      postedDate: postedDate,
      inspectedBy: inspectedBy
    }
    return inspectionRecord
  })
}

const deleteInspectionRecordData = async (recordID: string) => {
  const q = query(collection(db, 'inspectionRecord'), where('recordID', '==', recordID))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewInspectionRecord = () => {
  const [inspectionRecord, setInspectionRecord] = useState<InspectionRecord[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedInspectionRecord, setSelectedInspectionRecord] = useState<InspectionRecord | null>(
    null
  )
  const recordDescriptionRef = useRef<HTMLInputElement>(null)
  const recordStatusRef = useRef<HTMLInputElement>(null)
  const postedDateRef = useRef<HTMLInputElement>(null)
  const inspectedByRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInspectionRecordData().then((inspectionRecord) => setInspectionRecord(inspectionRecord))
  }, [])

  const handleDelete = async (recordID: string) => {
    await deleteInspectionRecordData(recordID)
    // Refresh the inspection record data after deletion
    fetchInspectionRecordData().then((inspectionRecord) => setInspectionRecord(inspectionRecord))
  }

  const handleEdit = (inspectionRecord: InspectionRecord) => {
    setSelectedInspectionRecord(inspectionRecord)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'inspectionRecord'),
      where('recordID', '==', selectedInspectionRecord?.recordID)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        recordDescription: recordDescriptionRef.current?.value,
        recordStatus: recordStatusRef.current?.value,
        postedDate: postedDateRef.current?.value,
        inspectedBy: inspectedByRef.current?.value
      })
      fetchInspectionRecordData().then((inspectionRecord) => setInspectionRecord(inspectionRecord))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {inspectionRecord?.map((inspectionRecord, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {inspectionRecord.recordID}</div>
            <div>
              <strong>Description : </strong>
              {inspectionRecord.recordDescription}
            </div>
            <div>
              <strong>Status : </strong>
              {inspectionRecord.recordStatus}
            </div>
            <div>
              <strong>Posted Date : </strong>
              {inspectionRecord.postedDate}
            </div>
            <div>
              <strong>Inspected By : </strong>
              {inspectionRecord.inspectedBy}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(inspectionRecord.recordID)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(inspectionRecord)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedInspectionRecord && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Record Description</label>
                <input
                  ref={recordDescriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInspectionRecord.recordDescription}
                />
                <label className="text-gray-600">Record Status</label>
                <input
                  ref={recordStatusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInspectionRecord.recordStatus}
                />
                <label className="text-gray-600">Posted Date</label>
                <input
                  ref={postedDateRef}
                  type="date"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInspectionRecord.postedDate}
                />
                <label className="text-gray-600">Inspected By</label>
                <input
                  ref={inspectedByRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedInspectionRecord.inspectedBy}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Inspection Record
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

export default ViewInspectionRecord
