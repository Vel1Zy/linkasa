import {createMaintenanceSchedule, getAllMaintenanceSchedule} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {MaintenaceCrew, Maintenance, equipmentTypes, groundSupportEquipment, items, terminalEquipment} from "@renderer/Controller/Interfaces/MaintenanceInterface";
import {useContext, useEffect, useState} from "react";
import actionIcon from '../../../../../assets/ActionIcon.png'
import {Link} from "react-router-dom";
import CreateMaintenanceSchedule from "./CreateMaintenanceSchedule";
import {UserContext} from "@renderer/Components/Context/UserContext";

function MaintenanceSchedules() {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([])
    const user = useContext(UserContext)?.currentUser

    useEffect(() => {
        getAllMaintenanceSchedule().then((result) => {
            setMaintenances(result)
        })
    }, [])
    

    return (
        <div className="px-20 py-5">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Equipment Type</th>
                        <th className="py-3 px-6 text-left">Item</th>
                        <th className="py-3 px-6 text-left">Estimated Day</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {maintenances.map((m, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left">{m.equipmentType}</td>
                                <td className="py-3 px-6 text-left">{m.equipment}</td>
                                <td className="py-3 px-6 text-left">{m.estimatedDay}</td>
                                {m.maintenanceCrew ? (
                                    <td className="py-3 px-6 text-left text-green-500 font-bold tracking-wide">A</td>
                                ) : (
                                    <td className="py-3 px-6 text-left text-red-500 font-bold tracking-wide">NA</td>
                                )}
                                <td className="py-3 px-6 text-left">
                                    <Link to={'/maintenanceManager/maintenance-detail/' + m.maintenanceID}><img className="w-10" src={actionIcon} alt="" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {user?.role == 'MaintenanceManager' ?<CreateMaintenanceSchedule></CreateMaintenanceSchedule> : <div></div>}
            
        </div>
    );
}

export default MaintenanceSchedules;
