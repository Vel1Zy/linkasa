import {Link} from "react-router-dom";
import {Passenger} from "../../../../Controller/Interfaces/PassengerInterface";
import {useState} from "react";
import {registerPassenger} from "../../../../Controller/GeneralControls/PassengerController";

const initial : Passenger = {
    passengerID : '',
    email : '',
    name : '',
    phoneNumber : '',
    passportID : null,
    visaID : null
}

function RegisterPage() {
    const [passenger, setPassenger] = useState(initial)
    const [password, setPassword] = useState('')
    const clickHandle = () => {
        registerPassenger(passenger, password).then((result) => {
            if (result) window.location.reload()
        })
    }

    return <div className="flex flex-col gap-5 justify-center items-center my-10">
        <div className="flex flex-col justify-center items-center">
            <h1 className="my-1 text-xl">Register</h1>
        </div>
        <input onChange={(event) => setPassenger({...passenger, [event.target.name] : event.target.value})} type="text" autoFocus name="email" id="" placeholder="Email" className="rounded-md p-2 w-1/2 text-lg"/>
        <input onChange={(event) => setPassenger({...passenger, [event.target.name] : event.target.value})} type="text" autoFocus name="name" id="" placeholder="Full Name" className="rounded-md p-2 w-1/2 text-lg"/>
        <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="" placeholder="Password" className="rounded-md p-2 w-1/2 text-lg"/>
        <input onChange={(event) => setPassenger({...passenger, [event.target.name] : event.target.value})} type="text" name="phoneNumber" id="" placeholder="Phone Number" className="rounded-md p-2 w-1/2 text-lg"/>
        <button onClick={clickHandle} type="submit" className="w-1/5 bg-gray-900 text-white border-none rounded-lg p-3 text-xl">Register</button>
        <Link to={'/login'} className="no-underline hover:opacity-100 opacity-60 text-black text-large hover:font-extrabold">Login</Link>
        <a href="/employee-login" className="no-underline hover:opacity-100 opacity-60 text-black text-large hover:font-extrabold">Login as Employee</a>
    </div>
}

export default RegisterPage;
