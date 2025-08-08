import {UserContext} from "@renderer/Components/Context/UserContext";
import {useContext} from "react";
import Fetching from "@renderer/LittleComponents/Fetching";
import VisaInformation from "./VisaInformation";
import PassportInformation from "./PassportInformation";

function VisaPassportInformation() {
    const passenger = useContext(UserContext)?.passenger
    console.log(passenger);
    return <div>
        {passenger ? (
            <div>
                <PassportInformation passenger={passenger}></PassportInformation>
                <VisaInformation passenger={passenger}></VisaInformation>
            </div>
        ) : (
            <div>
                <Fetching></Fetching>
            </div>
        )}
    </div>
}

export default VisaPassportInformation;
