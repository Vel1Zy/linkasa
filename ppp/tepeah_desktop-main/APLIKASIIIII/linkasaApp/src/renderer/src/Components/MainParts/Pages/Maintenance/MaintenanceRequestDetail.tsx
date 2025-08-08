import {UserContext} from "@renderer/Components/Context/UserContext";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {acceptMaintenanceRequest, rejectMaintenanceRequest, reviseMaintenanceRequest} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {MaintenanceRequest} from "@renderer/Controller/Interfaces/MaintenanceInterface";
import {useContext, useState} from "react";

interface I {
    requst : MaintenanceRequest
}
function MaintenanceRequestDetail(props : I) {
    const request = props.requst
    const user = useContext(UserContext)?.currentUser
    const [revising, setrevising] = useState(false)
    const [desc, setDesc] = useState('')

    const accept = () => {
        acceptMaintenanceRequest(request).then((response) => {
            if(response) window.location.reload()
        })
    }

    const reject = () => {
        rejectMaintenanceRequest(request).then((response) => {
            if(response) window.location.reload()
        })
    }

    const revise = () => {
        reviseMaintenanceRequest(request, desc).then((response) => {
            if(response) window.location.reload()
        })
    }

    return (
        <div>
            <p className="text-xl font-bold">Request Detail</p>
            <p>desc : {request.description}</p>
            <p>date : {utc(request.date.seconds)}</p>
            <p>equipmentType : {request.equipmentType}</p>
            <p>equipment: {request.equipment}</p>
            <p>estimatedDay {request.estimatedDay}</p>
            <p>Request Status : {request.status}</p>
            {(user?.role  === 'AirOperationManager' && request.status === 'pending') ? <div className="flex gap-3 flex-col mt-3">
                <div className="flex gap-3">
                    <button onClick={accept} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Accept</button>
                    <button onClick={reject} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reject</button>
                    <button onClick={() => setrevising(!revising)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Revise</button>
                </div>
                {revising ? <div className="flex flex-col gap-3">
                    <textarea
                        className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                        name="task"
                        placeholder="Revising information"
                        rows={4}
                        onChange={(o) => setDesc(o.target.value)}
                    ></textarea>
                    <button onClick={revise} className="w-1/6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit Revise</button>
                </div> : <div></div>}
            </div> : <div>
            </div>}
        </div>
    );
}

export default MaintenanceRequestDetail;
