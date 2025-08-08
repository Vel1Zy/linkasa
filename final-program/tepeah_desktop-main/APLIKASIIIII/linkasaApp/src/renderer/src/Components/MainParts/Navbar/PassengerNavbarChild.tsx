import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";

function PassengerNavbarChild() {
    const passenger= useContext(UserContext)?.passenger;
    if(!passenger) return <></>
    return <div className={'flex gap-3'}>
        <a href="/passenger/give-feedback" className="text-sm no-underline text-black font-bold hover:underline">Give Feedback</a>
        <a href="/passenger/flights" className="text-sm no-underline text-black font-bold hover:underline">Flights</a>
        <a href="/passenger/visaAndPassport" className="text-sm no-underline text-black font-bold hover:underline">Visa and Passport</a>
    </div>
}

export default PassengerNavbarChild;
