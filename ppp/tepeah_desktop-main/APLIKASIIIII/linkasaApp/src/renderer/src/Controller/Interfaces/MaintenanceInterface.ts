import {Timestamp} from "firebase/firestore";
import {Schedule} from "./EmployeeInterface";

export const groundSupportEquipment = [
    "Aircraft tow tractors",
    "Baggage conveyors",
    "Belt loaders",
    "Ground power units",
    "Air start units",
    "Fuel trucks",
    "De-icing vehicles"
];

export const terminalEquipment = [
    "Escalators and elevators",
    "Moving walkways",
    "Baggage carousel systems",
    "Security screening equipment (X-ray machines, metal detectors)",
    "Air conditioning and heating systems",
    "Information displays and PA systems"
];

export const runwayAndTaxiwayEquipment = [
    "Runway lighting systems",
    "Taxiway lighting systems",
    "Windsocks and weather monitoring equipment",
    "Ground radar systems"
];

export const aircraftMaintenanceEquipment = [
    "Hydraulic jacks and lifts",
    "Ground support equipment tooling",
    "Maintenance platforms and dockings",
    "Aircraft ladders and stairs"
];


type equipment = 'groundSupportEquipment' | 'terminalEquipment' | 'runwayAndTaxiwayEquipment' | 'aircraftMaintenanceEquipment'

export const equipmentTypes = ['groundSupportEquipment' , 'terminalEquipment' , 'runwayAndTaxiwayEquipment' , 'aircraftMaintenanceEquipment']

export const items = ["Hydraulic jacks and lifts",
    "Ground support equipment tooling",
    "Maintenance platforms and dockings",
    "Aircraft ladders and stairs","Runway lighting systems",
    "Taxiway lighting systems",
    "Windsocks and weather monitoring equipment",
    "Ground radar systems","Escalators and elevators",
    "Moving walkways",
    "Baggage carousel systems",
    "Security screening equipment (X-ray machines, metal detectors)",
    "Air conditioning and heating systems",
    "Information displays and PA systems","Aircraft tow tractors",
    "Baggage conveyors",
    "Belt loaders",
    "Ground power units",
    "Air start units",
    "Fuel trucks",
    "De-icing vehicles"]

export interface Maintenance {
    maintenanceID : string,
    description : string,
    maintenanceCrew : MaintenaceCrew | null,
    date : Timestamp,
    estimatedDay : number,
    equipmentType : string,
    equipment : string,
}


export interface MaintenanceRequest {
    maintenanceRequestID : string,
    sendByEmployeID : string,
    description : string,
    date : Timestamp,
    estimatedDay : number,
    equipmentType : string,
    equipment : string,
    reviseInformation : string,
    status : 'pending' | 'revised' | 'rejected' | 'accepted'
}

export interface MaintenaceCrew {
    crewID : string,
    crewName : string,
    crewEmails : string[]
    schedule : Schedule[]
}
