import React, { useRef } from 'react'
import { CreateNewFlight } from '../controller/AddFlightController'

const AddFlight = () => {
  const flightNumberRef = useRef<HTMLInputElement>(null)
  const airlineNameRef = useRef<HTMLInputElement>(null)
  const departureAirportRef = useRef<HTMLInputElement>(null)
  const destinationAirportRef = useRef<HTMLInputElement>(null)
  const departureDateRef = useRef<HTMLInputElement>(null)
  const arrivalDateRef = useRef<HTMLInputElement>(null)
  const gateRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)

  const [error, setError] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      flightNumberRef?.current?.value &&
      airlineNameRef?.current?.value &&
      departureAirportRef?.current?.value &&
      destinationAirportRef?.current?.value &&
      departureDateRef?.current?.value &&
      arrivalDateRef?.current?.value &&
      gateRef?.current?.value &&
      statusRef?.current?.value
    ) {
      const data = {
        flightNumber: flightNumberRef.current?.value,
        airlineName: airlineNameRef.current?.value,
        departureAirport: departureAirportRef.current?.value,
        destinationAirport: destinationAirportRef.current?.value,
        departureDate: departureDateRef.current?.value,
        arrivalDate: arrivalDateRef.current?.value,
        gate: gateRef.current?.value,
        status: statusRef.current?.value
      }
      CreateNewFlight(data)
      setError('')
    } else {
      setError('Please fill in all the fields')
    }
  }

  return (
    <div className="flex flex-col outline m-10 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center mt-9">Add Flight</h2>
      <form className="flex flex-col px-10 m-5" onSubmit={handleSubmit}>
        <label className="text-gray-600">Flight Number</label>
        <input
          ref={flightNumberRef}
          type="text"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label className="text-gray-600">Airline Name</label>
        <input
          ref={airlineNameRef}
          type="text"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label className="text-gray-600">Departure Airport</label>
        <input
          ref={departureAirportRef}
          type="text"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label className="text-gray-600">Destination Airport</label>
        <input
          ref={destinationAirportRef}
          type="text"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label className="text-gray-600">Departure Date</label>
        <input
          ref={departureDateRef}
          type="date"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label className="text-gray-600">Arrival Date</label>
        <input
          ref={arrivalDateRef}
          type="date"
          className="border border-gray-300 rounded-md p-2 mb-2"
        />

        <label className="text-gray-600">Gate</label>
        <input ref={gateRef} type="text" className="border border-gray-300 rounded-md p-2 mb-2" />

        <label className="text-gray-600">Status</label>
        <input ref={statusRef} type="text" className="border border-gray-300 rounded-md p-2 mb-2" />

        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Add new Flight
        </button>
      </form>
    </div>
  )
}

export default AddFlight
