import {Passenger} from "../Interfaces/PassengerInterface";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, passengerCollection} from '../FirebaseConfig/firebaseConfig';
import {addDoc, getDocs, query, where} from "firebase/firestore";

const getPassengerInformationByEmail = async (email : string) => {
    const docs = await getDocs(query(passengerCollection, where('email', '==', email)))
    return docs.docs[0].data() as Passenger
}

const getPassengerInformation = async (email : string) => {
    try {
        return await getPassengerInformationByEmail(email)
    }
    catch (e) {
        console.log(e)
    }
    return null
}

const getPassengerRef =async (email : string) => {
    const docs = await getDocs(query(passengerCollection, where('email', '==', email)))
    return docs.docs[0].ref
}

const validatePassengerInformation = (passenger : Passenger) => {
    // check if phone is all number
    let length = passenger.phoneNumber.length
    if (length < 10) return false
    for (let i = 0; i < length; i++) {
        if (isNaN(Number(passenger.phoneNumber[i]))) return false
    }

    return true
}

const registerPassenger = async (pass : Passenger, password : string) => {
    if (!validatePassengerInformation(pass)) {
        alert('invalid inputs')
        return false
    }

    try {
        await createUserWithEmailAndPassword(auth, pass.email, password)
        await addDoc(passengerCollection, pass)
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const getAllPassenger = async () => {
    const docs = await getDocs(passengerCollection)
    return docs.docs.map(doc => doc.data() as Passenger)
}


export { registerPassenger, getPassengerInformation, getPassengerRef, getAllPassenger }
