// This is for staff data model

export type Position =
  | 'HumanResourcesDirector'
  | 'LostAndFoundStaff'
  | 'CustomerServiceManager'
  | 'InformationDeskStaff'
  | 'CheckInStaff'
  | 'GateAgent'
  | 'AirportOperationManager'
  | 'FlightOperationManager'
  | 'GroundHandlingManager'
  | 'GroundHandlingStaff'
  | 'LandsideOperationManager'
  | 'MaintenanceManager'
  | 'MaintenanceStaff'
  | 'CustomsAndBorderControlOfficer'
  | 'BaggageSecuritySupervisor'
  | 'CargoManager'
  | 'BaggageSecurityStaff'
  | 'LogisticManager'
  | 'FuelManager'
  | 'CargoHandlers'
  | 'CivilEngineeringManager'
  | 'FlightAttendant'
  | 'Pilot'
  | 'LandsideOperationStaff'
  | 'ChiefExecutiveOfficer'
  | 'ChiefFinancialOfficer'
  | 'ChiefOperationalOfficer'
  | 'ChiefSecurityOfficer'
  | 'Admin'

export interface Staff {
  name: string
  dateOfBirth: string
  contactNumber: string
  emailAddress: string
  position: Position
  password: string
}

export const positions: Position[] = [
  'HumanResourcesDirector',
  'LostAndFoundStaff',
  'CustomerServiceManager',
  'InformationDeskStaff',
  'CheckInStaff',
  'GateAgent',
  'AirportOperationManager',
  'FlightOperationManager',
  'GroundHandlingManager',
  'GroundHandlingStaff',
  'LandsideOperationManager',
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
  'FlightAttendant',
  'Pilot',
  'LandsideOperationStaff',
  'ChiefExecutiveOfficer',
  'ChiefFinancialOfficer',
  'ChiefOperationalOfficer',
  'ChiefSecurityOfficer',
  'Admin'
]
