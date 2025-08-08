import {deleteJobDetail, updateJobDetail} from "@renderer/Controller/GeneralControls/JobController";
import {Department, employeeRoles} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {JobDetail} from "@renderer/Controller/Interfaces/JobInterface";
import {useState} from "react";

interface I {
    detail : JobDetail
}
function UpdateJobDetail(props : I) {
    const detail = props.detail
    const [title, setTitle] = useState('')
    const [department, setDeparment] = useState('')
    const [description, setDescription] = useState('')
    const [slot, setSlot] = useState(0)

    const updateHandle = () => {
        updateJobDetail(detail, title, department, description, slot).then((result) => {
            if(result) window.location.reload()
        })
    }

    const deleteHandle = () => {
        deleteJobDetail(detail.jobID).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="mt-3 flex flex-col gap-3">
            <div>
                <p>Title : {detail.title}</p>
                <p>Department : {detail.department}</p>
                <p>description : {detail.description}</p>
                <p>slot : {detail.slot}</p>
            </div>
            <p className="text-xl font-bold">Update Job Detail</p>
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
            <div className="flex w-1/2 gap-3">
                <button
                    className="w-1/2 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={updateHandle}
                >
                    Update Job Detail
                </button>
                <button
                    className="w-1/2 border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                    onClick={deleteHandle}
                >
                    Delete Job Detail
                </button>

            </div>
            
        </div>
    );
}

export default UpdateJobDetail;
