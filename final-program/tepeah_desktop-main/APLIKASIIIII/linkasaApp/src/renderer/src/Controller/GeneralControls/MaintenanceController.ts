import {Timestamp, addDoc, deleteDoc , getDocs, query, updateDoc, where} from "firebase/firestore"
import {MaintenaceCrew, Maintenance, MaintenanceRequest} from "../Interfaces/MaintenanceInterface"
import {convertStringDateToTimeStamp, isPast} from "./DateControl"
import {createID} from "./IDController"
import {employees, maintenanceCrews, maintenanceRequestCollection, maintenanceSchedules, notificationsCollection} from "../FirebaseConfig/firebaseConfig"
import {Employee, Schedule} from "../Interfaces/EmployeeInterface"
import {addSchedule, getEmployeeDocRef, getEmployeeInformationByEmail} from "./EmployeeController"
import {Notification} from "../Interfaces/NotificationInterface"

const validateMaintenanceSchedule = (m : Maintenance) => {
    if(isPast(m.date)) return false
    return true
}

const createMaintenanceSchedule = async (type : string, day : number, desc : string, item : string, date : string) => {
    const maintenanceSchedule : Maintenance = {
        maintenanceID : 'maintenance-' + createID(),
        description : desc,
        maintenanceCrew : null,
        date : convertStringDateToTimeStamp(date),
        estimatedDay : day,
        equipmentType : type,
        equipment : item
    }
    if(!validateMaintenanceSchedule(maintenanceSchedule)) return false
    try {
        await addDoc(maintenanceSchedules, maintenanceSchedule)
        return true   
    } catch (error) {
        console.log(error);
        return false   
    }
}

const updateMaintenanceSchedule = async (maintenance : Maintenance, type : string, day : number, desc : string, item : string, date : string) => {
    maintenance.equipmentType = type
    maintenance.estimatedDay = day
    maintenance.description = desc
    maintenance.equipment = item
    maintenance.date = convertStringDateToTimeStamp(date) 

    if(!validateMaintenanceSchedule(maintenance)) return false
    try {
        const docRef = await getMaintenanceRef(maintenance.maintenanceID)
        await updateDoc(docRef, maintenance as any)
        return true   
    } catch (error) {
        console.log(error);
        return false   
    }
}

const getAllMaintenanceSchedule = async () => {
    const docs = await getDocs(maintenanceSchedules)
    const m : Maintenance[] = []
    for(const doc of docs.docs) {
        m.push(doc.data() as Maintenance)
    }

    return m
}

const getMaintenanceData = async (id : string) => {
    const docs = await getDocs(query(maintenanceSchedules, where('maintenanceID', '==', id)))
    return docs.docs[0].data() as Maintenance
}

const getMaintenanceRef = async (id : string) => {
    const docs = await getDocs(query(maintenanceSchedules, where('maintenanceID', '==', id)))
    return docs.docs[0].ref 
}

const getAvailableCrew = async (m : Maintenance) => {
    const docs = await getDocs(maintenanceCrews)
    const a : MaintenaceCrew[] = []
    for(const doc of docs.docs) {
        const crew = doc.data() as MaintenaceCrew
        if(crew.schedule.length == 0) {
            a.push(crew)
        }
        for(const s of crew.schedule){
            if(!(s.date == m.date)) a.push(crew)
        }
    }

    return a
}

const getCrewRef = async (crewID : string) => {
    const docs = await getDocs(query(maintenanceCrews, where('crewID', '==', crewID))) 
    return docs.docs[0].ref
}

const getCrewData = async (crewID : string) => {
    const docs = await getDocs(query(maintenanceCrews, where('crewID', '==', crewID))) 
    return docs.docs[0].data() as MaintenaceCrew
}

const addScheduleToCrews = async (crew : MaintenaceCrew, schedule : Schedule) => {
    for (const c of crew.crewEmails) {
        const e = await getEmployeeInformationByEmail(c)
        if (e) await addSchedule(e, schedule)
    }
}

const assignMaintenanceCrew = async (maintenanance : Maintenance, crewID : string) => {
    const crew = await getCrewData(crewID)
    const maintenanceRef = await getMaintenanceRef(maintenanance.maintenanceID)
    const crewRef = await getCrewRef(crew.crewID)
    const schedule : Schedule = {
        scheduleID : 'schedule-' + createID(),
        task : 'maintaining ' + maintenanance.description,
        date : maintenanance.date 
    }
    crew.schedule.push(schedule)
    maintenanance.maintenanceCrew = crew
    await addScheduleToCrews(crew, schedule)
    await updateDoc(maintenanceRef, maintenanance as any)
    await updateDoc(crewRef, crew as any)
}

const getMaintenanceCrew = async () => {
    const arr : Employee[] = []
    const snapshot = await getDocs(query(employees, where('role', '==', 'MaintenanceStaff')))
    for(const doc of snapshot.docs) {
        arr.push(doc.data() as Employee)
    }

    return arr
}

const getMaintenanceManager = async () => {
    const arr : Employee[] = []
    const snapshot = await getDocs(query(employees, where('role', '==', 'MaintenanceManager')))
    for(const doc of snapshot.docs) {
        arr.push(doc.data() as Employee)
    }

    return arr
}

