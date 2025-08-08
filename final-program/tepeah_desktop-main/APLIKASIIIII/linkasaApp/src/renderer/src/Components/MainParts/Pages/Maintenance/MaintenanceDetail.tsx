import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {deleteMaintenanceCrewFromMaintenance, deleteMaintenanceSchedule, getMaintenanceData} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {Maintenance} from "@renderer/Controller/Interfaces/MaintenanceInterface";
import Fetching from "@renderer/LittleComponents/Fetching";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AssignMaintenanceCrew from "./AssignMaintenanceCrew";
import CrewDetail from "./CrewDetail";
import UpdateMaintenanceSchedule from "./UpdateMaintenanceSchedule";


function MaintenanceDetail() {
    const { maintenanceID } = useParams()
    const [maintenance, setMaintenance] = useState<Maintenance | null>(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        if(maintenanceID) getMaintenanceData(maintenanceID).then((result) => {
            setMaintenance(result)
        })
    }, [])

    const deleteHandle = () => {
        if(maintenance) deleteMaintenanceSchedule(maintenance).then((result) => {
            if(result) window.location.href = '/maintenanceManager/maintenances'
        })
    }

    const deleteCrewHandle = () => {
        if(maintenance && maintenance.maintenanceCrew) deleteMaintenanceCrewFromMaintenance(maintenance, maintenance?.maintenanceCrew).then((result) => {
            if(result) window.location.reload()
        })
    }
    

    return (
        <div className="px-20 py-5">
            {maintenance ? (
                <div>
                    <p>Desc : {maintenance?.description}</p>
                    <p>Date : {utc(maintenance?.date.seconds)}</p>
                    <p>Equipment Type : {maintenance.equipmentType}</p>
                    <p>Equipment : {maintenance.equipment}</p>
                    <p>Estimated Day : {maintenance.estimatedDay}</p>
                    
                    {maintenance.maintenanceCrew ? (
                        <div>
                            <CrewDetail crew={maintenance.maintenanceCrew}></CrewDetail>
                        <button
                            className="ml-2 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                            onClick={deleteCrewHandle}
                        >
                            Delete Crew
                        </button>
                        </div>
                    ) : (
                        <div>
                            <AssignMaintenanceCrew maintenance={maintenance}></AssignMaintenanceCrew>
                        </div>
                    )}
                    <div>
                    <button
                        className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                        onClick={() => setUpdate(!update)}
                    >
                        Update
                    </button>
                    <button
                        className="ml-2 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                        onClick={deleteHandle}
                    >
                        Delete 
                    </button>
                    {update ? (
                        <UpdateMaintenanceSchedule maintenance={maintenance}></UpdateMaintenanceSchedule>
                    ) : (
                        <div></div>
                    )}
                </div>
                </div>
            ) : (
                <div>
                    <Fetching></Fetching>
                </div>
            )}
        </div>
    );
}

export default MaintenanceDetail;
