import {useEffect, useState} from "react"; import {Plane} from "../../../../Controller/Interfaces/PlaneInterface";
import {getAllPlane, getPlanesFromFligts} from "../../../../Controller/GeneralControls/PlaneController";
import {Employee} from "../../../../Controller/Interfaces/EmployeeInterface";
import {getAllEmployeeByARole} from "../../../../Controller/GeneralControls/EmployeeController";
import {createRefuelSchedule} from "../../../../Controller/GeneralControls/RefuelingScheduleController";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import {getAllFlightSchedule} from "@renderer/Controller/GeneralControls/FlightController";
import FlightSchedules from "../FlightOperationManager/FlightSchedules";

function CreateRefuelingPage() {
    const [planes, setPlanes] = useState<Plane[]>([])
    const [crews, setCrews] = useState<Employee[]>([])
    const [planeID, setPlaneID] = useState('')
    const [crewEmail, setCrewEmail] = useState('')
    const [date, setDate] = useState('')
    const [flights, setfilghts] = useState<Flight[]>([])
    const [ps, setPs] = useState<Plane[]>([])


    const CreateHandle = () => {
        createRefuelSchedule(planeID, crewEmail, date).then((result) => {
            if(result) window.location.reload()
        })
    }

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
    

    return (
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
            <button className={'border border-black p-3 rounded-lg w-1/4'} onClick={CreateHandle}>Create</button>
        </div>
    );
}

export default CreateRefuelingPage;
