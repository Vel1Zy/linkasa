import {allFinancialRequest, fetchPendingFinancialRequest} from "@renderer/Controller/GeneralControls/FinancialController";
import {FinancialRequest} from "@renderer/Controller/Interfaces/FinancialRequestInterface";
import {useEffect, useState} from "react";
import ManageFinancialRequestDetail from "./ManageFinancialRequestDetail";

interface I {
    c : number,
    change : () => void
}

function ViewManageFinancialRequest(i : I) {
    const [rs, setrs] = useState<FinancialRequest[]>([])
    const [request, setrequest] = useState<FinancialRequest>()

    useEffect(() => {
        fetchPendingFinancialRequest().then((result) => {setrs(result)})        
    }, [i.c])

    return (
        <div>
            <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Spending</th>
                            <th className="py-3 px-6 text-left">Purpose</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Department</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {rs.map((request, index) => (
                        <tr
                            onClick={() => setrequest(request)}
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{request.spending}</td>
                            <td className="py-3 px-6 text-left">{request.purpose}</td>
                            <td className="py-3 px-6 text-left font-bold">{request.status}</td>
                            <td className="py-3 px-6 text-left font-bold">{request.department}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>        
        {request ? <ManageFinancialRequestDetail change={i.change} request={request}></ManageFinancialRequestDetail> : <div>Choose a financial request</div>}
        </div>
    );
}

export default ViewManageFinancialRequest;
