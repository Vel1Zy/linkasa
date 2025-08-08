import React, { useRef } from 'react'
import { InterviewSchedule } from '../model/InterviewSchedule'
import { CreateNewInterviewSchedule } from '../controller/InterviewScheduleController'

const CreateInterviewSchedulePage = () => {
  const interviewIDRef = useRef<HTMLInputElement>(null)
  const interviewDateRef = useRef<HTMLInputElement>(null)
  const interviewTimeRef = useRef<HTMLInputElement>(null)
  const interviewLocationRef = useRef<HTMLInputElement>(null)
  const intervieweeNameRef = useRef<HTMLInputElement>(null)
  const intervieweeEmailRef = useRef<HTMLInputElement>(null)
  const interviewerNameRef = useRef<HTMLInputElement>(null)
  const interviewerEmailRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      interviewIDRef?.current?.value &&
      interviewDateRef?.current?.value &&
      interviewTimeRef?.current?.value &&
      interviewLocationRef?.current?.value &&
      intervieweeNameRef?.current?.value &&
      intervieweeEmailRef?.current?.value &&
      interviewerNameRef?.current?.value &&
      interviewerEmailRef?.current?.value &&
      statusRef?.current?.value
    ) {
      const data: InterviewSchedule = {
        interviewID: interviewIDRef.current?.value,
        interviewDate: interviewDateRef.current?.value,
        interviewTime: interviewTimeRef.current?.value,
        interviewLocation: interviewLocationRef.current?.value,
        intervieweeName: intervieweeNameRef.current?.value,
        intervieweeEmail: intervieweeEmailRef.current?.value,
        interviewerName: interviewerNameRef.current?.value,
        interviewerEmail: interviewerEmailRef.current?.value,
        status: statusRef.current?.value
      }

      CreateNewInterviewSchedule(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Interview Schedule</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Interview ID</label>
        <input ref={interviewIDRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Interview Date</label>
        <input
          ref={interviewDateRef}
          type="date"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Interview Time</label>
        <input
          ref={interviewTimeRef}
          type="time"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Interview Location</label>
        <input
          ref={interviewLocationRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Interviewee Name</label>
        <input
          ref={intervieweeNameRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Interviewee Email</label>
        <input
          ref={intervieweeEmailRef}
          type="email"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Interviewer Name</label>
        <input
          ref={interviewerNameRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Interviewer Email</label>
        <input
          ref={interviewerEmailRef}
          type="email"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Status</label>
        <input ref={statusRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Interview Schedule
        </button>
      </form>
    </div>
  )
}

export default CreateInterviewSchedulePage
