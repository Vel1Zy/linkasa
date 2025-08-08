import {useEffect, useState} from "react";
import {Plane} from "../../../../Controller/Interfaces/PlaneInterface";
import {getAllPlane} from "../../../../Controller/GeneralControls/PlaneController";
import {createFlightSchedule} from "../../../../Controller/GeneralControls/FlightController";
import locationsArray from "../../../../Controller/Interfaces/FlightInterface";

function CreateFlightSchedule() {
    const [planes, setPlanes] = useState<Plane[]>([])
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [duration, setDuration] = useState(-1)
    const [planeID, setPlaneID] = useState('')

    useEffect(() => {
        getAllPlane().then((result) => {
            setPlanes(result)
        })
    }, []);

    const submitHandle = () => {
        createFlightSchedule(source, destination, date, duration, planeID).then(() => {
            window.location.reload()
        })
    }

    return <div className={'px-20 py-5 flex items-center justify-center'}>
        <div className="bg-white p-8 rounded shadow-md w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Create Flight Schedule</h2>
            <div className="mb-4">
                <label htmlFor="selectInput" className="block text-sm font-medium text-gray-600">Source</label>
                <select defaultValue={''} onChange={(event) => setSource(event.target.value)} id="selectInput" name="selectInput" className="mt-1 p-2 w-full border rounded-md">
                    <option value={-1}>Select Source</option>
                    {locationsArray.map((loc) => (
                        <option value={loc.id}>{loc.country}, {loc.province}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="selectInput" className="block text-sm font-medium text-gray-600">Destination</label>
                <select defaultValue={'Source'} onChange={(event) => setDestination(event.target.value)} id="selectInput" name="selectInput" className="mt-1 p-2 w-full border rounded-md">
                    <option value={-1}>Select Destination</option>
                    {locationsArray.map((loc) => (
                        <option value={loc.id}>{loc.country}, {loc.province}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="selectInput" className="block text-sm font-medium text-gray-600">Plane</label>
                <select onChange={(event) => setPlaneID(event.target.value)} id="selectInput" name="selectInput" className="mt-1 p-2 w-full border rounded-md">
                    <option>Select Plane</option>
                    {planes.map((plane) => (
                        <option value={plane.id}>{plane.name} [{plane.passengerLimit}]</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="dateInput" className="block text-sm font-medium text-gray-600">Boarding Date and Time</label>
                <input onChange={(o) => {
                    setDate(o.target.value)}} type="datetime-local" id="dateInput" name="dateInput" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div className="mb-4">
                <label htmlFor="dateInput" className="block text-sm font-medium text-gray-600">Duration</label>
                <input onChange={(o) => {
                    setDuration(parseInt(o.target.value))}} type="number" id="dateInput" name="dateInput" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <button onClick={submitHandle} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </div>
    </div>
}

export default CreateFlightSchedule
