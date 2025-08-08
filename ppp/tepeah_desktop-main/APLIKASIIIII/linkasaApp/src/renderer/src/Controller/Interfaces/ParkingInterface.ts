import {Timestamp} from "firebase/firestore";

export const parkingIDs: number[] = Array.from({ length: 100 }, (_, index) => index + 1);


interface ParkingFacility {
    parkingFacilityID : number,
    parkingID : number, 
    planeID : string, 
    from : Timestamp,
    to : Timestamp
}

export type { ParkingFacility }
