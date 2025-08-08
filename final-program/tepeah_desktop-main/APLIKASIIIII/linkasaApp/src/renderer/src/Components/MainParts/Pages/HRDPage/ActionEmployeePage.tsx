import { useParams } from "react-router-dom"
import {  useEffect, useState } from "react"
import EmployeeSchedule from "./EmployeeSchedule"
import {
    deleteEmployeeInformation,
    getEmployeeInformationByEmail,
    updateEmployeeRole
} from "../../../../Controller/GeneralControls/EmployeeController";
import {Employee, employeeRoles} from "../../../../Controller/Interfaces/EmployeeInterface";
import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import UpdateEmployeeInformation from "./UpdateEmployeeInformation";
import {auth} from "@renderer/Controller/FirebaseConfig/firebaseConfig";

const ActionEmployeePage = () => {
    const currentUser = auth.currentUser
    const [employee, setEmployee] = useState<Employee | null>(null)
    const { companyEmail } = useParams()
    const [role, setRole] = useState('')
    const [updateEmployee, setUpdateEmployee] = useState(false)

    useEffect(() => {
        if(companyEmail) {
            getEmployeeInformationByEmail((companyEmail)).then((emp) => {
                console.log(companyEmail);
                setEmployee(emp)
            })
        }
    }, [])

    const deleteHandle = () => {
        if(employee && currentUser) deleteEmployeeInformation(employee, currentUser).then((result) =>{
            if(result) window.history.back()
        })
    }

    const changeRoleClick = () => {
        if(employee) updateEmployeeRole(employee, role).then((result) => {
            if(result) window.location.reload() 
        })
    }

    if(employee) return <div className="px-20 py-2">
            <div className="p-4 flex flex-col gap-2">
                <div className="flex gap-5 text-2xl font-bold m-0 p-0">
                    <p className="m-0 p-0">Name : </p>
                    <p className="m-0 p-0">{employee.name} </p>
                </div>
                <div className="flex gap-5 text-2xl font-bold m-0 p-0">
                    <p className="m-0 p-0">DOB : </p>
                    <p className="m-0 p-0">{utc(employee.dob.seconds)} </p>
                </div>
                <div className="flex gap-5 text-2xl font-bold m-0 p-0">
                    <p className="m-0 p-0">Personal Email: </p>
                    <p className="m-0 p-0">{employee.email} </p>
                </div>
                <div className="flex gap-5 text-2xl font-bold m-0 p-0">
                    <p className="m-0 p-0">Role : </p>
                    <p className="m-0 p-0">{employee.role}</p>
                </div>
                <div className="flex">
                    <select onChange={(o) => setRole(o.target.value)} name="role" id="" className="w-1/3 text-lg p-2">
                        {employeeRoles.map((role) => (
                            <option value={role}>{ role }</option>
                        ))}
                    </select>
                    <button onClick={changeRoleClick}>Change Role</button>
                </div>
                <div className="flex gap-3">
                    <button
                        className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 w-1/6 px-4 hover:bg-blue-600 focus:outline-none"
                        onClick={() => setUpdateEmployee(!updateEmployee)}
                    >
                        Update Employee
                    </button>
                    <button
                        className="border-none mt-2 bg-red-500 hover:bg-red-700 text-white rounded-lg py-2 w-1/6 px-4 focus:outline-none"
                        onClick={deleteHandle}
                    >
                        Delete Employee
                    </button>
                </div>
                
            </div>
            <div>
                {!updateEmployee ? <EmployeeSchedule canCreate={true} employee={employee}></EmployeeSchedule> : <UpdateEmployeeInformation employee={employee}></UpdateEmployeeInformation>}
            </div>
    </div>

    return <div>
        <h1>Invalid</h1>
    </div>
}

export default ActionEmployeePage
