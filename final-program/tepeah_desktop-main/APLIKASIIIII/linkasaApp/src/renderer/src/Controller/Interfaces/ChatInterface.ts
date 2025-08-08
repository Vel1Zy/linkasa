import {Timestamp} from "firebase/firestore";
import {Employee} from "./EmployeeInterface";

interface PrivateChat {
    message : string,
    createdAt : Timestamp,
    user : Employee,
    to : string,
    from : string
}

interface GlobalChat {
    message : string,
    createdAt : Timestamp,
    user : Employee
}

interface DepartmentChat {
    message : string, 
    createdAt : Timestamp,
    user : Employee,
    department : string
}
export type { PrivateChat, GlobalChat, DepartmentChat }
