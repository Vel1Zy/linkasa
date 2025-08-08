import React from 'react'
import { Link } from 'react-router-dom'

const NavBarCreateLostAndFoundComponent = () => {
  return (
    <Link to="/create-lost-and-found" className="mr-4 text-blue-500 hover:text-blue-700">
      CreateLostAndFound
    </Link>
  )
}

export default NavBarCreateLostAndFoundComponent
