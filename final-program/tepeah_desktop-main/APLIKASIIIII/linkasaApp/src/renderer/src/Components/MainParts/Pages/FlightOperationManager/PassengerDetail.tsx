import {getPassengerInformation} from "@renderer/Controller/GeneralControls/PassengerController";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

interface Props {
    flight : Flight
}

function PassengerDetail(p : Props) {
    const { email } = useParams()
    const [passenger, setPassenger] = useState<Passenger | null>(null)
    useEffect(() => {
        if(email) getPassengerInformation(email).then((result) => {
            setPassenger(result)
        })
    }, [])
    
    return (
        <div className="px-20 py-5">
            {passenger ? (
                <div className="text-xl">
                    <p className="font-bold">Passenger Data</p>
                    <p>Email : {passenger.email}</p>
                    <p>Full Name : {passenger.name}</p>
                    <p>Phone Number: {passenger.phoneNumber}</p>
                </div>
            ) : (
                <div>

                </div>
            )}
        </div>
    );
}

export default PassengerDetail;
