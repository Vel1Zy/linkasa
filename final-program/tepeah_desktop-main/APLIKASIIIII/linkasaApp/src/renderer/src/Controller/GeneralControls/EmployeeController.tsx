import { DocumentReference, Timestamp, addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {Employee, Schedule, EmployeeRole} from "../Interfaces/EmployeeInterface"
import { employees, notificationsCollection } from "../FirebaseConfig/firebaseConfig"
import {Notification} from "../Interfaces/NotificationInterface"
import {convertStringDateToTimeStamp} from "./DateControl"
import {User, deleteUser} from "firebase/auth"
import {createID} from "./IDController"

const getAllEmployeeInformation = async () : Promise<Employee[]> => {
    const employeeInformation : Employee[] = []

    const docs = await getDocs(employees)
    for(const doc of docs.docs) {
        employeeInformation.push(doc.data() as Employee)
    }

    return employeeInformation
}

const getEmployeeInformationByEmail = async (companyEmail : string) => {
    const employeeDocs = await getDocs(query(employees, where('companyEmail', '==', companyEmail)))
    return employeeDocs.docs[0].data() as Employee
}

const getEmployeeDocRef = async (companyEmail : string) => {
    const employeeDocs = await getDocs(query(employees, where('companyEmail', '==', companyEmail)))
    const ref = employeeDocs.docs[0].ref

    if (ref) return ref as DocumentReference
    return null
}

const updateEmployeeRole = async (info : Employee, role : string) => {
    const docRef = await getEmployeeDocRef(info.companyEmail)

    if(docRef) {
        info.role = role
        await updateDoc(docRef, info as any)
        return true
    }

    return false
}

const removeEmployeeSchedule = async (companyEmail : string, scheduleID : string) => {
    const employee = await getEmployeeInformationByEmail(companyEmail)
    employee.schedule.filter((s) => {
        return s.scheduleID !== scheduleID
    })
    try {
        const ref = await getEmployeeDocRef(companyEmail)
        if(!ref) return false   
        await updateDoc(ref, employee as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}


const addSchedule = async (employee : Employee, schedule : Schedule) => {
    try {
        employee.schedule.push(schedule)
        const docRef = await getEmployeeDocRef(employee.companyEmail)
        if(docRef) await updateDoc(docRef, employee as any).then(() => {
            console.log('updated')
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getAllEmployeeByARole = async (role : EmployeeRole) => {
    const employeeInformation : Employee[] = []

    const docs = await getDocs(employees)
    for(const doc of docs.docs) {
        const employeeData = doc.data() as Employee
        if (employeeData.role === role) employeeInformation.push(employeeData)
    }

    return employeeInformation
}

const getEmployeeByRole = async (role : string) => {
    const snapshot = await getDocs(query(employees, where('role', '==', role)))
    return snapshot.docs.map(doc => doc.data() as Employee)
}

const isAvailable = async (companyEmail : string,  date : Timestamp) : Promise<boolean> => {
    const employee = await getEmployeeInformationByEmail(companyEmail)
    if (!employee) return false
    for (const schedule of employee.schedule) {
        if (schedule.date == date) return false
    }
    return true
}

const deleteEmployeeSchedule =async (employee:Employee, date : Timestamp) => {
    try {
        if(!confirm("you sure")) return
        employee.schedule = employee.schedule.filter((s) => {
            return s.date != date
        }) 
        const employeeRef = await getEmployeeDocRef(employee.companyEmail)
        if(!employeeRef) alert('failed')
        else {
            await updateDoc(employeeRef, employee as any)
        }   
        window.location.reload()
        return
    } catch (error) {
        console.log(error);
        return 
    }
}

const updateEmployeeSchedule = async (employee : Employee, schedule : Schedule, newDate : string, newTask : string) => {
    schedule.date = convertStringDateToTimeStamp(newDate)
    schedule.task = newTask
    for(let i = 0; i < employee.schedule.length; i++){
        if(employee.schedule[i].scheduleID === schedule.scheduleID) {
            employee.schedule[i] = schedule
            const ref = await getEmployeeDocRef(employee.companyEmail)
            if(ref) await updateDoc(ref, employee as any)
            return true
        }
    }

    return false
}

// const removeEmployeeSchedule = async (employee : Employee, scheduleID : string) => {
//     employee.schedule.filter((schedule) => {
//         return schedule.scheduleID != scheduleID
//     })
// }

const addNotif = async (message : string, companyEmail : string) => {
    const n : Notification = {
        notificationID : 'notification-' + createID(),
        message : message,
        companyEmail : companyEmail
    }

    try {
        await addDoc(notificationsCollection, n)
        return true
    } catch (e) {
        console.log(e);
        return false
    }
}

const notifEmployee = async (companyEmail : string) => {
    const docs = await getDocs(query(notificationsCollection, where('companyEmail', '==',companyEmail)))

    for(const doc of docs.docs) {
        const n = doc.data() as Notification
        const message = n.message
        await deleteDoc(doc.ref)
        alert(message)
    }
}

const getEmployeScheduleByRole = async (role : string) => {
    const docs = await getDocs(query(employees, where('role', '==', role))) 
    const s : Schedule[] = []
    for(const doc of docs.docs) {
        const employee = doc.data() as Employee
        s.push(...employee.schedule)
    }
    return s
}

const updateEmployeeInformation = async (employee : Employee, date : string, name : string, email : string) => {
    console.log(date);
    employee.dob = convertStringDateToTimeStamp(date)
    employee.name = name
    employee.email = email
    console.log(employee);
    try {
        const ref = await getEmployeeDocRef(employee.companyEmail)
        if(ref) {
            await updateDoc(ref, employee as any)
            return true
        }
        return false
    } catch (error) {
        console.log(error);
        return false
    }
}

const deleteEmployeeInformation = async (employee : Employee, currentUser : User) => {
    if(!confirm('Are you sure you want to delete this employee')) return false
    try {
        await deleteUser(currentUser)
        const ref = await getEmployeeDocRef(employee.companyEmail)
        if(ref) {
            await deleteDoc(ref)
            return true
        }
        return false
    } catch (error) {
        console.log(error);
        return false
    }
}


export { getAllEmployeeInformation, getEmployeeInformationByEmail, updateEmployeeRole, addSchedule, getAllEmployeeByARole, getEmployeeDocRef, isAvailable, deleteEmployeeSchedule, notifEmployee, getEmployeScheduleByRole, updateEmployeeSchedule, updateEmployeeInformation, deleteEmployeeInformation, removeEmployeeSchedule, addNotif, getEmployeeByRole }
