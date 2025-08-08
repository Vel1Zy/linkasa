import { useState } from 'react'
import { LoginAction } from '../../../../Controller/PageControllers/LoginControllers'

function EmployeeLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginButtonHandle = () => {
    console.log(email + ' ' + password)
    LoginAction(email, password).then((isSuccess) => {
      if (isSuccess) {
        alert('you are logged in')
        window.location.replace('/employee/homePage')
      }
    })
  }

  const emailFieldHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const passwordFieldHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center my-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-1">Hello, Employee</h1>
      </div>
      <input
        type="text"
        autoFocus
        name="email"
        id=""
        onChange={emailFieldHandle}
        placeholder="Email"
        className="rounded-md p-2 w-1/2 text-lg"
      />
      <input
        type="password"
        name="password"
        id=""
        placeholder="Password"
        className="rounded-md p-2 w-1/2 text-lg"
        onChange={passwordFieldHandle}
      />
      <button
        onClick={loginButtonHandle}
        type="submit"
        className="w-1/5 bg-gray-900 text-white border-none rounded-lg p-3 text-xl"
      >
        Login
      </button>
      <a
        href="/login"
        className="no-underline opacity-60 hover:opacity-100 text-black hover:font-extrabold"
      >
        Login as passenger
      </a>
    </div>
  )
}

export default EmployeeLoginPage
