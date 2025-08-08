import {getDocs, query, where} from "firebase/firestore"
import {Employee, Schedule} from "../Interfaces/EmployeeInterface"
import {employees} from "../FirebaseConfig/firebaseConfig"
import {convertStringDateToTimeStamp} from "./DateControl"
import {addSchedule, getEmployeeInformationByEmail} from "./EmployeeController"
import {createID} from "./IDController"

const getBaggageSecurityStaff = async () => {
    const s : Employee[] = []
    const docs = await getDocs(query(employees, where('role', '==', 'BaggageSecurityStaff')))
    for(const doc of docs.docs) {
        s.push(doc.data() as Employee)
    }

    return s
}

const addSecurityStaffSchedule = async (gate : number, date : string, e : string) => {
    const s : Schedule = {
        scheduleID : 'schedule-' + createID(),
        task : 'baggage security job in gate ' + gate,
        date : convertStringDateToTimeStamp(date)
    }
    try {
        const employee = await getEmployeeInformationByEmail(e)
        if(employee) await addSchedule(employee, s)   
        return true
    } catch (h) {
        console.log(h);
        return false
    }
}


export { getBaggageSecurityStaff, addSecurityStaffSchedule }
