import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface";

interface Props {
    passenger : Passenger,
    flight  : Flight,
    seat : number
}

function BoardingPassInformation(props : Props) {
    const passenger = props.passenger
    const flight = props.flight
    const seat = props.seat
    return (
        <div className="text-lg mt-5">
            <p className="text-xl font-bold">Boarding Pass Information</p>
            <p>Passenger ID : {passenger.email}</p>
            <p>Passenger Name : {passenger.name}</p>
            <p>Flight Number : {flight.flightID}</p>
            <p>Source : {flight.source.province}, {flight.source.country}</p>
            <p>Destination : {flight.destination.province}, {flight.destination.country}</p>
            <p>Flight Date : {utc(flight.boardingTime.seconds)}</p>
            <p>Flight Time : {flight.duration}</p>
            <p>Seat Number : {seat}</p>
        </div>
    );
}

export default BoardingPassInformation;
