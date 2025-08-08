import {acceptJobOffer, rejectJobOffer} from "@renderer/Controller/GeneralControls/JobController";
import {JobDetail, JobOffers} from "@renderer/Controller/Interfaces/JobInterface";
import {useState} from "react";

interface I {
    offer : JobOffers,
    detail : JobDetail,

}



function JobOfferDetail(props : I) {
    const d = props.detail
    const o = props.offer
    const reject = () => {
        rejectJobOffer(o).then((result) => {
            if(result) window.location.reload()
        })
    }

    const accept = () => {
        acceptJobOffer(o).then((result) => {
            if(result) window.location.reload()
        })
    }
    return (
        <div className="flex flex-col gap-3">
            <div>
                <p className="text-lg font-bold">Job Detail</p>
                <p>Title : {d.title}</p>
                <p>Department : {d.department}</p>
                <p>Description : {d.description}</p>
                <p>Slot : {d.slot}</p>
            </div>
            <div>
                <p className="text-lg font-bold">Job Offer</p>
                <p>Email : {o.email}</p>
                <p>Name : {o.name}</p>
                <p>Phone Number : {o.phoneNumber}</p>
                <p>Description : {o.personalDescription}</p>
                <p>Status : {o.status}</p>
            </div>
            {(o.status === 'pending') ? 
                <div className="flex gap-3">
                    <button
                        className="border-none mt-2 bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:outline-none"
                        onClick={accept}
                    >
                        Accept
                    </button>
                    <button
                        className="border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                        onClick={reject}
                    >
                        Reject
                    </button>
                </div> : <></>
            }
            
        </div>
    );
}

export default JobOfferDetail;
