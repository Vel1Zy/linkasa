import {Passenger, Passport} from "@renderer/Controller/Interfaces/PassengerInterface";
import PassportForm from "./PassportForm";
import {useContext, useEffect, useState} from "react";
import {getPassportInformation, resetPassportInformation} from "@renderer/Controller/GeneralControls/VisaPassportController";
import {convertTimeStampToDate, utc} from "@renderer/Controller/GeneralControls/DateControl";
import {UserContext} from "@renderer/Components/Context/UserContext";
import {onSnapshot} from "firebase/firestore";

interface Props { 
    passenger : Passenger
}


function PassportInformation(props : Props) {
    const passenger = props.passenger
    const [changed, setChanged] = useState(0)
    const [passport, setPassport] = useState<Passport | null>(null)
    const user = useContext(UserContext)?.currentUser

    useEffect(() => {
        getPassportInformation(passenger).then((result) => {
            setPassport(result)        
        })        
    }, [changed])

    const handleChange = () => {
        setChanged(changed + 1)
    }

    const resetPassport = () => {
        if(passport) resetPassportInformation(passport, passenger).then((result) => {
            if (result) {
                // window.location.reload()    
                handleChange()
            }
        })
    }
    
    return (
        <div className="">
            <div className="text-xl font-bold">
                <h1>Passport</h1>
            </div>
            {(passenger.passportID && passport) ? (
                <div>
                    <p>Date of issue: {utc(passport.dateOfIssue.seconds)}</p>
                    <p>Date of expire : {convertTimeStampToDate(passport?.dateOfExpire.seconds).toUTCString()}</p>
                    <p>Nationality : {passport.nationality}</p>
                    <p>Place of birth : {passport.placeOfBirth}</p>
                    <button
                        className="border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                        onClick={resetPassport}
                    >
                        Reset Visa Information
                    </button>
                </div>
            ) : (
                <div>
                    {(user && user.role == 'CustomsAndBorderControlOfficer') ?
                        <div>
                            <PassportForm handleChange={handleChange} passenger={passenger}></PassportForm>
                        </div> : <div>You are not allowed to input passport and</div>
                    }
                </div>
            )}
        </div>
    );
}

export default PassportInformation;
