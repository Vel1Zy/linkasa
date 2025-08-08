import React from 'react'
import { Link } from 'react-router-dom'

const NavBarViewFlightComponent = () => {
  return (
    <Link to={'/view-flight'} className="mr-4 text-blue-500 hover:text-blue-700">
      ViewFlightSchedule
    </Link>
  )
}

export default NavBarViewFlightComponent