const deleteMaintenanceSchedule = async (maintenance : Maintenance) => {
    const confirmation = confirm('you sure')
    if(!confirmation) return false
    try {
        const docRef = await getMaintenanceRef(maintenance.maintenanceID)
        await deleteDoc(docRef)
        return true
    } catch (error) {
        console.log(error);
        return false 
    }
}

const getMaintenanceCrewRef = async (crewID : string) => {
    const doc = await getDocs(query(maintenanceCrews, where('crewID', '==', crewID)))
    return doc.docs[0].ref
}

const updateMaintenanceCrewSchedule =async (crew:MaintenaceCrew, date : Timestamp) => {
    crew.schedule = crew.schedule.filter((element) => {
        return element.date != date
    })
    const crewRef = await getMaintenanceCrewRef(crew.crewID)
    if(crewRef) await updateDoc(crewRef, crew as any)
    for(const email of crew.crewEmails) {
        const employee = await getEmployeeInformationByEmail(email)
        if(employee) {
            const docRef = await getEmployeeDocRef(employee.companyEmail)
            employee.schedule = employee.schedule.filter((element) => {
                return element.date != date
            })
            if(docRef) await updateDoc(docRef, employee as any)
        }
    }
}

const deleteMaintenanceCrewFromMaintenance = async (maintenance : Maintenance, crew : MaintenaceCrew) => {
    const confirmation = confirm('are you sure you want to delete the crew from the maintenance schedule')
    if(!confirmation) return false
    try {
        maintenance.maintenanceCrew = null
        await updateMaintenanceCrewSchedule(crew, maintenance.date)
        const maintenanceRef = await getMaintenanceRef(maintenance.maintenanceID)
        await updateDoc(maintenanceRef, maintenance as any)   
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const validateMaintenanceRequest = async (request : MaintenanceRequest) => {
    if(isPast(request.date)) return false
    else if(request.equipment === '') return false
    else if(request.equipmentType === '') return false
    else if(request.estimatedDay === 0) return false
    return true
}

const createMaintenanceRequest = async (companyEmail : string, type : string, days : number, desc : string, item : string, date : string) => {
    const request : MaintenanceRequest = {
        maintenanceRequestID : 'maintenanceRequest-' + createID(),
        sendByEmployeID : companyEmail,
        description : desc,
        date : convertStringDateToTimeStamp(date),
        estimatedDay : days,
        equipmentType : type,
        equipment : item,
        reviseInformation : '',
        status : 'pending'
    }
    if(!validateMaintenanceRequest(request)) return false

    try {
        await addDoc(maintenanceRequestCollection, request)
        return true
    } catch (error) {
        console.log(error); 
        return false
    }
}

const getAllMaintenanceRequest = async () => {
    const docs = await getDocs(maintenanceRequestCollection)
    const r : MaintenanceRequest[] = []
    for(const d of docs.docs) {
        r.push(d.data() as MaintenanceRequest)
    }

    return r
}

const getRequestRef = async (id : string) => {
    const d = await getDocs(query(maintenanceRequestCollection, where('maintenanceRequestID', '==', id)))
    return d.docs[0].ref
}

const acceptMaintenanceRequest = async (request : MaintenanceRequest) => {
    const ref = await getRequestRef(request.maintenanceRequestID)
    if(ref) {
        try {
            request.status = 'accepted'
            updateDoc(ref, request as any)
            const notif : Notification = {
                notificationID : 'notification-' + createID(),
                companyEmail : request.sendByEmployeID,
                message : 'Your maintenenace request has been accepted'
            }
            await addDoc(notificationsCollection, notif)
            return true
        } catch (error) {
            return false
        }
    }
    return false
}

const rejectMaintenanceRequest = async (request : MaintenanceRequest) => {
    const ref = await getRequestRef(request.maintenanceRequestID)
    if(ref) {
        try {
            request.status = 'rejected'
            updateDoc(ref, request as any)
            const notif : Notification = {
                notificationID : 'notification-' + createID(),
                companyEmail : request.sendByEmployeID,
                message : 'Your maintenenace request has been rejected'
            }
            await addDoc(notificationsCollection, notif)
            return true
        } catch (error) {
            return false
        }
    }
    return false
}

const reviseMaintenanceRequest = async (request : MaintenanceRequest, information : string) => {
    const ref = await getRequestRef(request.maintenanceRequestID)
    if(ref) {
        try {
            request.status = 'rejected'
            request.reviseInformation = information
            updateDoc(ref, request as any)
            const notif : Notification = {
                notificationID : 'notification-' + createID(),
                companyEmail : request.sendByEmployeID,
                message : 'Your maintenenace request has been revised'
            }
            await addDoc(notificationsCollection, notif)
            return true
        } catch (error) {
            return false
        }
    }
    return false
}

export { createMaintenanceSchedule, getAllMaintenanceSchedule, getMaintenanceData, getAvailableCrew, assignMaintenanceCrew, getMaintenanceCrew, getMaintenanceManager, updateMaintenanceSchedule, deleteMaintenanceSchedule, deleteMaintenanceCrewFromMaintenance, createMaintenanceRequest, getAllMaintenanceRequest, acceptMaintenanceRequest, rejectMaintenanceRequest, reviseMaintenanceRequest }
