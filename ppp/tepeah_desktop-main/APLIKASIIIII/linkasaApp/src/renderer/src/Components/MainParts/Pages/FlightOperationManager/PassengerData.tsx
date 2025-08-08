import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {Passenger} from "@renderer/Controller/Interfaces/PassengerInterface";
import PassportInformation from "../PassengerPage/VisaAndPassport/PassportInformation";
import VisaInformation from "../PassengerPage/VisaAndPassport/VisaInformation";

interface Props {
    passenger : Passenger
}

function PassengerData(props : Props) {
    const passenger = props.passenger;

    return (
        <div className="text-lg flex gap-4 flex-col">
            <div>
                <p className="font-bold">Passsenger Detail</p>
                <p>Name : {passenger.name}</p>
                <p>Email : {passenger.email}</p>
                <p>Phone Number : {passenger.phoneNumber}</p>
                <p>Gender : {passenger.sex}</p>
                <p>Date Of Birth : {utc(passenger.dob.seconds)}</p>
            </div>
            
            <PassportInformation passenger={passenger}></PassportInformation>
            <VisaInformation passenger={passenger}></VisaInformation>
        </div>
    );
}

export default PassengerData;
