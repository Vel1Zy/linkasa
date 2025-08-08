import React from 'react'
import { Link } from 'react-router-dom'

const NavBarViewAirportMapComponent = () => {
  return (
    <Link to={'/view-airport-map'} className="mr-4 text-blue-500 hover:text-blue-700">
      ViewAirportMap
    </Link>
  )
}

export default NavBarViewAirportMapComponent
