import {assignMaintenanceCrew, getAvailableCrew} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {MaintenaceCrew, Maintenance} from "@renderer/Controller/Interfaces/MaintenanceInterface";
import {useEffect, useState} from "react";

interface P { 
    maintenance : Maintenance
}

function AssignMaintenanceCrew(p : P) {
    const [availableCrew, setavailableCrew] = useState<MaintenaceCrew[]>([])
    const [crewID, setCrewID] = useState('')
    useEffect(() => {
        getAvailableCrew(p.maintenance).then((result) => {
            setavailableCrew(result)
        }) 
    }, [])

    const assignCrew = () => {
        assignMaintenanceCrew(p.maintenance, crewID)
    }
    
    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Crew Name</th>
                            <th className="py-3 px-6 text-left">Maintenance Personnel</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {availableCrew.map((crew) => (
                                <tr
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-left">{crew.crewName}</td>
                                    <td className="py-3 px-6 text-left flex gap-4">
                                        {crew.crewEmails.map((email) => (
                                            <p>{email}</p>
                                        ))}
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            <div className="my-4 ">
                    <label htmlFor="selectInput" className="block text-sm font-medium text-gray-600">Source</label>
                    <select defaultValue={''} onChange={(event) => setCrewID(event.target.value)} id="selectInput" name="selectInput" className="mt-1 p-2 w-full border rounded-md">
                        <option value={-1}>Select Crew</option>
                        {availableCrew.map((crew) => (
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
        </div>
    );
}

export default AssignMaintenanceCrew;
