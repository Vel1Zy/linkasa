import {useEffect, useState} from "react";
import CreateSecurityIncidents from "./CreateSecurityIncidents";
import {SecurityIncident} from "@renderer/Controller/Interfaces/SecurityIncidentInterface";
import {deleteSecurityIncident, getAllSecurityIncident} from "@renderer/Controller/GeneralControls/SecurityIncidentController";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import UpdateSecurityIncident from "./UpdateSecurityIncident";
import del from '../../../../../assets/deleteIcon.png'

function SecurityIncidents() {
    const [incidents, setIncidents] = useState<SecurityIncident[]>([])
    const [create, setCreate] = useState(true)
    const [incident, setIncident] = useState<SecurityIncident | null>(null)

    useEffect(() => {
        getAllSecurityIncident().then((result) => {
            setIncidents(result)
            console.log(incidents)
        })
    }, [])
    
    return (
        <div className="px-20 py-5">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Date of happening</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {incidents.map((incident, index) => (
                        <tr
                            onClick={() => {
                                setIncident(incident)
                                setCreate(false)
                            }}
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {/*// @ts-ignore*/}
                            <td className="py-3 px-6 text-left">{utc(incident.date.seconds)}</td>
                            <td className="py-3 px-6 text-left">{incident.description}</td>
                            <td className="py-3 px-6 text-left">{incident.location}</td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => {
                                    deleteSecurityIncident(incident.id).then((result) => {
                                        if(result) window.location.reload()
                                    })
                                }}>
                                    <img className="w-10" src={del} alt="" />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none w-1/6 mb-5"
                onClick={() => setCreate(!create)}
            >
                Create
            </button>
            {(create)? <CreateSecurityIncidents></CreateSecurityIncidents> : <UpdateSecurityIncident incident={incident}></UpdateSecurityIncident>}
        </div>
    );
}

export default SecurityIncidents;
