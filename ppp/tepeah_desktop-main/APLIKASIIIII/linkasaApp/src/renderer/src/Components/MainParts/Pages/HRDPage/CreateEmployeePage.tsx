import { useState } from 'react'
import { Employee, employeeRoles } from '../../../../Controller/Interfaces/EmployeeInterface'
import { createEmployee } from '../../../../Controller/PageControllers/HRDController'
import { Timestamp } from 'firebase/firestore'

const employeeInitialState: Employee = {
  name: '',
  dob: Timestamp.fromDate(new Date('2004-12-09')),
  gender: 'Male',
  email: '',
  companyEmail: '',
  password: '',
  role: 'HRD',
  schedule: []
}

function CreateEmployeePage() {
  const [employee, setEmployee] = useState(employeeInitialState)
  const [date, setDate] = useState('')

  const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value })
    console.log(employee)
  }

  const selectHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value })
    console.log(employee)
  }

  const createHandle = () => {
    createEmployee(employee, date).then((result) => {
      if (result) console.log('success')
    })
  }

  return (
    <div className="flex flex-col p-10 gap-4 pl-36">
      <div>
        <h1 className="m-0 p-0">Create Employee</h1>
      </div>
      <div className="flex flex-col gap-4">
        <input
          autoFocus
          onChange={changeHandle}
          type="text"
          name="name"
          id=""
          placeholder="Full Name"
          className="rounded-md p-2 w-1/2 text-lg"
        />
        <input
          onChange={(o) => setDate(o.target.value)}
          type="Date"
          name="dob"
          id=""
          placeholder="Date"
          className="rounded-md p-2 w-1/2 text-lg"
        />
        <select
          defaultValue={'Male'}
          onChange={selectHandle}
          name="gender"
          id=""
          className="rounded-md p-2 w-1/2 text-lg"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          onChange={changeHandle}
          type="email"
          name="email"
          id=""
          placeholder="Email"
          className="rounded-md p-2 w-1/2 text-lg"
        />
        <select onChange={selectHandle} name="role" id="">
          {employeeRoles.map((role) => (
            <option value={role}>{role}</option>
          ))}
        </select>
        <button onClick={createHandle} className="p-2 text-xl w-1/3">
          Create Employee
        </button>
      </div>
    </div>
  )
}

export default CreateEmployeePage
