import { ReactNode } from "react";
import { Passenger } from "./PassengerInterface";
import { Employee } from "./EmployeeInterface";

interface UserContextInterface {
    currentUser : Employee | null,
    passenger : Passenger | null,
    updateData : (currentUser : Employee | null) => void
    updatePassenger : (passenger : Passenger| null) => void
}

interface UserContextProviderInterface {
    children : ReactNode
}

export type { UserContextInterface, UserContextProviderInterface };
