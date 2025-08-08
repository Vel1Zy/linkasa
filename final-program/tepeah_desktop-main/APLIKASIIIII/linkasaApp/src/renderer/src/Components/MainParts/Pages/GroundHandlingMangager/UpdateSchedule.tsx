import {RefuelSchedule} from "@renderer/Controller/Interfaces/RefuelScheduleInterface";
import FlightSchedules from "../FlightOperationManager/FlightSchedules";
import {useEffect, useState} from "react";
import {Plane} from "@renderer/Controller/Interfaces/PlaneInterface";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import {getAllPlane, getPlanesFromFligts} from "@renderer/Controller/GeneralControls/PlaneController";
import {getAllEmployeeByARole} from "@renderer/Controller/GeneralControls/EmployeeController";
import {getAllFlightSchedule} from "@renderer/Controller/GeneralControls/FlightController";
import {updateRefuelingSchedule} from "@renderer/Controller/GeneralControls/RefuelingScheduleController";

interface I {
    refuel : RefuelSchedule
}

function UpdateSchedule(props : I) {
    const [planes, setPlanes] = useState<Plane[]>([])
    const [crews, setCrews] = useState<Employee[]>([])
    const [planeID, setPlaneID] = useState('')
    const [crewEmail, setCrewEmail] = useState('')
    const [date, setDate] = useState('')
    const [flights, setfilghts] = useState<Flight[]>([])
    const [ps, setPs] = useState<Plane[]>([])
    useEffect(() => {
        getAllPlane().then((results) => {
            setPlanes(results)
        })
        getAllEmployeeByARole('GroundHandlingStaff').then((result) => {
            setCrews(result)
        })
    }, []);

    useEffect(() => {
        getAllFlightSchedule().then((result) => {
            setfilghts(result)
            console.log(flights);
        })
    }, [])
    useEffect(() => {
        if(flights.length > 0) getPlanesFromFligts(flights).then((r) => {
            setPs(r)
            console.log(ps);
        })
    }, [flights])
    
    const UpdateHandle = () => {
        updateRefuelingSchedule(props.refuel, date, planeID, crewEmail).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div>
            <div className={'px-20 py-5 flex flex-col gap-5 justify-center '}>
                {(flights && ps)? <FlightSchedules planes={ps} flights={flights}></FlightSchedules> : <></>}
                <div className={'flex items-center gap-3 text-lg'}>
                    <label htmlFor="name" className="block font-medium text-gray-700">Date:</label>
                    <input type="date" id="name" onChange={(o) => setDate(o.target.value)} className="mt-1 p-2 w-1/2 border rounded-md"/>
                </div>
                <div className={'flex items-center gap-3 text-lg'}>
                    <label htmlFor="name" className="block font-medium text-gray-700">Plane:</label>
                    <select value={planeID} id="gender" onChange={(o) => setPlaneID(o.target.value)} className="mt-1 p-2 w-1/2 border rounded-md">
                        {planes.map((plane, index) => (
                            <option key={index} value={plane.id}>{plane.name}</option>
                        ))}
                    </select>
                </div>
                <div className={'flex items-center gap-3 text-lg'}>
                    <label htmlFor="name" className="block font-medium text-gray-700">Crew:</label>
                    <select id="gender" className="mt-1 p-2 w-1/2 border rounded-md" onChange={(o) => setCrewEmail(o.target.value)}>
                        {crews.map((crew) => (
                            <option value={crew.companyEmail}>{crew.name}</option>
                        ))}
                    </select>
                </div>
                <button className={'border border-black p-3 rounded-lg w-1/4'} onClick={UpdateHandle}>Update</button>
            </div>           
        </div>
    );
}

export default UpdateSchedule;
