import {Timestamp, addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {Logistic} from "../Interfaces/LogisticInterface"
import {createID} from "./IDController"
import {logisticCollection, logisticReportCollection} from "../FirebaseConfig/firebaseConfig"
import locationsArray from "../Interfaces/FlightInterface"
import {LogisticReport} from "../Interfaces/LogisticReportInterface"

const createLogistic = async (cargoID : string, source : string, destination : string, from : string, to : string, type : string) => {
    const logistic : Logistic = {
        logisticID : 'logistic-' + createID(),
        cargoID : cargoID,
        source : locationsArray[parseInt(source) - 1],
        destination : locationsArray[parseInt(destination) - 1],
        from : Timestamp.fromDate(new Date(from)),
        to : Timestamp.fromDate(new Date(to)),
        type : type
    }

    console.log(logistic);

    try {
        await addDoc(logisticCollection, logistic)
        return true
    } catch (error) {
        console.log(error); 
        return false
    }
}

const getLogisticRef = async (logisticID : string) => {
    const snapshot = await getDocs(query(logisticCollection, where('logisticID', '==', logisticID)))
    return snapshot.docs[0].ref
}

const updateLogistic = async (logistic : Logistic, source : string, destination : string, from : string, to : string, type : string) => {
    if(!confirm('Are you sure you want to update')) return false
    logistic.source = locationsArray[parseInt(source) - 1]
    logistic.destination = locationsArray[parseInt(destination) - 1]
    logistic.from = Timestamp.fromDate(new Date(from))
    logistic.to = Timestamp.fromDate(new Date(to))
    logistic.type = type


    try {
        const ref = await getLogisticRef(logistic.logisticID)
        if(!ref) return false
        await updateDoc(ref, logistic as any)
        return true
    } catch (error) {
        return false
    }
}

const deleteLogistic = async (logistic : Logistic) => {
    if(!confirm('Are you sure you want to delete this logistic')) return false
    try {
        const ref = await getLogisticRef(logistic.logisticID)
        if(!ref) return false
        await deleteDoc(ref)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getAllLogistic = async () => {
    const snapshot = await getDocs(logisticCollection);
    return snapshot.docs.map(doc => doc.data() as Logistic)
}

const validateReport = async (report : LogisticReport) => {
    if(report.report === '') {
        alert('Please provide a report')
        return false
    }

    return true
}

const createLogisticReport = async (report : string) => {
    const r : LogisticReport = {
        reportID : 'logistic-report-' + createID(),
        report : report,
        date : Timestamp.fromDate(new Date())
    }
    try {
        if(!validateReport(r)) return false
        await addDoc(logisticReportCollection, r)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getReportRef = async (reportID : string) => {
    const snapshot = await getDocs(query(logisticReportCollection, where('reportID','==', reportID)))

    return snapshot.docs[0].ref
}

const getReport = async () => {
    const docs = await getDocs(logisticReportCollection)
    return docs.docs.map(doc => doc.data() as LogisticReport)
}

const deleteReport = async (report : LogisticReport) => {
    if(!confirm('Are you sure you want to delete')) return false
    try {
        const ref = await getReportRef(report.reportID)
        if(!ref) return false
        await deleteDoc(ref)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateReport = async (report : LogisticReport, newReport : string) => {
    report.report = newReport
    if(!validateReport(report)) return false
    try {
        const ref = await getReportRef(report.reportID)
        if(!ref) return false
        await updateDoc(ref, report as any)
        return true        
    } catch (error) {
        console.log(error);
        return false
    }
}


export { createLogistic, getAllLogistic, updateLogistic, deleteLogistic, createLogisticReport, getReport, deleteReport, updateReport }
