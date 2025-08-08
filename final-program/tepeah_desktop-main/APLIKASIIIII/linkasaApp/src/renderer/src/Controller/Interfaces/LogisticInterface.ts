import {Timestamp} from "firebase/firestore"
import {Location} from "./FlightInterface"

export const logisticType = ['External Logistic', 'Internal Logistic']


interface Logistic {
    logisticID : string,
    cargoID : string,
    source : Location,
    destination : Location,
    from : Timestamp,
    to : Timestamp,
    type : string
}

export type { Logistic }
