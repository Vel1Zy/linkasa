import {useEffect, useState} from "react";
import CreateSecurityStaffSchedule from "./CreateSecurityStaffSchedule";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {getBaggageSecurityStaff} from "@renderer/Controller/GeneralControls/BaggageSecurityController";
import EmployeeSchedule from "../HRDPage/EmployeeSchedule";

function SecurityStaffSchedule() {
    const [staffs, setStaffs] = useState<Employee[]>([])
    const [security, setSecuirty] = useState<Employee | null>(null)
    useEffect(() => {
        getBaggageSecurityStaff().then((staff) => {
            setStaffs(staff)
        })
    }, [])
    return (
        <div className='px-20 py-5'>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Baggage Security Staff</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {staffs.map((staff, index) => (
                        <tr
                            onClick={() => {
                                setSecuirty(staff)
                            }}
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            {/*// @ts-ignore*/}
                            <td className="py-3 px-6 text-left">{staff.companyEmail}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {security ? <EmployeeSchedule canCreate={false} employee={security}></EmployeeSchedule> : <></>}
            <CreateSecurityStaffSchedule></CreateSecurityStaffSchedule>
        </div>
    );
}

export default SecurityStaffSchedule;
