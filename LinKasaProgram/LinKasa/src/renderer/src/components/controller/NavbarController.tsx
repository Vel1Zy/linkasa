import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../FirebaseConfig'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const NavbarController = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    // Check if user is logged in
    // If user is logged in, set email and user
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setEmail(user.email)
      }
    })
  })

  return <div>NavbarController</div>
}

export default NavbarController
