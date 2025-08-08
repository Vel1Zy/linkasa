import {UserContext} from "@renderer/Components/Context/UserContext";
import {updateClaimStatusBaggge, updateSecurityStatusBaggage} from "@renderer/Controller/GeneralControls/BaggageController";
import {Baggage, baggageClaimStatus, baggageSecurityStatus} from "@renderer/Controller/Interfaces/BaggageInterface";
import {useContext, useState} from "react";

interface Props {
    baggage : Baggage
}

function UpdateBaggageInformation(props : Props) {
    const user = useContext(UserContext)?.currentUser
    const [claim, setClaim] = useState('')

    const updateClaim = () => {
        updateClaimStatusBaggge(props.baggage, claim).then((result) => {
            if(result) window.location.reload()
        })
    }

    const updateSecurity = () => {
        updateSecurityStatusBaggage(props.baggage, claim).then((result) => {
            if(result) window.location.reload()
        })
    }

    if(user) return (
        <div className="mt-5">
            {user?.role == 'GroundHandlingManager' ? (<div>
                <p className="text-lg">Update Claim Status</p>
                <div className="flex gap-4">
                    <select onChange={(o) => setClaim(o.target.value)} className="p-3 rounded-lg" name="" id="">
                        <option value={''}>Pick Claim Status</option>
                        {baggageClaimStatus.map((status) => (
                            <option value={status}>{status}</option>
                        ))}
                    </select>
                <button onClick={updateClaim} className="p-3 bg-blue-500 rounded-lg">Update</button>
                </div>
            </div>) :(<div></div>)}
            {(user?.role == 'BaggageSecurityStaff' || user.role == 'BaggageSecuritySupervisor') ? (<div>
                <p className="text-lg">Update Security Status</p>
                <div className="flex gap-4">
                    <select onChange={(o) => setClaim(o.target.value)} className="p-3 rounded-lg" name="" id="">
                        <option value={''}>Pick Security Status</option>
                        {baggageSecurityStatus.map((status) => (
                            <option value={status}>{status}</option>
                        ))}
                    </select>
                <button onClick={updateSecurity} className="p-3 bg-blue-500 rounded-lg">Update</button>
                </div>
            </div>) :(<div></div>)}
        </div>
    );

    return <></>
}

export default UpdateBaggageInformation;
