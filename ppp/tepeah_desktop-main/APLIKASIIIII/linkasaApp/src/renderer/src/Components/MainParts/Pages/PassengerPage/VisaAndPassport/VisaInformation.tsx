import {Passenger, Visa} from "@renderer/Controller/Interfaces/PassengerInterface";
import VisaForm from "./VisaForm";
import {useContext, useEffect, useState} from "react";
import {getVisaInformation, resetVisaInformation} from "@renderer/Controller/GeneralControls/VisaPassportController";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {UserContext} from "@renderer/Components/Context/UserContext";

interface Props { 
    passenger : Passenger,
}


function VisaInformation(props : Props) {
    const passenger = props.passenger
    const [visa, setVisa] = useState<Visa | null>(null)
    const user = useContext(UserContext)?.currentUser
    const [changed, setChanged] = useState(0)

    useEffect(() => {
        getVisaInformation(passenger).then((result) => {
            setVisa(result)
        })
    }, [changed])

    const handleChange = () => {
        setChanged(changed + 1)
    }
    
    const resetVisa = () => {
        if(visa) resetVisaInformation(visa, passenger).then((result) => {
            if(result) handleChange()
        })
    }
    
    return (
        <div>
            {(passenger.visaID && visa) ? (
                <div className="">
                    <h1 className="text-lg font-bold">Visa</h1>
                    <p>Date of issue : {utc(visa?.dateOfIssue.seconds)}</p>
                    <p>Date of expire: {utc(visa?.dateOfExpire.seconds)}</p>
                    <button
                        className="border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                        onClick={resetVisa}
                    >
                        Reset Visa Information
                    </button>
                </div>
                
            ) : (
                <div>
                    {passenger.passportID ? (
                        <div>
                            {(user && user.role == 'CustomsAndBorderControlOfficer') ?
                                <div>
                                    <VisaForm handleChange={handleChange} passenger={passenger}></VisaForm>
                                </div> : <div>You are not allowed to input passport and</div>
                            }
                        </div>
                    ) : (
                        <h1>you must first input passport information</h1>
                    )}
                </div>
            )}        
        </div>
    );
}

export default VisaInformation;
