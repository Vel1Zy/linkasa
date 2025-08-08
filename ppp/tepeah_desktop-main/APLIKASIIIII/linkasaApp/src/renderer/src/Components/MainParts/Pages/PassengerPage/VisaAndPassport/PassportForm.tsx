import {inputPassport} from "@renderer/Controller/GeneralControls/VisaPassportController";
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface";
import {countries} from "@renderer/LittleComponents/ListOfCountries";
import {nationalities} from "@renderer/LittleComponents/ListOfNationalities";
import {useState} from "react";

interface P {
    passenger : Passenger,
    handleChange : () => void
}

function PassportForm(p : P) {
    const [expire, setExpire] = useState('')
    const [issue, setIssue] = useState('')
    const [nationality, setNationality] = useState('')
    const [birth, setBirth] = useState('')

    const clickHandle = () => {
        inputPassport(issue, expire, nationality, p.passenger, birth).then((result) => {
            if(result) {
                // window.location.reload()
                p.handleChange()
            }
        })
    }

    return <div className={'px-20 py-5 flex items-center justify-center'}>
        <div className="bg-white p-8 rounded shadow-md w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Input Passport Information</h2>
            <div className="mb-4">
                <label htmlFor="dateInput" className="block text-sm font-bold text-gray-600">Date Of Issue</label>
                <input onChange={(o) => setIssue(o.target.value)} type="date" id="dateInput" name="dateInput" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div className="mb-4">
                <label htmlFor="dateInput" className="block text-sm font-bold text-gray-600">Date Of Expire</label>
                <input onChange={(o) => setExpire(o.target.value)} type="date" id="dateInput" name="dateInput" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div className="mb-4">
                <label htmlFor="dateInput" className="block text-sm font-bold text-gray-600">Nationality</label>
                <select onChange={(o) => setNationality(o.target.value)} name="dateInput" className="mt-1 p-2 w-full border rounded-md">
                    <option value="">Select Nationality</option>
                    {nationalities.map((n, index) => (
                        <option value={n} key={index}>{n}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="dateInput" className="block text-sm font-bold text-gray-600">Place of birth</label>
                <select onChange={(o) => setBirth(o.target.value)} name="dateInput" className="mt-1 p-2 w-full border rounded-md">
                    <option value="">Select country</option>
                    {countries.map((country, index) => (
                        <option value={country.name} key={index}>{country.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={clickHandle} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </div>
    </div>
}

export default PassportForm;
