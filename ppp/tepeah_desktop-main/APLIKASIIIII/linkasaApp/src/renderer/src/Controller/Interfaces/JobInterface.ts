import {Timestamp} from "firebase/firestore"

interface JobDetail {
    jobID : string,
    title : string,
    department : string,
    description : string,
    slot : number 
}

interface JobOffers {
    offerID : string,
    jobID : string,
    email : string, 
    name : string,
    phoneNumber : string,
    dob : Timestamp,
    status : string,
    personalDescription : string
}


export const status = ['accepted', 'pending', 'rejected']
export type {JobDetail, JobOffers}
