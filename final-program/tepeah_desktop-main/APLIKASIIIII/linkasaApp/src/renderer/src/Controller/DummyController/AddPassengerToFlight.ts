import { getDocs, updateDoc} from "firebase/firestore"
import {getFlightInfoByID, getFlightRef} from "../GeneralControls/FlightController"
import {passengerCollection} from "../FirebaseConfig/firebaseConfig"
import {Passenger} from "../Interfaces/PassengerInterface"
import {getPlaneInfo} from "../GeneralControls/PlaneController"

const addPassengerToFlight = async (id : string ) => {
    console.log(id);
    const flight = await getFlightInfoByID(id)
    console.log(flight);
    if(!flight) return
    const plane = await getPlaneInfo(flight.planeID)
    if(!plane) return
    const passengers = (await getDocs(passengerCollection)).docs

    if(flight?.passengerIDs){
        for(const doc of passengers) {
            if(flight.passengerIDs.length >= plane?.passengerLimit) break;
            const data = doc.data() as Passenger
            flight.passengerIDs.push(data.email)
        }
    }
    else {
        const ps : string[] = []
        for(const doc of passengers) {
            if(ps.length >= plane?.passengerLimit) break;
            const data = doc.data() as Passenger
            ps.push(data.email)
        }
        flight.passengerIDs = ps
    }
    const ref = await getFlightRef(flight)
    await updateDoc(ref, flight as any)
}

export { addPassengerToFlight}
