import {createSecurityIncident} from "@renderer/Controller/GeneralControls/SecurityIncidentController";
import {useState} from "react";

function CreateSecurityIncidents() {
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [location, setLocation] = useState('')
    
    const createHandle = () => {
        createSecurityIncident(location, desc, date).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-3 w-1/2">
            <p className="text-xl font-bold ">Create Security Incident</p>
            <textarea
                name="text"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Description"
                rows={4}
                onChange={(o) => setDesc(o.target.value)}
            ></textarea>           
            <input
                name="text"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Location"
                type="text"
                onChange={(o) => setLocation(o.target.value)}
            ></input>              
            <input
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Create New Schedule"
                type="date"
                onChange={(o) => setDate(o.target.value)}
            ></input>           
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none w-1/4"
                onClick={createHandle}
            >
                Add Schedule
            </button>
        </div>
    );
}

export default CreateSecurityIncidents;
