import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {getAllRefuelSchedule} from "@renderer/Controller/GeneralControls/RefuelingScheduleController";
import {RefuelSchedule} from "@renderer/Controller/Interfaces/RefuelScheduleInterface";
import {useEffect, useState} from "react";
import action from '../../../../../assets/ActionIcon.png'
import RefuelingScheduleDetail from "./RefuelingScheduleDetail";

function RefuelingSchedule() {
    const [refuelingSchedules, setrefuelingSchedules] = useState<RefuelSchedule[]>([])
    const [refuel, setRefuel] = useState<RefuelSchedule | null>(null)
    
    useEffect(() => {
        getAllRefuelSchedule().then((refuelingSchedule) => {
            setrefuelingSchedules(refuelingSchedule)
        })
    }, [])
    
    return (
        <div className="px-20">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Detail Time</th>
                            <th className="py-3 px-6 text-left">Plane ID</th>
                            <th className="py-3 px-6 text-left">Crew</th>
                            <th className="py-3 px-6 text-left">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {refuelingSchedules.map((schedule, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {/*// @ts-ignore*/}
                            <td className="py-3 px-6 text-left">{utc(schedule.date.seconds)}</td>
                            <td className="py-3 px-6 text-left">{schedule.plane}</td>
                            <td className="py-3 px-6 text-left">{schedule.crew}</td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => setRefuel(schedule)}>
                                    <img className="w-10" src={action} alt="" />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div> 
            {refuel ? <RefuelingScheduleDetail refuel={refuel}></RefuelingScheduleDetail> : <></>}
        </div>
    );
}

export default RefuelingSchedule;
