import React from 'react'
import { Link } from 'react-router-dom'

const NavBarGlobalChatComponent = () => {
  return (
    <Link to={'/global-chat'} className="mr-4 text-blue-500 hover:text-blue-700">
      GlobalChat
    </Link>
  )
}

export default NavBarGlobalChatComponent
