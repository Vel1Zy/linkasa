import React from 'react'
import { Link } from 'react-router-dom'

const NavBarViewLostAndFoundComponent = () => {
  return (
    <Link to={'/view-lost-and-found'} className="mr-4 text-blue-500 hover:text-blue-700">
      ViewLostAndFound
    </Link>
  )
}

export default NavBarViewLostAndFoundComponent
