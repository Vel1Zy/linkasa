import {getAllJobDetails} from "@renderer/Controller/GeneralControls/JobController";
import {JobDetail} from "@renderer/Controller/Interfaces/JobInterface";
import {useEffect, useState} from "react";
import action from '../../../../../../assets/ActionIcon.png'
import {Link} from "react-router-dom";

function CreateJobOffers() {
    const [details, setDetails] = useState<JobDetail[]>([])
    
    useEffect(() => {
        getAllJobDetails().then((details) => {
            setDetails(details)
        })
    }, [])
    
    
    return (
        <div className="px-20 py-5">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Department</th>
                            <th className="py-3 px-6 text-left">Slots</th>
                            <th className="py-3 px-6 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {details.map((jobDetail, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{jobDetail.title}</td>
                            <td className="py-3 px-6 text-left">{jobDetail.department}</td>
                            <td className="py-3 px-6 text-left">{jobDetail.slot}</td>
                            <td className="py-3 px-6 text-left">
                                <Link to={"/public/jobs/detail/" + jobDetail.jobID}>
                                    <img src={action} alt="" className="w-10"/>
                                </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CreateJobOffers;
