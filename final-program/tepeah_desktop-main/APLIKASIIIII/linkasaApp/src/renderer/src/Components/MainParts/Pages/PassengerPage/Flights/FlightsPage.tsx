import {useEffect, useState, useContext } from "react";
import {Flight} from "../../../../../Controller/Interfaces/FlightInterface";
import {getFlightsForPassenger} from "../../../../../Controller/GeneralControls/FlightController";
import {UserContext} from "../../../../Context/UserContext";
import {faker} from "@faker-js/faker";

function FlightsPage() {
    // get flights not have been booked
    const [flights, setFlights] = useState<Flight[] | null>(null)
    const passenger = useContext(UserContext)?.passenger;

    useEffect(() => {
        if(passenger) getFlightsForPassenger(passenger).then((result) =>{
            setFlights(result)
            console.log(result);
        })
    }, [passenger]);

    return (
        <div className="flex flex-wrap gap-5 px-20 py-5">
            {flights?.map((flight, index) => (
                <div key={index} className="flex gap-5">
                    <div className="overflow-hidden flex justify-center items-center w-1/2">
                        <img className="w-full h-full object-cover" src={faker.image.url()} alt="" />
                    </div>
                    <div className="text-lg">
                        <p>Source : {flight.source.province}, {flight.source.country}</p>
                        <p>Destination: {flight.destination.province}, {flight.destination.country}</p>
                        <p>Duration : {flight.duration}</p>
                        <a className="text-blue-400 hover:underline" href={'/passenger/flight-detail/' + flight.flightID}>Details</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FlightsPage;
