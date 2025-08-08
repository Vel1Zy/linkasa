import React, { useRef } from 'react'
import { PassportVisa } from '../model/PassportVisa'
import { CreateNewPassportVisa } from '../controller/PassportVisaController'

const CreatePassportVisaDetail = () => {
  const fullNameRef = useRef<HTMLInputElement>(null)
  const dateOfBirthRef = useRef<HTMLInputElement>(null)
  const placeOfBirthRef = useRef<HTMLInputElement>(null)
  const nationalityRef = useRef<HTMLInputElement>(null)
  const passportNumberRef = useRef<HTMLInputElement>(null)
  const visaNumberRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      fullNameRef?.current?.value &&
      dateOfBirthRef?.current?.value &&
      placeOfBirthRef?.current?.value &&
      nationalityRef?.current?.value &&
      passportNumberRef?.current?.value &&
      visaNumberRef?.current?.value
    ) {
      const data: PassportVisa = {
        fullName: fullNameRef.current?.value,
        dateOfBirth: dateOfBirthRef.current?.value,
        placeOfBirth: placeOfBirthRef.current?.value,
        nationality: nationalityRef.current?.value,
        passportNumber: passportNumberRef.current?.value,
        visaNumber: visaNumberRef.current?.value
      }

      CreateNewPassportVisa(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Passport Visa Detail</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Full Name</label>
        <input ref={fullNameRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Date of Birth</label>
        <input ref={dateOfBirthRef} type="date" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Place of Birth</label>
        <input
          ref={placeOfBirthRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Nationality</label>
        <input ref={nationalityRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <label className="text-gray-600">Passport Number</label>
        <input
          ref={passportNumberRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Visa Number</label>
        <input ref={visaNumberRef} type="text" className="border border-gray-300 rounded-md p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Passport Visa Detail
        </button>
      </form>
    </div>
  )
}

export default CreatePassportVisaDetail
