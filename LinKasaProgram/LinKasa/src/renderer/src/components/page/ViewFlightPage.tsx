import React, { useEffect, useRef, useState } from 'react'
import { FlightSchedule } from '../model/Flight'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchFlightData: () => Promise<FlightSchedule[]> = async () => {
  const q = query(collection(db, 'flight'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      flightNumber,
      airlineName,
      departureAirport,
      destinationAirport,
      departureDate,
      arrivalDate,
      gate,
      status
    } = doc.data()
    const flightSchedule = {
      flightNumber: flightNumber,
      airlineName: airlineName,
      departureAirport: departureAirport,
      destinationAirport: destinationAirport,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      gate: gate,
      status: status
    }
    return flightSchedule
  })
}

const deleteFlightData = async (flightNumber: string) => {
  const q = query(collection(db, 'flight'), where('flightNumber', '==', flightNumber))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewFlightPage = () => {
  const [flight, setFlight] = useState<FlightSchedule[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<FlightSchedule | null>(null)
  const flightNumberRef = useRef<HTMLInputElement>(null)
  const airlineNameRef = useRef<HTMLInputElement>(null)
  const departureAirportRef = useRef<HTMLInputElement>(null)
  const destinationAirportRef = useRef<HTMLInputElement>(null)
  const departureDateRef = useRef<HTMLInputElement>(null)
  const arrivalDateRef = useRef<HTMLInputElement>(null)
  const gateRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFlightData().then((flight) => setFlight(flight))
  }, [])

  const handleDelete = async (flightNumber: string) => {
    await deleteFlightData(flightNumber)
    // Refresh the flight data after deletion
    fetchFlightData().then((flight) => setFlight(flight))
  }

  const handleEdit = (flight: FlightSchedule) => {
    setSelectedFlight(flight)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'flight'),
      where('flightNumber', '==', selectedFlight?.flightNumber)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        flightNumber: flightNumberRef.current?.value,
        airlineName: airlineNameRef.current?.value,
        departureAirport: departureAirportRef.current?.value,
        destinationAirport: destinationAirportRef.current?.value,
        departureDate: departureDateRef.current?.value,
        arrivalDate: arrivalDateRef.current?.value,
        gate: gateRef.current?.value,
        status: statusRef.current?.value
      })
      fetchFlightData().then((flight) => setFlight(flight))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {flight?.map((flight, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {flight.flightNumber}</div>
            <div>
              <strong>Airline : </strong>
              {flight.airlineName}
            </div>
            <div>
              <strong>Departure Date : </strong>
              {flight.departureDate}
            </div>
            <div>
              <strong>Arrival Date : </strong>
              {flight.arrivalDate}
            </div>
            <div>
              <strong>Departure Airport : </strong>
              {flight.departureAirport}
            </div>
            <div>
              <strong>Destination Airport : </strong>
              {flight.destinationAirport}
            </div>
            <div>
              <strong>Gate : </strong>
              {flight.gate}
            </div>
            <div>
              <strong>Status : </strong>
              {flight.status}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(flight.flightNumber)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(flight)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedFlight && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Flight Number</label>
                <input
                  ref={flightNumberRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.flightNumber}
                />
                <label className="text-gray-600">Airline Name</label>
                <input
                  ref={airlineNameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.airlineName}
                />
                <label className="text-gray-600">Departure Airport</label>
                <input
                  ref={departureAirportRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.departureAirport}
                />
                <label className="text-gray-600">Destination Airport</label>
                <input
                  ref={destinationAirportRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.destinationAirport}
                />
                <label className="text-gray-600">Departure Date</label>
                <input
                  ref={departureDateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.departureDate}
                />
                <label className="text-gray-600">Arrival Date</label>
                <input
                  ref={arrivalDateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.arrivalDate}
                />
                <label className="text-gray-600">Gate</label>
                <input
                  ref={gateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.gate}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={statusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedFlight.status}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Flight
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewFlightPage
