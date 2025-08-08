import { useContext } from "react"
import HRDNavbar from "./EmployeesNavbar/HRDNavbar";
import LostAndFoundStaffNavbar from './EmployeesNavbar/LostAndFoundNavbar';
import {UserContext} from "../../Context/UserContext";
import GroundHandlingManagerNavbar from "./EmployeesNavbar/GroundHandlingManager";
import FlightOperationsManagerNavbar from "./EmployeesNavbar/FlightOperationsManagerNavbar";
import MaintenanceManagerNavbar from "./EmployeesNavbar/MaintenanceManagerNavbar";
import MaintenanceStaffNavbar from "./EmployeesNavbar/MaintenanceStaffNavbar";
import InformationDeskStaffNavbar from "./EmployeesNavbar/InformationDeskStaffNavbar";
import CheckInStaffNavbar from "./EmployeesNavbar/CheckInStaffNavbar";
import GateAgentsNavbar from "./EmployeesNavbar/GateAgentsNavbar";
import AirOperationsManagerNavbar from "./EmployeesNavbar/AirOperationsManagerNavbar";
import BaggageSecuritySupervisorNavbar from "./EmployeesNavbar/BaggageSecuritySupervisorNavbar";
import CustomsAndBorderControlNavbar from "./EmployeesNavbar/CustomsAndBorderControlNavbar";
import LogisticsManagerNavbar from "./EmployeesNavbar/LogisticsManagerNavbar";
import CargoManagerNavbar from "./EmployeesNavbar/CargoManagerNavbar";
import CargoHandlersNavbar from "./EmployeesNavbar/CargoHandlersNavbar";
import LandsideOperationManagerNavbar from "./EmployeesNavbar/LandsideOperationManagerNavbar";
import CivilNavbar from "./EmployeesNavbar/CivilNavbar";
import CFONavbar from "./EmployeesNavbar/CFONavbar";

function NavbarChild(){
    const user = useContext(UserContext)?.currentUser;
    if(!user) return <></>
    else if(user.role === 'HRD') return <HRDNavbar></HRDNavbar>
    else if(user.role === 'LostAndFoundStaff') return <LostAndFoundStaffNavbar></LostAndFoundStaffNavbar>
    else if(user.role === 'GroundHandlingManager') return <GroundHandlingManagerNavbar></GroundHandlingManagerNavbar>
    else if(user.role === 'FlightOperationManager') return <FlightOperationsManagerNavbar></FlightOperationsManagerNavbar>
    else if(user.role === 'MaintenanceManager') return <MaintenanceManagerNavbar></MaintenanceManagerNavbar>
    else if(user.role === 'MaintenanceStaff') return <MaintenanceStaffNavbar></MaintenanceStaffNavbar>
    else if(user.role === 'InformationDeskStaff') return <InformationDeskStaffNavbar></InformationDeskStaffNavbar>
    else if(user.role === 'CheckInStaff') return <CheckInStaffNavbar/>
    else if(user.role === 'GateAgents') return <GateAgentsNavbar></GateAgentsNavbar>
    else if(user.role === 'AirOperationManager') return <AirOperationsManagerNavbar/>
    else if(user.role === 'BaggageSecuritySupervisor') return <BaggageSecuritySupervisorNavbar/>
    else if(user.role === 'LogisticManager') return <LogisticsManagerNavbar/>
    else if(user.role === 'CustomsAndBorderControlOfficer') return <CustomsAndBorderControlNavbar/>
    else if(user.role === 'CargoManager') return <CargoManagerNavbar/>
    else if(user.role === 'CargoHandlers') return <CargoHandlersNavbar/>
    else if(user.role === 'LogisticManager') return <LogisticsManagerNavbar/>
    else if(user.role === 'LandsideOperationsManager') return <LandsideOperationManagerNavbar></LandsideOperationManagerNavbar>
    else if(user.role === 'CivilEngineeringManager') return <CivilNavbar></CivilNavbar>
    else if(user.role === 'CFO') return <CFONavbar></CFONavbar>
    else return <></>
}

export default NavbarChild
