import {addDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {baggageCollection} from "../FirebaseConfig/firebaseConfig"
import {Baggage} from "../Interfaces/BaggageInterface"
import {Passenger} from "../Interfaces/PassengerInterface"
import {createID} from "./IDController"


const findPassengerBaggageInformation= async (email : string) => {
    const doc = await getDocs(query(baggageCollection, where('passengerID', '==', email)))
    return doc.docs[0].data() as Baggage
}

const findBaggageDetail = async (baggageID : string) => {
    const doc = await getDocs(query(baggageCollection, where('baggageID', '==', baggageID)))
    return doc.docs[0].data() as Baggage
}

const validateBaggageInformation = (baggage : Baggage) => {
    if(baggage.weight <= 0) return false
    else if(baggage.height <= 0) return false
    else if(baggage.length <= 0) return false
    else if(baggage.width <= 0) return false

    return true
}

const createBaggageInformation = async (flightID : string, passenger : Passenger, weight : number, width : number, length : number, height : number) => {
    const baggage : Baggage = {
        passengerID : passenger.email,
        flightID : flightID,
        baggageID : 'baggage-' + createID(),
        weight : weight,
        width : width,
        length : length,
        height : height,
        baggageClaimStatus : 'in transit',
        baggageSecurityStatus : 'in transit'
    }

    if(!validateBaggageInformation(baggage)) return false

    try {
        await addDoc(baggageCollection, baggage)
        return true
    } catch (error) {
        return false
    }
}

const findBaggageOfFlight = async (flightID : string) => {
    const docs = await getDocs(query(baggageCollection, where('flightID', '==', flightID)))
    const b : Baggage[] = []
    for(const d of docs.docs) {
        b.push(d.data() as Baggage)
    }

    return b;
}

const getBaggageRef = async (id : string) => {
    const doc = await getDocs(query(baggageCollection, where('baggageID', '==', id)))
    return doc.docs[0].ref
}

const updateClaimStatusBaggge = async (baggage : Baggage, status : string) => {
    baggage.baggageClaimStatus = status;
    const ref = await getBaggageRef(baggage.baggageID)
    if(ref) {
        await updateDoc(ref, baggage as any)
        return true
    }

    return false
}
const updateSecurityStatusBaggage = async (baggage : Baggage, status : string) => {
    baggage.baggageSecurityStatus = status;
    const ref = await getBaggageRef(baggage.baggageID)
    if(ref) {
        await updateDoc(ref, baggage as any)
        return true
    }

    return false
}



export { findPassengerBaggageInformation, createBaggageInformation, findBaggageOfFlight, findBaggageDetail, updateClaimStatusBaggge, updateSecurityStatusBaggage }
