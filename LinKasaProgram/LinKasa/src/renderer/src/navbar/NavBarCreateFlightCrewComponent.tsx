import React from 'react'
import { Link } from 'react-router-dom'

const NavBarCreateFlightCrewComponent = () => {
  return (
    <Link to={'/create-flight-crew'} className="mr-4 text-blue-500 hover:text-blue-700">
      CreateFlightCrew
    </Link>
  )
}

export default NavBarCreateFlightCrewComponent
