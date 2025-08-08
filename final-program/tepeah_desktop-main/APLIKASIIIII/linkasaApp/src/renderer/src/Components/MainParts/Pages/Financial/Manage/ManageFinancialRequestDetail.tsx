import {FinancialRequest} from "@renderer/Controller/Interfaces/FinancialRequestInterface";
import {useState} from "react";
import ReviseFinancialRequest from "./ReviseFinancialRequest";
import {acceptFinancialRequest, rejectFinancialRequest} from "@renderer/Controller/GeneralControls/FinancialController";

interface I {
    request : FinancialRequest
    change : () => void
}

function ManageFinancialRequestDetail(props : I) {
    const request = props.request
    const [revising, setRevising] = useState(false)


    const acceptHandle = () => {
        acceptFinancialRequest(request).then((result) => {
            if(result) props.change()
        })    
    }
    
    const rejectHandle = () => {
        rejectFinancialRequest(request).then((result) => {
            if(result) props.change()
        })
    }
    return (
        <div className="flex flex-col">
            <p className="text-lg">Department : {request.department}</p>
            <p className="text-lg">Spending : {request.spending}</p>
            <p className="text-lg">Status : {request.status}</p>
            <p className="text-lg">Purpose : {request.purpose}</p>

            {revising ? <ReviseFinancialRequest change={props.change} request={request}></ReviseFinancialRequest> : <></>}

            <div className="flex gap-3">
                <button
                    className="border-none mt-2 bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:outline-none"
                    onClick={acceptHandle}
                >
                    Accept
                </button>
                <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={() => setRevising(!revising)}
                >
                    Revise 
                </button>
                <button
                    className="border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                    onClick={rejectHandle}
                >
                    Reject
                </button>
            </div>
        </div>
    );
}

export default ManageFinancialRequestDetail;
