import {updateEmployeeInformation} from "@renderer/Controller/GeneralControls/EmployeeController";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {useState} from "react";

interface I {
    employee : Employee
}

function UpdateEmployeeInformation(props : I) {
    const employee = props.employee
    const [name, setName] = useState(employee.name)
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState(employee.email)

    const updateHandle = () => {
        console.log(dob);
        updateEmployeeInformation(employee, dob, name, email).then((result) =>{
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-3 mt-3">
            <p className="text-xl font-bold">Update Employee Information</p>
            <input
                name="text"
                className="w-1/3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Name"
                type="text"
                onChange={(o) => setName(o.target.value)}
            ></input>
            <input
                name="date"
                className=" w-1/3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="email@gmail.com"
                type="email"
                onChange={(o) => setEmail(o.target.value)}
            ></input>
            <input
                name="date"
                className=" w-1/3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Create New Schedule"
                type="date"
                onChange={(o) => setDob(o.target.value)}
            ></input>
            <button
                className="w-1/6 border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={updateHandle}
            >
                Update Information
            </button>
        </div>
    );
}

export default UpdateEmployeeInformation;
