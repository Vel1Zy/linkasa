import React, { useContext } from 'react'
import LinKasa from '../../../../resources/LinKasa.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '@renderer/AuthContext'
import NavBarViewFlightComponent from './NavBarViewFlightComponent'
import NavBarViewAirportMapComponent from './NavBarViewAirportMapComponent'
import NavBarGlobalChatComponent from './NavBarGlobalChatComponent'
import NavBarCreateFlightCrewComponent from './NavBarCreateFlightCrewComponent'
import NavBarCreateLostAndFoundComponent from './NavBarCreateLostAndFoundComponent'
import NavBarViewLostAndFoundComponent from './NavBarViewLostAndFoundComponent'

function welcomeText(user) {
  return (
    <div className="items-center">
      {user && (
        <p>
          Welcome, <strong>{user?.name}</strong> || {user?.position}
        </p>
      )}
    </div>
  )
}

function displayLogo() {
  return (
    <a href="/">
      <img src={LinKasa} alt="LinKasa" className="h-14" />
    </a>
  )
}

function Navbar(): JSX.Element {
  const { user } = useContext(AuthContext)
  return (
    <nav className="flex flex-col bg-gray-300 p-4 ">
      <div className="flex flex-row justify-between items-center">
        {displayLogo()}
        {welcomeText(user)}
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        {/* other links */}
        {user?.position === 'HumanResourcesDirector' && (
          <div className="mx-3">
            <Link to={'/view-staff'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewStaffData
            </Link>
            <Link to={'/register-staff'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreateStaffData
            </Link>
            <Link to={'/view-job-vacancy'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewJobVacancy
            </Link>
            <Link to={'/create-job-vacancy'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreateJobVacancy
            </Link>
            <Link
              to={'/view-interview-schedule'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              ViewInterviewSchedule
            </Link>
            <Link
              to={'/create-interview-schedule'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              CreateInterviewSchedule
            </Link>

            <Link to={'/view-staff-training'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewStaffTraining
            </Link>
            <Link to={'/create-staff-training'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreateStaffTraining
            </Link>
          </div>
        )}
        {user?.position === 'FlightOperationManager' && (
          <div className="mx-3">
            <Link to={'/add-flight'} className="mr-4 text-blue-500 hover:text-blue-700">
              AddFlightSchedule
            </Link>
            <NavBarViewFlightComponent />
            <NavBarCreateFlightCrewComponent />
            <Link to={'/view-flight-crew'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewFlightCrew
            </Link>
          </div>
        )}
        {user?.position === 'InformationDeskStaff' && (
          <div className="mx-3">
            <NavBarViewFlightComponent />
            <NavBarViewAirportMapComponent />
          </div>
        )}
        {user?.position === 'CheckInStaff' && (
          <div className="mx-3">
            <NavBarViewFlightComponent />
          </div>
        )}
        {user?.position === 'GateAgent' && <div></div>}
        {user?.position === 'AirportOperationManager' && (
          <div className="mx-3">
            <NavBarViewFlightComponent />
          </div>
        )}
        {user?.position === 'ChiefOperationalOfficer' && (
          <div className="mx-3">
            <NavBarViewFlightComponent />
          </div>
        )}
        {user?.position === 'LostAndFoundStaff' && (
          <div className="mx-3">
            <NavBarCreateLostAndFoundComponent />
            <NavBarViewLostAndFoundComponent />
          </div>
        )}
        {user?.position === 'ChiefSecurityOfficer' && (
          <div className="mx-3">
            <Link to={'/view-security-incident'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewSecurityIncident
            </Link>
            <Link
              to={'/create-security-incident'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              CreateSecurityIncident
            </Link>
            <Link to={'/view-security-schedule'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewSecuritySchedule
            </Link>
            <Link
              to={'/create-security-schedule'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              CreateSecuritySchedule
            </Link>
          </div>
        )}
        {user?.position === 'ChiefOperationalOfficer' && (
          <div>
            <Link
              to={'/view-maintenance-schedule'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              ViewMaintenanceSchedule
            </Link>
            <Link
              to={'/create-maintenance-schedule'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              CreateMaintenanceSchedule
            </Link>
            <Link to={'/view-infrastructure'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewInfrastructure
            </Link>
            <Link to={'/create-infrastructure'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreateInfrastructure
            </Link>
          </div>
        )}
        {user?.position === 'ChiefFinancialOfficer' && (
          <div>
            <Link to={'/view-budget-plan'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewBudgetPlan
            </Link>
            <Link to={'/create-budget-plan'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreateBudgetPlan
            </Link>
          </div>
        )}
        {user?.position === 'ChiefExecutiveOfficer' && (
          <div>
            <Link to={'/view-airport-goal'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewAirportGoal
            </Link>
            <Link to={'/create-airport-goal'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreateAirportGoal
            </Link>
          </div>
        )}
        {user?.position === 'CustomsAndBorderControlOfficer' && (
          <div>
            <Link to={'/view-inspection-record'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewInspectionRecord
            </Link>
            <Link
              to={'/create-inspection-record'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              CreateInspectionRecord
            </Link>
            <Link to={'/view-passport-visa'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewPassportVisa
            </Link>
            <Link to={'/create-passport-visa'} className="mr-4 text-blue-500 hover:text-blue-700">
              CreatePassportVisa
            </Link>
          </div>
        )}
        {user?.position === 'BaggageSecuritySupervisor' && (
          <div>
            <Link to={'/view-baggage-incident'} className="mr-4 text-blue-500 hover:text-blue-700">
              ViewBaggageIncident
            </Link>
            <Link
              to={'/create-baggage-incident'}
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              CreateBaggageIncident
            </Link>
          </div>
        )}

        {user && <NavBarGlobalChatComponent />}
        {/* 
              {user?.position === 'HumanResourcesDirector' && <div></div>}
              {user?.position === 'LostAndFoundStaff' && <div></div>}
              {user?.position === 'CustomerServiceManager' && <div></div>}
              {user?.position === 'InformationDeskStaff' && <div></div>}
              {user?.position === 'CheckInStaff' && <div></div>}
              {user?.position === 'GateAgent' && <div></div>}
              {user?.position === 'AirportOperationManager' && <div></div>}
              {user?.position === 'FlightOperationManager' && <div></div>}
              {user?.position === 'GroundHandlingManager' && <div></div>}
              {user?.position === 'GroundHandlingStaff' && <div></div>}
              {user?.position === 'LandsideOperationsManager' && <div></div>}
              {user?.position === 'MaintenanceManager' && <div></div>}
              {user?.position === 'MaintenanceStaff' && <div></div>}
              {user?.position === 'CustomsAndBorderControlOfficer' && <div></div>}
              {user?.position === 'BaggageSecuritySupervisor' && <div></div>}
              {user?.position === 'CargoManager' && <div></div>}
              {user?.position === 'BaggageSecurityStaff' && <div></div>}
              {user?.position === 'LogisticManager' && <div></div>}
              {user?.position === 'FuelManager' && <div></div>}
              {user?.position === 'CargoHandlers' && <div></div>}
              {user?.position === 'CivilEngineeringManager' && <div></div>}
              {user?.position === 'FlightAttendant' && <div></div>}
              {user?.position === 'Pilot' && <div></div>}
              {user?.position === 'LandsideOperationStaff' && <div></div>}
              {user?.position === 'ChiefExecutiveOfficer' && <div></div>}
              {user?.position === 'ChiefFinancialOfficer' && <div></div>}
              {user?.position === 'ChiefOperationalOfficer' && <div></div>}
              {user?.position === 'ChiefSecurityOfficer' && <div></div>} */}
      </div>
    </nav>
  )
}

export default Navbar
