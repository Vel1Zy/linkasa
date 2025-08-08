import {getEmployeeByRole} from "@renderer/Controller/GeneralControls/EmployeeController";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {useEffect, useState} from "react";

interface I {
    role : string
}

function EmployeeList(i : I) {
    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        getEmployeeByRole(i.role).then((result) => {
            setEmployees(result)
        })
    }, [])
    return (
        <div>
            
        </div>
    );
}

export default EmployeeList;
