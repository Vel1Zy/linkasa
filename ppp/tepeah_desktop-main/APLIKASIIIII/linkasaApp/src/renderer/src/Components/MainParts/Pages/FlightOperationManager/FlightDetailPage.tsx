import {useParams} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import {deleteFlightSchedule, getFlightInfoByID} from "../../../../Controller/GeneralControls/FlightController";
import {Flight} from "../../../../Controller/Interfaces/FlightInterface";
import AssignFlightCrew from "./AssignFlightCrew";
import FlightSeat from "./FlightSeat";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import UpdateFlightDetail from "./UpdateFlightDetail";
import {UserContext} from "@renderer/Components/Context/UserContext";

export const FlightDetailPage = () => {
    const user = useContext(UserContext)?.currentUser
    const { flightID } = useParams()
    const [flight, setFlight] = useState<Flight | null>(null)
    const [update, setupdate] = useState(false)

    useEffect(() => {
        if (flightID) getFlightInfoByID(flightID).then((result) => {
            setFlight(result)
            console.log(flight);
        })
    }, []);

    const deleteHandle = () => {
        if(flight) deleteFlightSchedule(flight).then((result) => {
            if(result) window.location.href = 'fom/flights-information'
        })
    }


    return <div className={'px-20 py-5'}>
        {(flight && user) ? (
            <div>
                <div className="text-xl font-semibold flex flex-col gap-2 mb-2">
                    <p>Boarding Time : {utc(flight.boardingTime.seconds)}</p>
                    <p>Destination : {flight.destination.province}, {flight.destination.country}</p>
                    <p>Source : {flight.source.province}, {flight.source.country}</p>
                    <p>Estimated Duration : {flight.duration}</p>
                    <p>Status : {flight.status}</p>
                    <p className="text-blue-500">
                        <a href={'/baggage-information/'+flight.flightID}>Baggage Information</a>
                    </p>
                </div>
                <FlightSeat flight={flight}></FlightSeat>
                {(user.role == 'FlightOperationManager') ? ( 
                    <div>
                        <AssignFlightCrew flight={flight}></AssignFlightCrew>
                        <button
                            onClick={() => setupdate(!update)}
                            className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                        >
                            Update
                        </button>
                        <button
                            onClick={deleteHandle}
                            className="ml-2 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                        >
                            Delete
                        </button>
                        {update ? (<UpdateFlightDetail flight={flight}></UpdateFlightDetail>):(<div></div>)}
                    </div>
                ) : (<div></div>)}
                
            </div>
        ) : (
            <div>
                <p className={'text-green-600 font-bold'}>Fetching....</p>
            </div>
        )}
    </div>
};

export default FlightDetailPage
