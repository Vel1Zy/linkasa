import {updateSecurityIncident} from "@renderer/Controller/GeneralControls/SecurityIncidentController";
import {SecurityIncident} from "@renderer/Controller/Interfaces/SecurityIncidentInterface";
import {useState} from "react";

interface I {
    incident : SecurityIncident | null
}
function UpdateSecurityIncident(props : I) {
    const i = props.incident
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [location, setLocation] = useState('')

    const updateHandle = () => {
        if(i) updateSecurityIncident(i, location, desc, date).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-2 w-1/2">
            <p>{i?.id}</p>
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
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none w-1/2"
                onClick={updateHandle}
            >
                Update Security Incident
            </button>
        </div>
    );
}

export default UpdateSecurityIncident;
