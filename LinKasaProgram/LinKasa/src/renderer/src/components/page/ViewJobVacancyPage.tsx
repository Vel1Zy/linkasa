import React, { useEffect, useRef, useState } from 'react'
import { JobVacancy } from '../model/JobVacancy'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchJobVacancyData: () => Promise<JobVacancy[]> = async () => {
  const q = query(collection(db, 'jobVacancy'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      id,
      jobTitle,
      jobDescription,
      jobLocation,
      salaryLowest,
      salaryHighest,
      postedDate,
      status
    } = doc.data()
    const jobVacancy = {
      id: id,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      jobLocation: jobLocation,
      salaryLowest: salaryLowest,
      salaryHighest: salaryHighest,
      postedDate: postedDate,
      status: status
    }
    return jobVacancy
  })
}

const deleteJobVacancyData = async (jobTitle: string) => {
  const q = query(collection(db, 'jobVacancy'), where('jobTitle', '==', jobTitle))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewJobVacancy = () => {
  const [jobVacancy, setJobVacancy] = useState<JobVacancy[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedJobVacancy, setSelectedJobVacancy] = useState<JobVacancy | null>(null)
  const jobTitleRef = useRef<HTMLInputElement>(null)
  const jobDescriptionRef = useRef<HTMLInputElement>(null)
  const jobLocationRef = useRef<HTMLInputElement>(null)
  const salaryLowestRef = useRef<HTMLInputElement>(null)
  const salaryHighestRef = useRef<HTMLInputElement>(null)
  const postedDateRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobVacancyData().then((jobVacancy) => setJobVacancy(jobVacancy))
  }, [])

  const handleDelete = async (jobTitle: string) => {
    await deleteJobVacancyData(jobTitle)
    // Refresh the job vacancy data after deletion
    fetchJobVacancyData().then((jobVacancy) => setJobVacancy(jobVacancy))
  }

  const handleEdit = (jobVacancy: JobVacancy) => {
    setSelectedJobVacancy(jobVacancy)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'jobVacancy'),
      where('jobTitle', '==', selectedJobVacancy?.jobTitle)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        jobTitle: jobTitleRef.current?.value,
        jobDescription: jobDescriptionRef.current?.value,
        jobLocation: jobLocationRef.current?.value,
        salaryLowest: salaryLowestRef.current?.value,
        salaryHighest: salaryHighestRef.current?.value,
        postedDate: postedDateRef.current?.value,
        status: statusRef.current?.value
      })
      fetchJobVacancyData().then((jobVacancy) => setJobVacancy(jobVacancy))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {jobVacancy?.map((jobVacancy, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {jobVacancy.jobTitle}</div>
            <div>
              <strong>Job Description : </strong>
              {jobVacancy.jobDescription}
            </div>
            <div>
              <strong>Job Location : </strong>
              {jobVacancy.jobLocation}
            </div>
            <div>
              <strong>Salary Range : </strong>
              {jobVacancy.salaryLowest} - {jobVacancy.salaryHighest}
            </div>
            <div>
              <strong>Posted Date : </strong>
              {jobVacancy.postedDate}
            </div>
            <div>
              <strong>Status : </strong>
              {jobVacancy.status}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(jobVacancy.jobTitle)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(jobVacancy)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedJobVacancy && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Job Title</label>
                <input
                  ref={jobTitleRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.jobTitle}
                />
                <label className="text-gray-600">Job Description</label>
                <input
                  ref={jobDescriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.jobDescription}
                />
                <label className="text-gray-600">Job Location</label>
                <input
                  ref={jobLocationRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.jobLocation}
                />
                <label className="text-gray-600">Salary Lowest</label>
                <input
                  ref={salaryLowestRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.salaryLowest}
                />
                <label className="text-gray-600">Salary Highest</label>
                <input
                  ref={salaryHighestRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.salaryHighest}
                />
                <label className="text-gray-600">Posted Date</label>
                <input
                  ref={postedDateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.postedDate}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={statusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedJobVacancy.status}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Job Vacancy
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

export default ViewJobVacancy
