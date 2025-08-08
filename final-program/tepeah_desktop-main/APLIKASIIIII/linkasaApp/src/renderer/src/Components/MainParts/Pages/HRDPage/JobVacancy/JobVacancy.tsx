import { useEffect, useState} from "react";
import JobDetails from "./JobDetails";
import {JobDetail, JobOffers} from "@renderer/Controller/Interfaces/JobInterface";
import {getAllJobDetails, getAllJobOffer} from "@renderer/Controller/GeneralControls/JobController";
import JobOffersPages from "../JobOffers/JobOffersPages";

function JobVacancy() {
    const [jobDetails, setJobDetails] = useState<JobDetail[]>([])
    const [offers, setOffers] = useState<JobOffers[]>([])
    const [viewOffer, setViewOffer] = useState(false)

    useEffect(() => {
        getAllJobDetails().then((jobDetails) => {
            setJobDetails(jobDetails)
        })
    }, [])

    useEffect(() => {
        getAllJobOffer().then((offer) => {
            setOffers(offer)
        })
    }, [])

    return (
        <div className="px-20 py-5">
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={() => setViewOffer(!viewOffer)}
            >
                View Offers
            </button>
            {!viewOffer ? <JobDetails details={jobDetails}></JobDetails> : <JobOffersPages offers={offers}></JobOffersPages>}
        </div>
    );
}

export default JobVacancy;
