import {reviseFinancialRequest} from "@renderer/Controller/GeneralControls/FinancialController";
import {FinancialRequest} from "@renderer/Controller/Interfaces/FinancialRequestInterface";
import {useState} from "react";

interface I {
    request : FinancialRequest,
    change : () => void
}
function ReviseFinancialRequest(props : I) {
    const request = props.request;
    const [info, setInfo] = useState('')
    
    const reviseHandle = () => {
        reviseFinancialRequest(request, info).then((result) => {
            if(result) props.change()
        })
    }

    return (
        <div className="my-3 w-1/2 flex flex-col gap-3">
            <textarea
                name=""
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Revising information"
                rows={4}
                onChange={(o) => setInfo(o.target.value)}
            ></textarea>  
            <button
                className="w-1/2 border-none  bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={reviseHandle}
            >
                Revise Financial Request 
            </button>
        </div>
    );
}

export default ReviseFinancialRequest;
