import {findBaggageOfFlight} from "@renderer/Controller/GeneralControls/BaggageController";
import {Baggage} from "@renderer/Controller/Interfaces/BaggageInterface";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import action from '../../../../../../assets/ActionIcon.png'

function ViewAllBaggageInformationOfFlight() {
    const { flightID } = useParams()
    const [baggage, setBaggage] = useState<Baggage[]>([])

    useEffect(() => {
        if(flightID) findBaggageOfFlight(flightID).then((result) => {
            setBaggage(result)
        })
    }, [])

    return (
        <div className="px-20 py-5">
            <h1 className="text-xl font-bold">Flight ID : {flightID}</h1>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Passenger Email</th>
                            <th className="py-3 px-6 text-left">Claim Status</th>
                            <th className="py-3 px-6 text-left">Security Status</th>
                            <th className="py-3 px-6 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {baggage.map((b, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {/*// @ts-ignore*/}
                            <td className="py-3 px-6 text-left">{b.passengerID}</td>
                            <td className="py-3 px-6 text-left">{b.baggageClaimStatus}</td>
                            <td className="py-3 px-6 text-left">{b.baggageSecurityStatus}</td>
                            <td className="py-3 px-6 text-left">
                                <a href={'/baggage-detail/' + b.baggageID}>
                                    <img className="w-10" src={action} alt="" />
                                </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewAllBaggageInformationOfFlight;
