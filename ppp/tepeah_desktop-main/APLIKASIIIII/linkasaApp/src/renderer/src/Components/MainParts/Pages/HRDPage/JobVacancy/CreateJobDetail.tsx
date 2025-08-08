import {createJobDetail} from "@renderer/Controller/GeneralControls/JobController";
import {Department, employeeRoles} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {useState} from "react";

function CreateJobDetail() {
    const [title, setTitle] = useState('')
    const [department, setDeparment] = useState('')
    const [description, setDescription] = useState('')
    const [slot, setSlot] = useState(0)

    const createHandle = () => {
        createJobDetail(title, department, description, slot).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-3 mt-3">
            <p className="text-xl font-bold">Create Job Detail</p>
            <select
                name="date"
                className="w-1/2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder=""
                onChange={(o) => setDeparment(o.target.value)}
            >
                <option value="">Department</option>
                {Department.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                ))}
            </select>
            <select
                name="date"
                className="w-1/2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder=""
                onChange={(o) => setTitle(o.target.value)}
            >
                <option value="">Title</option>
                {employeeRoles.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                ))}
            </select>
            <textarea
                name="date"
                className="w-1/2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Job Description"
                rows={4}
                onChange={(o) => setDescription(o.target.value)}
            ></textarea>
            <input
                className="w-1/2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Slot"
                type="number"
                onChange={(o) => setSlot(parseInt(o.target.value))}
            ></input>
            <button
                className="w-1/2 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={createHandle}
            >
                Create Job Detail
            </button>
        </div>
    );
}

export default CreateJobDetail;
