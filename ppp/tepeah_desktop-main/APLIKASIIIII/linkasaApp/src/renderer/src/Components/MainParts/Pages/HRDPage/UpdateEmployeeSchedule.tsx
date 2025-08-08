import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import { updateEmployeeSchedule} from "@renderer/Controller/GeneralControls/EmployeeController";
import {Employee, Schedule} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {useState} from "react";

interface I {
    employee : Employee
    schedule : Schedule
}

function UpdateEmployeeSchedule(props : I) {
    const schedule = props.schedule
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')

    const updateHandle = () => {
        updateEmployeeSchedule(props.employee, props.schedule, date, task).then((result) => {
            if(result) window.location.reload()
        }) 
    }
    return (
        <div>
            <p>Schedule Detail</p>
            <p>Task : {schedule.task}</p>
            <p>Date : {utc(schedule.date.seconds)}</p>
            <div className="flex flex-col gap-2 w-1/4">
                <input onChange={(o) => setTask(o.target.value)} type="text" name="" id="" placeholder="task" className="border border-black p-2 rounded-md"/>
                <input onChange={(o) => setDate(o.target.value)} type="date" name="" id="" placeholder="date" className="border border-black p-2 rounded-md"/>
                <button onClick={updateHandle} name="" id="" placeholder="date" className="border border-black p-2 rounded-md">Update Schedule</button>
                {/* <button onClick={deleteHandle} name="" id="" placeholder="date" className="border border-black p-2 rounded-md">Delete Schedule</button> */}
            </div>
        </div>
    );
}

export default UpdateEmployeeSchedule;
