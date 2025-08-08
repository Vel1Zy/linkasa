
import { useContext, useState } from "react";
import {addSchedule, deleteEmployeeSchedule} from "../../../../Controller/GeneralControls/EmployeeController";
import {Employee, Schedule} from "../../../../Controller/Interfaces/EmployeeInterface";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {Timestamp} from "firebase/firestore";
import deleteIcon from '../../../../../assets/deleteIcon.png'
import UpdateEmployeeSchedule from "./UpdateEmployeeSchedule";
import {createID} from "@renderer/Controller/GeneralControls/IDController";
import {UserContext} from "@renderer/Components/Context/UserContext";

interface Props {
    employee : Employee
    canCreate : boolean
}

function EmployeeSchedule (props : Props) {
    const employee = props.employee
    const user = useContext(UserContext)?.currentUser
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [schedule, setSchedule] = useState<Schedule | null>(null)
    
    const createHandle = () => {
        const schedule : Schedule = {
            scheduleID : 'schedule-' + createID(),
            date : Timestamp.fromDate(new Date(date)),
            task : desc
        }
        if(schedule) addSchedule(employee, schedule).then((result) => {
            if(result) window.location.reload()
        })
    }

    return <div>
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                {(user && user.role === 'HRD') ? <>Employe Training</> : <>Schedule</>}
            </h2>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Detail Time</th>
                            <th className="py-3 px-6 text-left">Event</th>
                            <th className="py-3 px-6 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {employee.schedule.map((schedule, index) => (
                        <tr
                            onClick={() => setSchedule(schedule)}
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {/*// @ts-ignore*/}
                            <td className="py-3 px-6 text-left">{utc(schedule.date.seconds)}</td>
                            <td className="py-3 px-6 text-left">{schedule.task}</td>
                            <td className="py-3 px-6 text-left">
                                <button className="m-0 p-0" onClick={() => deleteEmployeeSchedule(employee, schedule.date)}>
                                    <img className="h-10 opacity-70 hover:opacity-100" src={deleteIcon} alt="" />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {props.canCreate ?(<div>
            <div className="w-1/2 p-0">
                <textarea
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    name="task"
                    placeholder="Create New Schedule"
                    rows={4}
                    onChange={(o) => setDesc(o.target.value)}
                ></textarea>
                <input
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Create New Schedule"
                    type="date"
                    onChange={(o) => setDate(o.target.value)}
                ></input>
                <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={createHandle}
                >
                    Add Schedule
                </button>
            </div>
            </div>) : <></>}
            {schedule ? <UpdateEmployeeSchedule employee={employee} schedule={schedule}/> : <></>}
        </div>
    </div>
}

export default EmployeeSchedule
