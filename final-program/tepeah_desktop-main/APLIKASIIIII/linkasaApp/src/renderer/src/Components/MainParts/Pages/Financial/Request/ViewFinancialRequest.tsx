import {UserContext} from "@renderer/Components/Context/UserContext";
import {allFinancialRequest, fetchFinancialRequest} from "@renderer/Controller/GeneralControls/FinancialController";
import {FinancialRequest} from "@renderer/Controller/Interfaces/FinancialRequestInterface";
import {useContext, useEffect, useState} from "react";

interface I {
    c : number
}

function ViewFinancialRequest(i : I) {
    const user = useContext(UserContext)?.currentUser
    const [requests, setRequests] = useState<FinancialRequest[]>([])

    useEffect(() => {
        let department : string = ''
        if(!user) return
        else if(user.role === 'CivilEngineeringManager') {
            department = 'Construction'
        }

        fetchFinancialRequest(department).then((result) => {
            setRequests(result)
            console.log(requests);
        })
    }, [user, i.c])
    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Spending</th>
                            <th className="py-3 px-6 text-left">Purpose</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {requests.map((request, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{request.spending}</td>
                            <td className="py-3 px-6 text-left">{request.purpose}</td>
                            <td className="py-3 px-6 text-left font-bold">{request.status}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewFinancialRequest;
