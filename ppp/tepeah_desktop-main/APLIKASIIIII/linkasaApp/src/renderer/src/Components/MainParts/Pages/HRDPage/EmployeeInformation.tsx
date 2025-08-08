import { useEffect, useState } from "react"
import actionLogo from '../../../../../assets/ActionIcon.png'
import { Link } from "react-router-dom"
import {getAllEmployeeInformation} from "../../../../Controller/GeneralControls/EmployeeController";
import {Employee} from "../../../../Controller/Interfaces/EmployeeInterface";

function EmployeeInformation () {

    const [employees, setEmployees] = useState<Employee[] | null>(null)
    useEffect(() => {
        getAllEmployeeInformation().then((fetched) => {
            setEmployees(fetched)
        })
    }, [])

    return <div>
        <div className="container mx-auto p-4 flex items-center">
            <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 text-left">No.</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                {employees?.map((employee, index) => (
                    <>
                        <tr className="border-b border-gray-200 text-gray-800 border" key={index}>
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">{employee.name}</td>
                            <td className="py-2 px-4">{employee.companyEmail}</td>
                            <td className="py-2 px-4">{employee.role}</td>
                            <td className="py-2 px-4">
                                <Link to={"/hrd/action-page/" + employee.companyEmail}>
                                    <img src={actionLogo} alt="" className="w-10"/>
                                </Link>
                            </td>
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    </div>
    </div>
}

export default EmployeeInformation
