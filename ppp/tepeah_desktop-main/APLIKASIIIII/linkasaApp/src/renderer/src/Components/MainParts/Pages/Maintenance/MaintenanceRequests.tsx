import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import actionIcon from '../../../../../assets/ActionIcon.png'
import {getAllMaintenanceRequest} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {MaintenanceRequest} from "@renderer/Controller/Interfaces/MaintenanceInterface";
import {useEffect, useState} from "react";
import MaintenanceRequestDetail from "./MaintenanceRequestDetail";

function MaintenanceRequests() {
    const [maintenances, setMaintenances] = useState<MaintenanceRequest[]>([])
    const [request, setRequest] = useState<MaintenanceRequest | null>(null)

    useEffect(() => {
        getAllMaintenanceRequest().then((result) => {
            setMaintenances(result);
        })
    }, [])
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Schedule</h2>
                <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Item</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-left">Desc</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {maintenances.map((maintenance, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left">{maintenance.equipment}</td>
                                <td className="py-3 px-6 text-left">{utc(maintenance.date.seconds)}</td>
                                <td className="py-3 px-6 text-left">{maintenance.description}</td>
                                <td className="py-3 px-6 text-left">{maintenance.status}</td>
                                <td className="py-3 px-6 text-left">
                                    <button onClick={() => {
                                        setRequest(maintenance)
                                    }}>
                                        <img className="w-10" src={actionIcon} alt="" />
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>    
                {request ? (<MaintenanceRequestDetail requst={request}></MaintenanceRequestDetail>) : (<></>)}
        </div>
    );
}

export default MaintenanceRequests;
