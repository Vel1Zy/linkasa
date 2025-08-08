import {UserContext} from "@renderer/Components/Context/UserContext";
import {createFinancialRequest} from "@renderer/Controller/GeneralControls/FinancialController";
import {useContext, useState} from "react";

interface I {
    c : () => void
}

function CreateFinancialRequest(i : I) {
    const user = useContext(UserContext)?.currentUser

    const [spending, setSpending] = useState(0)
    const [purpose, setPurpose] = useState('')

    const createHandle = () => {
        let department : string = ''
        if(!user) return
        else if(user.role === 'CivilEngineeringManager') department = 'Construction'
        createFinancialRequest(user.companyEmail ,spending, purpose, department).then((result) => {
            console.log(result);
            setPurpose('')
            setSpending(0)
            i.c()
        })
    }

    return (
        <div className="flex flex-col gap-3 w-1/2">
            <p className="font-bold tracking-wide text-lg">Create Financial Request</p>
            <textarea
                name="date"
                value={purpose}
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="What is the purpose of the financial spend"
                rows={4}
                onChange={(o) => setPurpose(o.target.value)}
            ></textarea>           
            <input
                value={spending}
                name=""
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Amount"
                type="number"
                onChange={(o) => setSpending(parseInt(o.target.value))}
            ></input>  
            <button
                className="border-none  bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={createHandle}
            >
                Create Financial Request 
            </button>
        </div>
    );

}

export default CreateFinancialRequest;
