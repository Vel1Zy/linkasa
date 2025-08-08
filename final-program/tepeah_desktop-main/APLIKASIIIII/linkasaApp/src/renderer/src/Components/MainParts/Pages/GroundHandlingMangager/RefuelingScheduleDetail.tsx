import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {RefuelSchedule} from "@renderer/Controller/Interfaces/RefuelScheduleInterface";
import {useEffect, useState} from "react";
import UpdateSchedule from "./UpdateSchedule";
import {Plane} from "@renderer/Controller/Interfaces/PlaneInterface";
import {getPlaneInfo} from "@renderer/Controller/GeneralControls/PlaneController";
import {deleteRefuelingSchedule} from "@renderer/Controller/GeneralControls/RefuelingScheduleController";

interface I {
    refuel : RefuelSchedule
}
function RefuelingScheduleDetail(props : I) {
    const refuel = props.refuel;
    const [updating, setUpdating] = useState(false)
    const [plane, setPlane] = useState<Plane | null>(null)

    const deleteHandle = () => {
        deleteRefuelingSchedule(refuel).then((r) => {
            if(r) window.location.reload()
        })
    }

    useEffect(() => {
        getPlaneInfo(refuel.plane).then((info) => {
            setPlane(info)
        })
    }, [refuel])

    return (
        <div className="text-lg font-semibold">
            <p>crew : {refuel.crew}</p>
            <p>plane : {plane ? <>{plane.name}</> : <></>}</p>
            <p>date : {utc(refuel.date.seconds)}</p>
            <button onClick={deleteHandle} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg mr-3">Delete Schedule</button>
            <button onClick={() => setUpdating(!updating)} className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Update Schedule</button>
            {updating? <UpdateSchedule refuel={refuel}></UpdateSchedule> : <></>}
        </div>
    );
}

export default RefuelingScheduleDetail;
