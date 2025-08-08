import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {deleteTask, getTaskOfCargo} from "@renderer/Controller/GeneralControls/TaskController";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import {Task} from "@renderer/Controller/Interfaces/TaskInterface";
import {useEffect, useState} from "react";
import del from '../../../../../../../assets/deleteIcon.png'
import UpdateTask from "./UpdateTask";

interface I {
    cargo : Cargo
    c : number
    change : () => void
}
function ViewTaskOfCargo(props : I) {
    const cargo = props.cargo
    const [tasks, setTasks] = useState<Task[]>([])
    const [task, setTask] = useState<Task>()

    useEffect(() => {
        getTaskOfCargo(cargo.cargoID).then((result) => {
            setTasks(result)
        })
    }, [props.c])


    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Time</th>
                            <th className="py-3 px-6 text-left">Handler</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {tasks.map((t, index) => (
                        <tr
                            key={index}
                            onClick={() => {
                                setTask(t)
                            }}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {/*// @ts-ignore*/}
                            <td className="py-3 px-6 text-left">{utc(t.date)}</td>
                            <td className="py-3 px-6 text-left">{(t.handler)}</td>
                            <td className="py-3 px-6 text-left">{t.desc}</td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => {
                                    deleteTask(t).then((result) => {
                                        if(result) props.change()
                                    })
                                }}>
                                    <img src={del} alt="" className="w-10"/>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {task ? <UpdateTask change={props.change} task={task}></UpdateTask> : <></>}

        </div>
    );
}

export default ViewTaskOfCargo;
