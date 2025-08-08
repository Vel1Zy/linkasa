import EmployeeLoginPage from "./Components/MainParts/Pages/LoginPage/EmployeeLoginPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {UserProvider} from "./Components/Context/UserContext";
import Navbar from "./Components/MainParts/Navbar/Navbar";
import LoginPage from "./Components/MainParts/Pages/PassengerPage/LoginPage";
import HomePage from "./Components/MainParts/Pages/EmployeePage/HomePage";
import CreateEmployeePage from "./Components/MainParts/Pages/HRDPage/CreateEmployeePage";
import EmployeeInformation from "./Components/MainParts/Pages/HRDPage/EmployeeInformation";
import ActionEmployeePage from "./Components/MainParts/Pages/HRDPage/ActionEmployeePage";
import AddLogPage from "./Components/MainParts/Pages/LostAndFoundPage/AddLog";
import "../src/index.css"
import ViewLog from "./Components/MainParts/Pages/LostAndFoundPage/ViewLog";
import LogDetail from "./Components/MainParts/Pages/LostAndFoundPage/LogDetail";
import Dummy from "./Controller/DummyController/Dummy";
import CreateRefuelingPage from "./Components/MainParts/Pages/GroundHandlingMangager/CreateRefuelingPage";
import PersonalSchedulePage from "./Components/MainParts/Pages/EmployeePage/PersonalSchedulePage";
import FlightInformations from "./Components/MainParts/Pages/FlightOperationManager/FlightInformations";
import CreateFlightSchedule from "./Components/MainParts/Pages/FlightOperationManager/CreateFlightSchedule";
import FlightDetailPage from "./Components/MainParts/Pages/FlightOperationManager/FlightDetailPage";
import RegisterPage from "./Components/MainParts/Pages/PassengerPage/RegisterPage";
import PassengerHomePage from "./Components/MainParts/Pages/PassengerPage/PassengerHomePage";
import FlightsPage from "./Components/MainParts/Pages/PassengerPage/Flights/FlightsPage";
import FlightDetailPagePassenger from "./Components/MainParts/Pages/PassengerPage/Flights/FlightDetailPagePassenger";
import VisaPassportInformation from "./Components/MainParts/Pages/PassengerPage/VisaAndPassport/VisaPassportInformation";
import MaintenanceSchedules from "./Components/MainParts/Pages/Maintenance/MaintenanceSchedules";
import MaintenanceDetail from "./Components/MainParts/Pages/Maintenance/MaintenanceDetail";
import ChatPageSwitcher from "./Components/MainParts/Pages/EmployeePage/ChatEmployeePage/ChatPageSwitcher";
import TerminalMap from "./Components/MainParts/Pages/FlightOperationManager/TerminalMap";
import MaintenanceRequest from "./Components/MainParts/Pages/Maintenance/MaintenanceRequest";
import ViewAllBaggageInformationOfFlight from "./Components/MainParts/Pages/FlightOperationManager/Baggage/ViewAllBaggageInformationOfFlight";
import BagggeDetail from "./Components/MainParts/Pages/FlightOperationManager/Baggage/BagggeDetail";
import Refuelings from "./Components/MainParts/Pages/GroundHandlingMangager/Refuelings";
import SecurityStaffSchedule from "./Components/MainParts/Pages/Security/BaggageSecurityStaffSchedule";
import SecurityIncidents from "./Components/MainParts/Pages/Security/SecurityIncidents";
import JobVacancy from "./Components/MainParts/Pages/HRDPage/JobVacancy/JobVacancy";
import CreateJobOffers from "./Components/MainParts/Pages/HRDPage/JobOffers/CreateJobOffers";
import CreateJobOfferDetail from "./Components/MainParts/Pages/HRDPage/JobOffers/CreateJobOfferDetail";
import ViewCargo from "./Components/MainParts/Pages/Logistics/Cargo/ViewCargo";
import CargoDetail from "./Components/MainParts/Pages/Logistics/Cargo/CargoDetail";
import StorageDetail from "./Components/MainParts/Pages/Logistics/Storages/StorageDetail";
import ViewTasks from "./Components/MainParts/Pages/Logistics/Cargo/Tasks/ViewTasks";
import Logistics from "./Components/MainParts/Pages/Logistics/Logistics";
import CreateLogistics from "./Components/MainParts/Pages/Logistics/CreateLogistics";
import LogisticReports from "./Components/MainParts/Pages/Logistics/LogisticReport";
import FeedbackFormsView from "./Components/MainParts/Pages/Feedbacks/FeedbackFormsView";
import FinancialRequest from "./Components/MainParts/Pages/Financial/Request/FinancialRequest";
import ManageFinancialRequest from "./Components/MainParts/Pages/Financial/Manage/ManageFinancialRequest";
import TransportationSchedules from "./Components/MainParts/Pages/Transportation/TransportationSchedules";
function App(): JSX.Element {

  return <div>
    <UserProvider>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/home-page" element={<PassengerHomePage/>}></Route>
            <Route path="/hrd/employee-information" element={<EmployeeInformation/>}></Route>
            <Route path="/hrd/create-employee" element={<CreateEmployeePage/>}></Route>
            <Route path="/employee-login" element={<EmployeeLoginPage/>}></Route>
            <Route path="/hrd/action-page/:companyEmail" element={<ActionEmployeePage/>}></Route>
            <Route path="/laf/add-log" element={<AddLogPage/>}></Route>
            <Route path="/laf/view-log" element={<ViewLog/>}></Route>
            <Route path="/laf/view-log/detail/:id" element={<LogDetail/>}></Route>
            <Route path="/dummy" element={<Dummy/>}></Route>
            <Route path="/ghm/create-refueling-schedule" element={<CreateRefuelingPage/>}></Route>
            <Route path="/schedule" element={<PersonalSchedulePage/>}></Route>
            <Route path="/fom/flights-information" element={<FlightInformations/>}></Route>
            <Route path="/fom/create-flight-schedule" element={<CreateFlightSchedule/>}></Route>
            <Route path="/fom/flight-detail/:flightID" element={<FlightDetailPage/>}></Route>
            <Route path="/passenger-register" element={<RegisterPage/>}></Route>
            <Route path="/passenger/flights" element={<FlightsPage/>}></Route>
            <Route path="/passenger/visaAndPassport" element={<VisaPassportInformation/>}></Route>
            <Route path="/passenger/flight-detail/:flightID" element={<FlightDetailPagePassenger/>}></Route>
            <Route path="/maintenanceManager/maintenances" element={<MaintenanceSchedules/>}></Route>
            <Route path="/maintenanceManager/maintenance-detail/:maintenanceID" element={<MaintenanceDetail/>}></Route>
            <Route path="/chat-employee" element={<ChatPageSwitcher/>}></Route>
            <Route path="/ids/flight-information" element={<FlightInformations/>}></Route>
            <Route path="/terminal-maps" element={<TerminalMap/>}></Route>
            <Route path="/cis/flight-information" element={<FlightInformations/>}></Route>
            <Route path="/ga/flight-information" element={<FlightInformations/>}></Route>
            <Route path="/mm/maintenance-request" element={<MaintenanceRequest/>}></Route>
            <Route path="/maintenanceManager/maintenances" element={<MaintenanceSchedules/>}></Route>
            <Route path="/aom/maintenances" element={<MaintenanceSchedules/>}></Route>
            <Route path="/aom/maintenance-request" element={<MaintenanceRequest/>}></Route>
            <Route path="/aom/flight-information" element={<FlightInformations/>}></Route>
            <Route path="/flight-information" element={<FlightInformations/>}></Route>
            <Route path="/baggage-information/:flightID" element={<ViewAllBaggageInformationOfFlight/>}></Route>
            <Route path="/baggage-detail/:baggageID" element={<BagggeDetail/>}></Route>
            <Route path="/refuelings" element={<Refuelings/>}></Route>
            <Route path="/security-staff-schedules" element={<SecurityStaffSchedule/>}></Route>
            <Route path="/flight-information" element={<FlightInformations/>}></Route>
            <Route path="/lost-and-founds" element={<ViewLog/>}></Route>
            <Route path="/add-lost-and-founds" element={<AddLogPage/>}></Route>
            <Route path="/security-incident" element={<SecurityIncidents/>}></Route>
            <Route path="/hrd/jobs" element={<JobVacancy/>}></Route>
            <Route path="/public/jobs" element={<CreateJobOffers/>}></Route>
            <Route path="/public/jobs/detail/:jobID" element={<CreateJobOfferDetail/>}></Route>
            <Route path="/cargo/create" element={<ViewCargo creating={true} />}></Route>
            <Route path="/cargo/detail/:cargoID" element={<CargoDetail/>}></Route>
            <Route path="/cargo/storage/detail/:storageID" element={<StorageDetail/>}></Route>
            <Route path="/cargo/task" element={<ViewTasks/>}></Route>
            <Route path="/cargo-handler/cargo" element={<ViewCargo creating={false}/>}></Route>
            <Route path="/logistics" element={<Logistics/>}></Route>
            <Route path="/logistics/create" element={<CreateLogistics/>}></Route>
            <Route path="/logistics/report" element={<LogisticReports/>}></Route>
            <Route path="/feedback-form" element={<FeedbackFormsView/>}></Route>
            <Route path="/financial-request" element={<FinancialRequest/>}></Route>
            <Route path="/financial-request/manage" element={<ManageFinancialRequest/>}></Route>
            <Route path="/transportation" element={<TransportationSchedules/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  </div>
}


export default App
