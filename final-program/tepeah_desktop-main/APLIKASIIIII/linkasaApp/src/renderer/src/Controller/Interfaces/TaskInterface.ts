import {Timestamp} from "firebase/firestore";

interface Task {
    taskID : string,
    cargoID : string,
    scheduleID : string,
    handler : string,
    desc : string,
    date : Timestamp 
}

export type { Task }
