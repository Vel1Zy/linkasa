import {inputVisa} from "@renderer/Controller/GeneralControls/VisaPassportController"
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface"
import {useState} from "react"

interface P { 
    passenger : Passenger
    handleChange : () => void
}

function VisaForm(p : P) {
    const [expire, setExpire] = useState('')
    const [issue, setIssue] = useState('')
    const clickHandle = () => {
        inputVisa(issue, expire, p.passenger).then((result) => {
            if(result) p.handleChange()
        })
    }
    return <div className={'px-20 py-5 flex items-center justify-center'}>
        <div className="bg-white p-8 rounded shadow-md w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Input Visa Information</h2>
            <div className="mb-4">
                    <label htmlFor="dateInput" className="block text-sm font-bold text-gray-600">Date Of Issue</label>
                    <input onChange={(o) => setIssue(o.target.value)} type="date" id="dateInput" name="dateInput" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div className="mb-4">
                    <label htmlFor="dateInput" className="block text-sm font-bold text-gray-600">Date of expire</label>
                    <input onChange={(o) => setExpire(o.target.value)} type="date" id="dateInput" name="dateInput" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <button onClick={clickHandle} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </div>
    </div>
}

export default VisaForm;
