import {faker} from "@faker-js/faker";
import {UserContext} from "@renderer/Components/Context/UserContext";
import {addPassengerToFlight, getFlightInfoByID, validatePassenger} from "@renderer/Controller/GeneralControls/FlightController";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function FlightDetailPagePassenger() {
    const {flightID} = useParams()
    const [flight, setFlight] = useState<Flight | null>(null)
    const passenger = useContext(UserContext)?.passenger
    const [isBooked, setIsBooked] = useState(false)

    useEffect(() => {
        if(flightID) getFlightInfoByID(flightID).then((result) => {
            setFlight(result)
            if(passenger && flight) setIsBooked(validatePassenger(passenger, flight))
        })
    }, [])  

    const clickHandle = () => {
        if(passenger && flight) addPassengerToFlight(passenger, flight).then((result) => {
            if(result) {
                alert('success')
                window.location.reload()
            }
        })
    }

    return (
        <div>
            {flight ? (
                <div className="p-4 flex gap-5">
                    <div>
                        <img src={faker.image.url()} alt="" />
                    </div>
                    <div className="text-xl">
                        <p>source : {flight?.source.province}, {flight?.source.country}</p>
                        <p>destination : {flight?.destination.province}, {flight?.destination.country}</p>
                        <div>Boarding Time : { flight?.boardingTime.toDate().toLocaleDateString() }</div>
                        <p>Duration : {flight?.duration}</p>
                        {!isBooked ? (
                            <button onClick={clickHandle} className="p-3 bg-blue-500 rounded-lg text-white">Get ticket</button>
                        ) : (
                            <div>
                                You bought the ticket
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-green-500">
                    Fetching....
                </div>
            )}
        </div>
    );
}

export default FlightDetailPagePassenger;
