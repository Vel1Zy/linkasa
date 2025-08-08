import {Timestamp} from "firebase/firestore";

interface Passport {
    passportID : string
    fullName : string,
    dob : Timestamp,
    placeOfBirth : string,
    nationality : string,
    sex : 'Female' | 'Male',
    dateOfIssue : Timestamp,
    dateOfExpire : Timestamp,
}

interface Visa {
    visaID : string,
    fullName : string,
    dob : Timestamp,
    nationality : string,
    sex : 'Female' | 'Male',
    passportID : string,
    dateOfIssue : Timestamp,
    dateOfExpire : Timestamp,
}

interface Passenger {
    passengerID : string,
    email : string,
    name : string,
    dob : Timestamp,
    password : string,
    phoneNumber : string,
    passportID : string | null,
    visaID : string | null,
    sex : 'Female' | 'Male'
}

export type { Passenger, Visa, Passport };
