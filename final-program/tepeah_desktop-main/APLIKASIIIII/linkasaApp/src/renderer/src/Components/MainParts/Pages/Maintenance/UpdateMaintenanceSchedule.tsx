import {updateMaintenanceSchedule} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {Maintenance, equipmentTypes, items} from "@renderer/Controller/Interfaces/MaintenanceInterface";
import {useState} from "react";

interface Props {
    maintenance : Maintenance
}

function UpdateMaintenanceSchedule(input : Props) {
    const maintenance = input.maintenance
    const [type, setType] = useState('')
    const [days, setDays] = useState(0)
    const [desc, setDesc] = useState('')
    const [item, setItem] = useState('')
    const [date, setDate] = useState('')

    const clickHandle = () => {
        updateMaintenanceSchedule(maintenance ,type, days, desc, item, date).then((result) => {
            console.log(result);
            if(result) window.location.reload()
        })
    }
    return (
        <div>
            <div className="mt-2 w-1/2 p-0 flex gap-2 flex-col">
                <textarea
                    onChange={(o) => setDesc(o.target.value)}
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    name="task"
                    placeholder="what is the maintenance for?"
                    rows={4}
                ></textarea>
                <input
                    onChange={(o) => setDays(parseInt(o.target.value))}
                    type="number"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    name="task"
                    placeholder="estimated days"
                ></input>
                <select
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    name="task"
                    placeholder="Create New Schedule"
                    onChange={(o) => setType(o.target.value)}
                >
                    <option value="">Select Equipment Type</option>
                    {equipmentTypes.map((e, i) => (
                        <option value={e} key={i}>{e}</option>
                    ))}
                </select>
                <select
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    name="task"
                    placeholder="Create New Schedule"
                    onChange={(o) => setItem(o.target.value)}
                >
                    <option value="">Select Item</option>
                    {items.map((i, k) => (
                        <option value={i} key={k}>{i}</option>
                    ))}
                </select>
                <input
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Create New Schedule"
                    type="date"
                    onChange={(o) => setDate(o.target.value)}
                ></input>
                <button
                    onClick={clickHandle}
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                >
                    Update Maintenance Schedule
                </button>
            </div>
        </div>
    )
}

export default UpdateMaintenanceSchedule;
