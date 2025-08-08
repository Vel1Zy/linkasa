import {Timestamp} from "firebase/firestore"

interface LogisticReport {
    reportID : string,
    report : string,
    date : Timestamp
}

export type { LogisticReport }
