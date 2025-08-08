import { ReactElement, useEffect, useState } from 'react'
import { Flight } from '../../../../Controller/Interfaces/FlightInterface'
import { Plane } from '@renderer/Controller/Interfaces/PlaneInterface'
import { getPlaneInfo } from '@renderer/Controller/GeneralControls/PlaneController'
import { getPassengerInformation } from '@renderer/Controller/GeneralControls/PassengerController'
import { Passenger } from '@renderer/Controller/Interfaces/PassengerInterface'
import PassengerData from './PassengerData'
import BaggageInformation from './Baggage/BaggageInformation'
import BoardingPassInformation from './Boarding/BoardingPassInformation'

interface Props {
  flight: Flight
}

function FlightSeat(props: Props) {
  const flight = props.flight
  const [plane, setPlane] = useState<Plane | null>(null)
  const [passengerID, setPassengerID] = useState('')
  const [seat, setSeat] = useState(0)
  const [passenger, setPassenger] = useState<Passenger | null>(null)
  const [showBaggageInfo, setShowBaggageInfo] = useState(false)

  useEffect(() => {
    getPassengerInformation(passengerID).then((result) => {
      setPassenger(result)
    })
  }, [passengerID])

  useEffect(() => {
    getPlaneInfo(flight.planeID).then((result) => {
      setPlane(result)
    })
  }, [])

  let counter = 1
  const element: ReactElement<any, any>[] = []

  if (plane) {
    const emptySeatAmount = plane.passengerLimit - flight.passengerIDs.length
    for (let i = flight.passengerIDs.length + 1; i < emptySeatAmount; i++) {
      element.push(
        <div className="">
          <button
            className="rounded-lg w-14 h-14 bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              alert('cannot accesse empty seat')
            }}
            key={i}
          >
            <p className="text-white font-extrabold tracking-wide">{i}</p>
          </button>
        </div>
      )
    }
    return (
      <div>
        <div className="mb-10 flex flex-wrap overflow-hidden gap-1">
          {flight.passengerIDs.map((passenger) => (
            <button
              onClick={() => {
                setPassengerID(passenger)
                setSeat(counter)
              }}
              className={
                'flex justify-center items-center rounded-lg w-14 h-14 bg-blue-500 hover:bg-blue-600'
              }
              key={counter++}
            >
              <p className="text-white font-extrabold">{counter}</p>
            </button>
          ))}
          {element}
        </div>
        {passenger ? (
          <div>
            <PassengerData passenger={passenger}></PassengerData>
            <BaggageInformation flight={flight} passenger={passenger}></BaggageInformation>
            <BoardingPassInformation
              seat={counter}
              passenger={passenger}
              flight={flight}
            ></BoardingPassInformation>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

  return <p className="font-bold text-green-500">Fetching...</p>
}

export default FlightSeat
