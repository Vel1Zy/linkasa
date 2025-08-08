import {findBaggageDetail, findPassengerBaggageInformation} from "@renderer/Controller/GeneralControls/BaggageController";
import {Baggage} from "@renderer/Controller/Interfaces/BaggageInterface";
import Fetching from "@renderer/LittleComponents/Fetching";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UpdateBaggageInformation from "./UpdateBaggageInformation";


function BagggeDetail() {
    const { baggageID } = useParams();
    const [b, setB] = useState<Baggage | null>(null)

    useEffect(() => {
        if(baggageID) findBaggageDetail(baggageID).then((result) => {
            setB(result)
        })
    }, [])
    
    return (
        <div className="px-20 py-5">
            {b ? <div>
                <p>Flight ID : {b.flightID}</p>
                <p>Width : {b.width}</p>
                <p>Height : {b.height}</p>
                <p>Weight: {b.weight}</p>
                <p>Lenght: {b.length}</p>
                <p className="text-xl font-bold">Claim Status : {b.baggageClaimStatus}</p>
                <p className="text-xl font-bold">Security Status : {b.baggageSecurityStatus}</p>
                <UpdateBaggageInformation baggage={b}></UpdateBaggageInformation>
            </div> : <div><Fetching></Fetching></div>}
        </div>
    );
}

export default BagggeDetail;
