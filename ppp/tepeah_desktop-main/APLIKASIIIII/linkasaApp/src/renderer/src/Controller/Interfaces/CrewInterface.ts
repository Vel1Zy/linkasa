import {Schedule} from "./EmployeeInterface";

interface Crew {
    crewID : string,
    crewName : string,
    pilot : string,
    flightAttendants : string[],
    schedule : Schedule[]
}

export type { Crew }
