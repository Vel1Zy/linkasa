import {findPassengerBaggageInformation} from "@renderer/Controller/GeneralControls/BaggageController";
import {Baggage} from "@renderer/Controller/Interfaces/BaggageInterface";
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface";
import {useEffect, useState} from "react";
import CreateBaggageInformation from "./CreateBaggageInformation";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";

interface Props {
    passenger : Passenger ,
    flight : Flight 
}

function BaggageInformation(props : Props) {
    const passenger = props.passenger
    const [baggage, setBaggage] = useState<Baggage | null>(null)

    useEffect(() => {
        findPassengerBaggageInformation(passenger.email).then((result) => {
            setBaggage(result)
        })
    }, [])
    
    console.log(passenger);
    return (
        <div className="mt-5">
            <p className="text-xl font-bold">Baggage Information</p>
            {baggage ? (
                <div className="text-lg mt-5">
                    <p>Weight : {baggage.weight}</p>
                    <p>Length : {baggage.length}</p>
                    <p>Width: {baggage.width}</p>
                    <p>Height : {baggage.height}</p>
                </div>
            ) : (<CreateBaggageInformation flight={props.flight} passenger={passenger}></CreateBaggageInformation>)}
        </div>
    );
}

export default BaggageInformation;
