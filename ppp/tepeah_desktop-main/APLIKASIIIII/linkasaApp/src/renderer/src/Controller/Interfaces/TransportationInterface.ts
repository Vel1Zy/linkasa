import {Timestamp} from "firebase/firestore";

export interface TransportationInterface {
    transportationID : string, 
    planeID : string,
    routeID : string,
   date : Timestamp,
    purpose : string,
    landsideStaff : string 
}
