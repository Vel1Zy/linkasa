import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import LoginPage from './components/page/LoginPage'
import RegisterStaff from './components/page/RegisterStaffPage'
import { AuthProvider } from '../src/AuthContext'
import Navbar from './navbar/NavBar'
import ViewStaffDataPage from './components/page/ViewStaffDataPage'
import AddFlight from './components/page/AddFlight'
import ViewFlightPage from './components/page/ViewFlightPage'
import ViewAirportMapPage from './components/page/ViewAirportMapPage'
import ChatPage from './components/page/ChatPage'
import CreateFlightCrewPage from './components/page/CreateFlightCrewPage'
import ViewFlightCrewPage from './components/page/ViewFlightCrewPage'
import CreateLostAndFoundEntryPage from './components/page/CreateLostAndFoundEntryPage'
import ViewLostAndFoundEntryPage from './components/page/ViewLostAndFoundEntryPage'
import CreateJobVacancy from './components/page/CreateJobVacancyPage'
import ViewJobVacancy from './components/page/ViewJobVacancyPage'
import CreateSecurityIncidentReport from './components/page/CreateSecurityIncidentReport'
import ViewSecurityIncidentReportPage from './components/page/ViewSecurityIncidentReportPage'
import CreateMaintenanceSchedule from './components/page/CreateMaintenanceSchedule'
import ViewMaintenanceSchedulePage from './components/page/ViewMaintenanceSchedulePage'
import { CreateNewInfrastructure } from './components/controller/InfrastructureController'
import CreateInfrastructurePage from './components/page/CreateInfrastructurePage'
import ViewInfrastructure from './components/page/ViewInfrastructurePage'
import ViewBudgetPlan from './components/page/ViewBudgetPlanPage'
import { CreateNewBudgetPlan } from './components/controller/BudgetPlanController'
import CreateBudgetPlanPage from './components/page/CreateBudgetPlanPage'
import ViewAirportGoal from './components/page/ViewAirportGoalPage'
import CreateAirportGoal from './components/page/CreateAirportGoal'
import ViewInspectionRecord from './components/page/ViewInspectionRecord'
import CreateInspectionRecordPage from './components/page/CreateInspectionRecord'
import ViewPassportVisaDetail from './components/page/ViewPassportVisaDetail'
import CreatePassportVisaDetail from './components/page/CreatePassportVisaDetail'
import ViewSecuritySchedule from './components/page/ViewSecuritySchedule'
import CreateSecuritySchedule from './components/page/CreateSecuritySchedule'
import CreateInterviewSchedulePage from './components/page/CreateInterviewSchedule'
import ViewInterviewSchedule from './components/page/ViewInterviewSchedule'
import CreateStaffTraining from './components/page/CreateStaffTraining'
import ViewStaffTraining from './components/page/ViewStaffTraining'
import CreateBaggageIncidentPage from './components/page/CreateBaggageIncident'
import ViewBaggageIncident from './components/page/ViewBaggageIncident'

function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/empty" element={<div />} />
          <Route path="/register-staff" element={<RegisterStaff />} />
          <Route path="/view-staff" element={<ViewStaffDataPage />} />
          <Route path="/add-flight" element={<AddFlight />} />
          <Route path="/view-flight" element={<ViewFlightPage />} />
          <Route path="/view-airport-map" element={<ViewAirportMapPage />} />
          <Route path="/global-chat" element={<ChatPage />} />
          <Route path="/create-flight-crew" element={<CreateFlightCrewPage />} />
          <Route path="/view-flight-crew" element={<ViewFlightCrewPage />} />
          <Route path="/create-lost-and-found" element={<CreateLostAndFoundEntryPage />} />
          <Route path="/view-lost-and-found" element={<ViewLostAndFoundEntryPage />} />
          <Route path="/create-job-vacancy" element={<CreateJobVacancy />} />
          <Route path="/view-job-vacancy" element={<ViewJobVacancy />} />
          <Route path="/create-security-incident" element={<CreateSecurityIncidentReport />} />
          <Route path="/view-security-incident" element={<ViewSecurityIncidentReportPage />} />
          <Route path="/create-maintenance-schedule" element={<CreateMaintenanceSchedule />} />
          <Route path="/view-maintenance-schedule" element={<ViewMaintenanceSchedulePage />} />
          <Route path="/view-infrastructure" element={<ViewInfrastructure />} />
          <Route path="/create-infrastructure" element={<CreateInfrastructurePage />} />
          <Route path="/view-budget-plan" element={<ViewBudgetPlan />} />
          <Route path="/create-budget-plan" element={<CreateBudgetPlanPage />} />
          <Route path="/view-airport-goal" element={<ViewAirportGoal />} />
          <Route path="/create-airport-goal" element={<CreateAirportGoal />} />
          <Route path="/view-inspection-record" element={<ViewInspectionRecord />} />
          <Route path="/create-inspection-record" element={<CreateInspectionRecordPage />} />

          <Route path="/create-passport-visa" element={<CreatePassportVisaDetail />} />
          <Route path="/view-passport-visa" element={<ViewPassportVisaDetail />} />
          <Route path="/create-security-schedule" element={<CreateSecuritySchedule />} />
          <Route path="/view-security-schedule" element={<ViewSecuritySchedule />} />
          <Route path="/create-interview-schedule" element={<CreateInterviewSchedulePage />} />
          <Route path="/view-interview-schedule" element={<ViewInterviewSchedule />} />

          <Route path="/create-staff-training" element={<CreateStaffTraining />} />
          <Route path="/view-staff-training" element={<ViewStaffTraining />} />
          <Route path="/create-baggage-incident" element={<CreateBaggageIncidentPage />} />
          <Route path="/view-baggage-incident" element={<ViewBaggageIncident />} />

          {/* other roues... */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
