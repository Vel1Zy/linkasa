import {useEffect, useState} from "react";
import {Flight} from "../../../../Controller/Interfaces/FlightInterface";
import {getAllFlightSchedule} from "../../../../Controller/GeneralControls/FlightController";
import actionIcon from '../../../../../assets/ActionIcon.png'
import {Link} from "react-router-dom";
import {Plane} from "@renderer/Controller/Interfaces/PlaneInterface";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";

function FlightInformations() {
    const [flights, setFlights] = useState<Flight[]>([])
    const [planes, setPlanes] = useState<Plane[]>([])

    useEffect(() => {
        getAllFlightSchedule().then((result) => {
            setFlights(result)
            
        })
    }, []);


    const CreateFlightScheduleClicked = () => {
        window.location.replace('/fom/create-flight-schedule')
    }

    return <div className={'px-20 py-5'}>
        <h1 className={'text-2xl font-bold tracking-wide'}>Flight Information</h1>
        <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
                <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Source</th>
                    <th className="py-3 px-6 text-left">Destination</th>
                    <th className="py-3 px-6 text-left">Boarding Time</th>
                    <th className="py-3 px-6 text-left">Crew</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Action</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {flights.map((flight, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td className="py-3 px-6 text-left">{flight.source.province}, {flight.source.country}</td>
                        <td className="py-3 px-6 text-left">{flight.destination.province}, {flight.destination.country}</td>
                        <td className="py-3 px-6 text-left">{utc(flight.boardingTime.seconds)}</td>
                        {flight.crewID == null ? (
                            <td className="py-3 px-6 text-left text-red-700 font-bold">NA</td>
                        ) : (
                            <td className="py-3 px-6 text-left font-bold text-green-600">A</td>
                        )}
                        <td className="py-3 px-6 text-left font-bold text-green600">{flight.status}</td>
                        <td className="py-3 px-6 text-left font-bold">
                            <Link to={'/fom/flight-detail/' + flight.flightID}>
                                <img src={actionIcon} alt={'actionIcon'} className={'w-10'}/>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <button
            className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
            onClick={CreateFlightScheduleClicked}
        >
            Create A Flight Schedule
        </button>
    </div>
}

export default FlightInformations
