import {RefuelSchedule} from "../Interfaces/RefuelScheduleInterface";
import {Timestamp, addDoc, deleteDoc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {refuelingSchedule} from "../FirebaseConfig/firebaseConfig";
import {Schedule} from "../Interfaces/EmployeeInterface";
import {addSchedule, deleteEmployeeSchedule, getEmployeeDocRef, getEmployeeInformationByEmail, isAvailable, updateEmployeeRole} from "./EmployeeController";
import {convertStringDateToTimeStamp, isFuture} from "./DateControl";
import {createID} from "./IDController";

const validateRefuelingData = async (companyEmail : string, date : Timestamp) : Promise<boolean> => {
    if (!isFuture(date)) {
        console.log(date);
        alert('date inputted must be in the future')
        return false
    }
    else if (!(await isAvailable(companyEmail, date))) {
        alert('employee is not available on that date')
        return false
    }
    return true
}

const createRefuelSchedule = async (planeId : string, crewEmail : string, date : string) => {
    try {
        const refuelSchedule : RefuelSchedule = {
            refuelID : 'refuel-' + createID(),
            plane : planeId,
            crew : crewEmail,
            date : Timestamp.fromDate(new Date(date))
        }
        const schedule : Schedule = {
            scheduleID : "schedule-" + createID(),
            date : refuelSchedule.date,
            task : 'refueling plane ID : ' + refuelSchedule.plane
        }

        const employee = await getEmployeeInformationByEmail(crewEmail)
        const employeeRef = await getEmployeeDocRef(crewEmail)

        if (employee && employeeRef && await validateRefuelingData(crewEmail, schedule.date)) {
            employee.schedule.push(schedule)
            await updateDoc(employeeRef, employee as any)
            await addDoc(refuelingSchedule, refuelSchedule)
        }

        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const getRefuelScheduleRef = async (id : string) => {
    const doc = await getDocs(query(refuelingSchedule, where('refuelID', '==', id))) 
    return doc.docs[0].ref
}

const getAllRefuelSchedule = async () => {
    const docs = await getDocs(refuelingSchedule)
    const refuels : RefuelSchedule[] = []
    for (const doc of docs.docs) {
        refuels.push(doc.data() as RefuelSchedule)
    }
    return refuels
}

const updateRefuelingSchedule = async (refuel : RefuelSchedule, date : string, planeID : string, crew : string) => {
    const updateCrewSchedule = refuel.crew == crew
    const oldDate = refuel.date 
    const oldCrew = refuel.crew
    refuel.date = convertStringDateToTimeStamp(date);
    refuel.plane = planeID;
    refuel.crew = crew;
    if(!validateRefuelingData(crew, refuel.date)) return false
    try {
        const ref = await getRefuelScheduleRef(refuel.refuelID)
        await updateDoc(ref, refuel as any)
        if(updateCrewSchedule && oldCrew){
            const employee = await getEmployeeInformationByEmail(oldCrew)
            if(employee) await deleteEmployeeSchedule(employee, oldDate) 
            const newEmployee = await getEmployeeInformationByEmail(refuel.crew)
            const schedule : Schedule = {
                scheduleID : "schedule-" + createID(),
                date : refuel.date,
                task :'refueling plane ID :'+ refuel.plane
            }
            if(newEmployee) await addSchedule(newEmployee, schedule)
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const deleteRefuelingSchedule = async (refuel : RefuelSchedule) => {
    try {
        if(refuel.crew){
            const employee = await getEmployeeInformationByEmail(refuel.crew)
            if(employee) deleteEmployeeSchedule(employee, refuel.date)
        } 

        const ref = await getRefuelScheduleRef(refuel.refuelID)
        await deleteDoc(ref)
        return true   
    } catch (error) {
        console.log(error);   
        return false
    }
    
}

export { createRefuelSchedule, getAllRefuelSchedule, updateRefuelingSchedule, deleteRefuelingSchedule } 
