import {Timestamp} from "firebase/firestore"

interface RefuelSchedule {
    refuelID : string,
    plane : string, 
    date : Timestamp,
    crew : string | null
}

export type { RefuelSchedule }
