import {UserContext} from "@renderer/Components/Context/UserContext";
import {createBaggageInformation} from "@renderer/Controller/GeneralControls/BaggageController";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface";
import {useContext, useState} from "react";

interface Props {
    passenger : Passenger,
    flight : Flight
}

function CreateBaggageInformation(props : Props) {
    const passenger = props.passenger
    const user = useContext(UserContext)?.currentUser

    const [weight, setWeight] = useState(0)
    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const c = () => {
        createBaggageInformation(props.flight.flightID, passenger, weight, width, length, height).then((result) => {
            if(result) window.location.reload()
            else alert('information is not enough')
        })
    }

    return (
        <div className="flex flex-col gap-3 mt-5">
            {user?.role === 'CheckInStaff' ? <div>
                <input onChange={(o) => setWeight(parseInt(o.target.value))} type="number" name="dob" id="" placeholder="Weight" className="rounded-md p-2 w-1/2 text-lg"/>
                <input onChange={(o) => setLength(parseInt(o.target.value))} type="number" name="dob" id="" placeholder="Length" className="rounded-md p-2 w-1/2 text-lg"/>
                <input onChange={(o) => setWidth(parseInt(o.target.value))} type="number" name="dob" id="" placeholder="Width" className="rounded-md p-2 w-1/2 text-lg"/>
                <input onChange={(o) => setHeight(parseInt(o.target.value))} type="number" name="dob" id="" placeholder="Height" className="rounded-md p-2 w-1/2 text-lg"/>
                <button onClick={c} className="p-2 rounded-lg bg-blue-500 text-white font-bold w-1/2">Input Baggage</button>
            </div> : <div></div>}
            
        </div>
    );
}

export default CreateBaggageInformation;
