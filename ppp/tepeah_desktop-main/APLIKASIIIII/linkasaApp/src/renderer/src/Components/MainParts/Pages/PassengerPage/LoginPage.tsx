import { Link } from 'react-router-dom'
import { LoginAction } from '../../../../Controller/PageControllers/LoginControllers'
import { useState } from 'react'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginHandle = () => {
    LoginAction(email, password).then((result) => {
      if (result) alert('success')
      window.location.replace('/home-page')
    })
  }
  return (
    <div className="flex flex-col gap-5 justify-center items-center my-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-1 text-xl">Hello, please log in first</h1>
      </div>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        autoFocus
        name="email"
        id=""
        placeholder="Email"
        className="rounded-md p-2 w-1/2 text-lg"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        name="password"
        id=""
        placeholder="Password"
        className="rounded-md p-2 w-1/2 text-lg"
      />
      <button
        onClick={loginHandle}
        type="submit"
        className="w-1/5 bg-gray-900 text-white border-none rounded-lg p-3 text-xl"
      >
        Login
      </button>
      <Link
        to={'/passenger-register'}
        className="no-underline hover:opacity-100 opacity-60 text-black text-large hover:font-extrabold"
      >
        Register
      </Link>
      <a
        href="/employee-login"
        className="no-underline hover:opacity-100 opacity-60 text-black text-large hover:font-extrabold"
      >
        Login as Employee
      </a>
    </div>
  )
}
export default LoginPage
