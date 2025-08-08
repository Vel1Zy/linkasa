import {JobDetail} from "@renderer/Controller/Interfaces/JobInterface";
import CreateJobDetail from "./CreateJobDetail";
import {useState} from "react";
import UpdateJobDetail from "./UpdateJobDetail";

interface I {
    details : JobDetail[]
}

function JobDetails(props : I) {
    const details = props.details
    const [creating, setCreating] = useState(true)
    const [detail, setDetail] = useState<JobDetail | null>(null)
    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Department</th>
                            <th className="py-3 px-6 text-left">Slots</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {details.map((jobDetail, index) => (
                        <tr
                            onClick={() => setDetail(jobDetail)}
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{jobDetail.title}</td>
                            <td className="py-3 px-6 text-left">{jobDetail.department}</td>
                            <td className="py-3 px-6 text-left">{jobDetail.slot}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                className="w-1/6 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={() => setCreating(!creating)}
            >
                Create
            </button>
            {creating ? <CreateJobDetail></CreateJobDetail> : <>
                {detail ? <UpdateJobDetail detail={detail}></UpdateJobDetail> : <div></div>}
            </>}
        </div>
    );
}

export default JobDetails;
