
import {getCargoHandler} from '@renderer/Controller/GeneralControls/CargoController';
import {updateTask} from '@renderer/Controller/GeneralControls/TaskController';
import {Employee} from '@renderer/Controller/Interfaces/EmployeeInterface';
import {Task} from '@renderer/Controller/Interfaces/TaskInterface';
import React, {useEffect, useState} from 'react';

interface I {
    task : Task
    change : () => void
}

function UpdateTask(props : I) {
    const task = props.task
    const [handler, setHandler] = useState('')
    const [taskName, setTaskName] = useState('')
    const [date, setDate] = useState('')
    const [handlers, setHandlers] = useState<Employee[]>([])

    const updateHandle = () => {
        updateTask(task, handler, date, taskName).then((result) =>{ 
            if(result) props.change()
        })
    }

    useEffect(() => {
        getCargoHandler().then((result) => {
            setHandlers(result)
        })
    }, [])

    return (
        <div>
            <p className='text-2xl font-bold tracking-wide'>Update Task</p>
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
                onChange={(o) => setTaskName(o.target.value)}
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
                    onClick={updateHandle}
                >
                    Update Task
            </button>
        </div>
    );
}

export default UpdateTask;
