import {getJobFromOffer} from "@renderer/Controller/GeneralControls/JobController";
import {JobDetail, JobOffers} from "@renderer/Controller/Interfaces/JobInterface";
import {useEffect, useState} from "react";
import action from '../../../../../../assets/ActionIcon.png'
import JobOfferDetail from "./JobOfferDetail";

interface I {
    offers : JobOffers[]
}

function JobOffersPages(props : I) {
    const offers = props.offers
    const [details, setDetails] = useState<JobDetail[]>([])
    const [offer, setOffer] = useState<JobOffers | null>(null)
    const [detail, setDetail] = useState<JobDetail | null>(null)
    useEffect(() => {
        getJobFromOffer(offers).then((job) => {
            setDetails(job)
        })
    }, [])

    return (
        <div>
            {(details.length != 0) ? <div>
                <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Department</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {offers.map((o, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left">{o.email}</td>
                                <td className="py-3 px-6 text-left">{details[index].title}</td>
                                <td className="py-3 px-6 text-left">{details[index].department}</td>
                                <td className="py-3 px-6 text-left">{(o.status)}</td>
                                <td className="py-3 px-6 text-left">
                                    <button onClick={() => {
                                        setDetail(details[index])
                                        setOffer(o)
                                    }}>
                                        <img src={action} alt="" className="w-10"/>
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> : <div></div>}
            {(offer && detail) ? <JobOfferDetail detail={detail} offer={offer}></JobOfferDetail> : <></>}
        </div>
    );
}

export default JobOffersPages;
