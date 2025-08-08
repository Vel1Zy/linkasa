import React, { useRef } from 'react'
import { JobVacancy } from '../model/JobVacancy'
import { WriteJobVacancy } from '../controller/JobVacancyController'

const CreateJobVacancy = () => {
  const jobTitleRef = useRef<HTMLInputElement>(null)
  const jobDescriptionRef = useRef<HTMLInputElement>(null)
  const jobLocationRef = useRef<HTMLInputElement>(null)
  const salaryLowestRef = useRef<HTMLInputElement>(null)
  const salaryHighestRef = useRef<HTMLInputElement>(null)
  const postedDateRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      jobTitleRef?.current?.value &&
      jobDescriptionRef?.current?.value &&
      jobLocationRef?.current?.value &&
      salaryLowestRef?.current?.value &&
      salaryHighestRef?.current?.value &&
      postedDateRef?.current?.value &&
      statusRef?.current?.value
    ) {
      const data: JobVacancy = {
        id: '',
        jobTitle: jobTitleRef.current?.value,
        jobDescription: jobDescriptionRef.current?.value,
        jobLocation: jobLocationRef.current?.value,
        salaryLowest: salaryLowestRef.current?.value,
        salaryHighest: salaryHighestRef.current?.value,
        postedDate: postedDateRef.current?.value,
        status: statusRef.current?.value
      }

      WriteJobVacancy(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Job Vacancy</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Job Title</label>
        <input ref={jobTitleRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Job Description</label>
        <input
          ref={jobDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Job Location</label>
        <input ref={jobLocationRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Salary Lowest</label>
        <input
          ref={salaryLowestRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Salary Highest</label>
        <input
          ref={salaryHighestRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Posted Date</label>
        <input ref={postedDateRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Status</label>
        <input ref={statusRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Job Vacancy
        </button>
      </form>
    </div>
  )
}

export default CreateJobVacancy
