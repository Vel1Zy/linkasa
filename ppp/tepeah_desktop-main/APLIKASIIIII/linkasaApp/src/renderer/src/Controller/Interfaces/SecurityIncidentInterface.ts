import {Timestamp} from "firebase/firestore";

interface SecurityIncident {
    id: string,
    location : string,
    description : string,
    date : Timestamp
}


export type { SecurityIncident }
