import {getCargoHandler} from "@renderer/Controller/GeneralControls/CargoController";
import {createTask} from "@renderer/Controller/GeneralControls/TaskController";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {useEffect, useState} from "react";
import ViewTaskOfCargo from "./ViewTaskOfCargo";

interface I {
    cargo : Cargo
    c : () => void
    cValue : number
}


function CreateTask(props : I) {
    const cargo = props.cargo 
    const [handlers, setHandlers] = useState<Employee[]>([])
    const [handler, setHandler] = useState('')
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')

    const createHandle = () => {
        createTask(date, handler, task, cargo).then((result) => {
            if(result) props.c()
        })
    }

    useEffect(() => {
        getCargoHandler().then((result) => {
            setHandlers(result)
        })
    }, [])

    return (
        <div className="flex flex-col gap-3">
            <p>Cargo ID : {cargo.cargoID}</p>
            <ViewTaskOfCargo change={props.c} c={props.cValue} cargo={cargo}></ViewTaskOfCargo>
            <p className="text-2xl font-bold tracking-wide">Create Task</p>
            <select
                onChange={(o) => setHandler(o.target.value)}
                >
                    <option>Choose Handler</option>
                {handlers.map((handler) => (
                    <option value={handler.companyEmail}>{ handler.name }</option>
                ))}
            </select>
            <textarea
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Task"
                rows={4}
                onChange={(o) => setTask(o.target.value)}
            ></textarea>
            <input
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Date"
                type="date"
                onChange={(o) => setDate(o.target.value)}
            ></input>
            <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={createHandle}
                >
                    Add Task
            </button>
        </div>
    );
}

export default CreateTask;
