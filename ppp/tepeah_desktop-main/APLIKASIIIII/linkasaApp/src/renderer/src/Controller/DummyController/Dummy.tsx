import {pushData} from "./PlaneDummyMaker";
import {addGroundStaff} from "./GroundStaffMaker";
import { fixPassenger, makePassenger} from "./PassengerGenerator";
import {fixCrew, fixMaintenance, MakeCrew, makeMaintenanceCrew} from "./CrewMaker";
import {Flight} from "../Interfaces/FlightInterface";
import {useEffect, useState} from "react";
import {getAllFlightSchedule} from "../GeneralControls/FlightController";
import {addPassengerToFlight} from "./AddPassengerToFlight";
import {makeSecurityStaff} from "./MakeSecurityStaff";
import {fixSchedule} from "./fixSchedule";
import {deletePassportVisa} from "./DeletePassportVisa";
import {checkConnection} from "./CheckConnection";

function Dummy() {
    const [flights, setFlights] = useState<Flight[]>([])
    const [flightID, setFlightID] = useState('')

    useEffect(() => {
        getAllFlightSchedule().then((result) =>{
            setFlights(result)
        })
    }, [])

    const c = () => {
        addPassengerToFlight(flightID)
    }
    
    return (

        <div className={'px-20 py-5 flex flex-wrap gap-5'}>
            <button className={'border p-5 border-black'} onClick={makePassenger}>make passenger</button>
            <button className={'border p-5 border-black'} onClick={pushData}>create plane data</button>
            <button className={'border p-5 border-black'} onClick={addGroundStaff}>create ground data</button>
            <button className={'border p-5 border-black'} onClick={MakeCrew}>make crew</button>
            <button className={'border p-5 border-black'} onClick={fixCrew}>fix crew</button>
            <button className={'border p-5 border-black'} onClick={fixPassenger}>fix passenger</button>
            <button className={'border p-5 border-black'} onClick={makeMaintenanceCrew}>make maintenance crew</button>
            <button className={'border p-5 border-black'} onClick={fixMaintenance}>fix maintenance crew</button>
            <button className={'border p-5 border-black'} onClick={makeSecurityStaff}>security staff</button>
            <button className={'border p-5 border-black'} onClick={fixSchedule}>fix schedule</button>
            <button className={'border p-5 border-black'} onClick={deletePassportVisa}>delete passport visa</button>
            <button className={'border p-5 border-black'} onClick={checkConnection}>check connection</button>

            

            <select onChange={(o) => setFlightID(o.target.value)} name="" id="" className="p-3">
                <option value="">asdfadsf</option>
                {flights.map((flight, index) => (
                    <option key={index} value={flight.flightID}>{flight.flightID}</option>
                ))}
            </select>
            <button onClick={c}>x</button>
        </div>
    );
}

export default Dummy;
