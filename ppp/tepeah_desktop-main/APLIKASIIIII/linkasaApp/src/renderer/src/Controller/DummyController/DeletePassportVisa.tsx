import {updateDoc} from "firebase/firestore"
import {getAllPassenger, getPassengerInformation, getPassengerRef} from "../GeneralControls/PassengerController"

const deletePassportVisa = async () => {
    const passengers = await getAllPassenger()
    for(const p of passengers) {
        p.passportID = null
        p.visaID = null
        const ref = await getPassengerRef(p.email)
        if(!ref) return false
        await updateDoc(ref, p as any)
    }    
    return true
}


export { deletePassportVisa }
