import {Passenger, Passport, Visa} from "../Interfaces/PassengerInterface";
import {createID} from "./IDController";
import {convertStringDateToTimeStamp} from "./DateControl";
import { addDoc, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import {passports, visas} from "../FirebaseConfig/firebaseConfig";
import {getPassengerRef} from "./PassengerController";

const validatePassportInput = (passport : Passport) => {
    if(passport.dateOfIssue > passport.dateOfExpire) {
        alert('date of expire cant be earlier than date of issue')
        return false
    }
    return true
}

const addPassportToPassenger = async (passenger : Passenger, id : string) => {
    
    passenger.passportID = id
    console.log(passenger);
    const docRef = await getPassengerRef(passenger.email)
    updateDoc(docRef, passenger as any)
}

const getPassportInformation = async (passenger : Passenger) => {
    const docs = await getDocs(query(passports, where('passportID', '==', passenger.passportID)))
    return docs.docs[0].data() as Passport
}
const getVisaInformation = async (passenger : Passenger) => {
    const docs = await getDocs(query(visas, where('visaID', '==', passenger.visaID)))
    return docs.docs[0].data() as Visa
}


const inputPassport = async (issue : string, expire : string, nationality: string, passenger : Passenger, placeOfBirth : string) => {
    console.log(expire);
    const passport: Passport = {
        passportID : 'passport-' + createID(),
        fullName : passenger.name,
        dob : passenger.dob,
        placeOfBirth : placeOfBirth,
        nationality : nationality,
        sex : passenger.sex,
        dateOfIssue : convertStringDateToTimeStamp(issue),
        dateOfExpire : convertStringDateToTimeStamp(expire)
    }
    if(!validatePassportInput(passport)) return false 
    try {
        await addDoc(passports, passport)
        await addPassportToPassenger(passenger, passport.passportID)
        return true
    } catch (error) {
        console.log(error); 
        return false
    }
}

const validateVisa = (visa : Visa) => {
    if(visa.dateOfIssue > visa.dateOfExpire) {
        alert('date of expire cant be earlier than date of issue')
        return false
    }

    return true
}


const inputVisa = async (issue : string, expire : string, passenger : Passenger) => {
    const passport = await getPassportInformation(passenger)
    const visa : Visa = {
        visaID : 'visa-' + createID(),
        fullName : passenger.name,
        dob : passenger.dob,
        nationality : passport.nationality,
        sex : passenger.sex,
        passportID : passport.passportID,
        dateOfIssue : convertStringDateToTimeStamp(issue),
        dateOfExpire : convertStringDateToTimeStamp(expire)
    }

    if(validateVisa(visa)) {
        const passengerRef = await getPassengerRef(passenger.email)
        await addDoc(visas, visa)
        passenger.visaID = visa.visaID
        await updateDoc(passengerRef, passenger as any)
        return true
    }
    return false
}

const getVisaRef = async (visaID : string) => {
    const docs = await getDocs(query(visas, where('visaID', '==', visaID)))
    return docs.docs[0].ref
}

const getPassportRef = async (passportID : string) => {
    const docs = await getDocs(query(passports, where('passportID', '==', passportID)))
    return docs.docs[0].ref
}

const resetVisaInformation = async (visa : Visa, passenger : Passenger) => {
    const passengerRef = await getPassengerRef(passenger.email)
    const visaRef = await getVisaRef(visa.visaID)
    try {
        passenger.visaID = null
        await updateDoc(passengerRef, passenger as any)
        await deleteDoc(visaRef)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const resetPassportInformation = async (passport : Passport, passenger : Passenger) => {
    const passengerRef = await getPassengerRef(passenger.email)
    const passportRef = await getPassportRef(passport.passportID)
    try {
        passenger.passportID = null
        await updateDoc(passengerRef, passenger as any)
        await deleteDoc(passportRef)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export { inputPassport, getPassportInformation, inputVisa, getVisaInformation, resetVisaInformation, resetPassportInformation}

