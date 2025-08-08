import {Flight} from "../../../../Controller/Interfaces/FlightInterface";
import {useEffect, useState} from "react";
import {
    assignCrewToFlight,
    getAvailableCrews,
    getCrewData
} from "../../../../Controller/GeneralControls/FlightController";
import {Crew} from "../../../../Controller/Interfaces/CrewInterface";
import CrewInformation from "./CrewInformation";

interface Props {
    flight : Flight
}

function AssignFlightCrew(props : Props) {
    const [crews, setCrews] = useState<Crew[]>([])
    const [crewID, setCrewID] = useState('')
    const [crew, setCrew] = useState<Crew | null>(null)
    const flight = props.flight

    useEffect(() => {
        if (flight.crewID == null) {
            getAvailableCrews(flight).then((result) => {
                setCrews(result)
            })
        }
        else {
            getCrewData(flight.crewID).then((result) => {
                setCrew(result)
            })
        }
    }, []);

    const assignCrew = () => {
            assignCrewToFlight(flight,  crewID).then((result) => {
            if(result) window.location.reload()
        })
    }
    console.log('test');
    return <div>
        {flight.crewID == null ? (
            <div>
                <p className={'text-red-600 font-bold text-lg mb-4'}>NO CREW IS ASSIGN TO THIS FLIGHT</p>
                <p className={'text-blue-600 font-bold text-lg'}>Available Crews : </p>
                <div className="my-4">
                    <label htmlFor="selectInput" className="block text-sm font-medium text-gray-600">Source</label>
                    <select defaultValue={''} onChange={(event) => setCrewID(event.target.value)} id="selectInput" name="selectInput" className="mt-1 p-2 w-full border rounded-md">
                        <option value={-1}>Select Crew</option>
                        {crews.map((crew) => (
                            <option value={crew.crewID}>{crew.crewName}</option>
                        ))}
                    </select>
                    <button
                        className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                        onClick={assignCrew}
                    >
                        Assign Crew
                    </button>
                </div>
                <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Crew Name</th>
                            <th className="py-3 px-6 text-left">Pilot</th>
                            <th className="py-3 px-6 text-left">Attendant</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {crews.map((crew) => (
                                <tr
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-left">{crew.crewName}</td>
                                    <td className="py-3 px-6 text-left">{crew.pilot}</td>
                                    <td className="py-3 px-6 text-left flex gap-4">
                                        {crew.flightAttendants.map((flightAttendant) => (
                                            <p>{flightAttendant}</p>
                                        ))}
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div>
                {crew ? (
                    <CrewInformation flight={flight} crew={crew}></CrewInformation>
                ) : (
                    <div></div>
                )}
            </div>
        )}
    </div>
}

export default AssignFlightCrew;

