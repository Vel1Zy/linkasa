import {addSecurityStaffSchedule, getBaggageSecurityStaff} from "@renderer/Controller/GeneralControls/BaggageSecurityController";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {gates} from "@renderer/Controller/Interfaces/Gates";
import {useEffect, useState} from "react";

function CreateSecurityStaffSchedule() {
    const [date, setDate] = useState('')
    const [gate, setGate] = useState(0)
    const [employee, setEmployee] = useState('')
    const [staffs, setStaffs] = useState<Employee[]>([])
    
    useEffect(() => {
        getBaggageSecurityStaff().then((staff) => {
            setStaffs(staff)
        })
    }, [])
    

    const createHandle = () => {
        addSecurityStaffSchedule(gate, date, employee).then((result) => {
            if (result) window.location.reload()
        })
    }
    return (
        <div className="flex flex-col gap-3">
            <p className="text-xl font-bol">Create Baggage Security Staff Schedule</p>

            <select
                name="number"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Gate Number"
                onChange={(o) => setEmployee(o.target.value)}
            >
                <option value={''}>Select Company Email</option>
                {staffs.map((staff, index) => (
                    <option key={index} value={staff.companyEmail}>{staff.companyEmail}</option>
                ))}
            </select>
            <select
                name="number"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Gate Number"
                onChange={(o) => setGate(parseInt(o.target.value))}
            >
                <option value={0}>Select Gate</option>
                {gates.map((gate, index) => (
                    <option key={index} value={gate}>{gate}</option>
                ))}
            </select>
            <input
                name="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Create New Schedule"
                type="date"
                onChange={(o) => setDate(o.target.value)}
            ></input>
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={createHandle}
            >
                Create Schedule
            </button>
        </div>
    );
}

export default CreateSecurityStaffSchedule;
