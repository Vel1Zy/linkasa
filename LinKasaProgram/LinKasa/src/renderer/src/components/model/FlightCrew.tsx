export type Role = 'Pilot' | 'FlightAttendant'

export interface FlightCrew {
  name: string
  emailAddress: string
  role: Role
}

export const roles: Role[] = ['Pilot', 'FlightAttendant']
