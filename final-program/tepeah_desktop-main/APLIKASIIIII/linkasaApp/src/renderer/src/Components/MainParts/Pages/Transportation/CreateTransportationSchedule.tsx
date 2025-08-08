
import {Plane} from "@renderer/Controller/Interfaces/PlaneInterface";
import {useEffect, useState} from "react";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import FlightSchedules from "../FlightOperationManager/FlightSchedules";
import {getAllFlightSchedule} from "@renderer/Controller/GeneralControls/FlightController";
import {getAllPlane, getPlanesFromFligts} from "@renderer/Controller/GeneralControls/PlaneController";
import {transportationRoutes} from "@renderer/Controller/Interfaces/RouteInterface";
import {parkingIDs} from "@renderer/Controller/Interfaces/ParkingInterface";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {getEmployeeByRole} from "@renderer/Controller/GeneralControls/EmployeeController";

interface I {
    c : () => void
}

function CreateTransportationSchedule(props : I) {
    const [plane, setPlane] = useState('')
    const [route, setRoute] = useState('')
    const [parking, setParking] = useState()
    const [staff, setStaff] = useState('')
    const [date, setDate] = useState('')
    const [to, setTo] = useState('')
    const [purpose, setPurpose] = useState('')
    const [flights, setfilghts] = useState<Flight[]>([])
    const [ps, setPs] = useState<Plane[]>([])
    const [planes, setPlanes] = useState<Plane[]>([])
    const [staffs, setStaffs] = useState<Employee[]>([])

    const createHandle = () => {
        
    }

    useEffect(() => {
        getEmployeeByRole("LandsideOperationsStaff").then((result) => {
            setStaffs(result)
        })
    }, [])

    useEffect(() => {
        getAllPlane().then((result) => {
            setPlanes(result)
        })
    }, [])

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
        <div className="flex flex-col gap-3 w-1/2">
            {(flights && ps)? <FlightSchedules planes={ps} flights={flights}></FlightSchedules> : <></>}
            <select
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
            >
                <option>Select Plane</option>
                {planes.map((plane, index) => (
                    <option value={plane.id} key={index}>{plane.name}</option>
                ))}
            </select>
            <select
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
            >
                <option>Select Route</option>
                {transportationRoutes.map((route, index) => (
                    <option value={route} key={index}>{route}</option>
                ))}
            </select>
            <select
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
            >
                <option>Select Parking Facility</option>
                {parkingIDs.map((route, index) => (
                    <option value={route} key={index}>{route}</option>
                ))}
            </select>
            
            <select
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
            >
                <option>Select Lanside Operations Staff</option>
                {staffs.map((staff, index) => (
                    <option value={staff.companyEmail} key={index}>{staff.companyEmail}</option>
                ))}
            </select>
            <div className="flex flex-col gap-2">
                <p className="ml-2 text-lg font-bold">Transportation Date</p>
                <input
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Tranportation Date"
                    type="date"
                ></input>
            </div>
            <div className="flex flex-col gap-2">
                <p className="ml-2 text-lg font-bold">Using Parking To</p>
                <input
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Tranportation Date"
                    type="date"
                ></input>
            </div>
            <textarea
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Purpose"
                rows={4}
            ></textarea>
            <button
                className="w-1/2 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={createHandle}
            >
                Create Tranportation
            </button>
        </div>

    );
}

export default CreateTransportationSchedule;
