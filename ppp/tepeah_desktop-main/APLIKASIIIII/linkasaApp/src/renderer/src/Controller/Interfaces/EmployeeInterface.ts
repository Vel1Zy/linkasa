import {Timestamp} from "firebase/firestore";

interface Schedule {
    scheduleID : string,
    task : string,
    date : Timestamp,
}

type EmployeeRole = 'HRD' | 'LostAndFoundStaff' | 'CEO' | 'CustomerServiceManager' | 'InformationDeskStaff' | 'CheckInStaff' | 'GateAgents' | 'AirOperationManager' | 'FlightOperationManager' | 'GroundHandlingManager' | 'GroundHandlingStaff' | 'LandsideOperationsManager' | 'MaintenanceManager' | 'MaintenanceStaff' | 'CustomsAndBorderControlOfficer' | 'BaggageSecuritySupervisor' | 'CargoManager' | 'BaggageSecurityStaff' | 'LogisticManager' | 'FuelManager' | 'CargoHandlers' | 'CivilEngineeringManager' | 'CFO' | 'COO' | 'CSO' | 'FlightAttendant' | 'Pilot' | 'LandsideOperationsStaff';

export const Department = ['HRD' , 'LostAndFound' , 'CustomerService' , 'FlightOperation' , 'MaintenanceOperation' , 'Logistics' , 'Fuel' , 'Cargo' , 'Baggage' , 'GateAgents' , 'Construction' , 'GroundHandling']


interface Employee {
    name : string,
    dob : Timestamp,
    gender : 'Female' | 'Male',
    email : string,
    companyEmail : string,
    password : string,
    role : EmployeeRole, 
    schedule : Schedule[]
}

export type { Employee, Schedule, EmployeeRole}
export const employeeRoles: EmployeeRole[] = [
    'HRD',
    'LostAndFoundStaff',
    'CEO',
    'CustomerServiceManager',
    'InformationDeskStaff',
    'CheckInStaff',
    'GateAgents',
    'AirOperationManager',
    'FlightOperationManager',
    'GroundHandlingManager',
    'GroundHandlingStaff',
    'LandsideOperationsManager',
    'LandsideOperationsStaff',
    'MaintenanceManager',
    'MaintenanceStaff',
    'CustomsAndBorderControlOfficer',
    'BaggageSecuritySupervisor',
    'CargoManager',
    'BaggageSecurityStaff',
    'LogisticManager',
    'FuelManager',
    'CargoHandlers',
    'CivilEngineeringManager',
    'CFO',
    'COO',
    'CSO',
    'Pilot',
    'FlightAttendant',
];
