// Create a login page for the user to login to the application

import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@renderer/FirebaseConfig'
import { AuthContext } from '@renderer/AuthContext'
import { collection, getDocs, query, where } from 'firebase/firestore'

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === '' || password === '') setError('Both fields are required')
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(email)
          fetchUserData(email)
        })
        .catch((error) => {
          setError('Invalid credentials')
        })
    }
  }
  const fetchUserData = async (email) => {
    const q = query(collection(db, 'staff'), where('emailAddress', '==', email))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const { name, emailAddress, position } = doc.data()
      console.log(email)
      console.log(emailAddress)
      if (email === emailAddress) {
        setUser({ name: name, position: position })
        navigate('/empty')
      }
    })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'email') {
      setEmail(value)
      console.log('this is email' + email)
    } else {
      setPassword(value)
      console.log('this is pass' + password)
    }
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()

  //   if (email === '' || password === '') {
  //     setError('Both fields are required')
  //   } else if (email === 'admin' && password === 'admin') {
  //     setError('')
  //     navigate('/register-staff-data')
  //   } else {
  //     setError('Invalid credentials')
  //   }
  // }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        <h1 className="block text-gray-700 text-lg font-bold mb-2 text-center">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            value={email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-7">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
