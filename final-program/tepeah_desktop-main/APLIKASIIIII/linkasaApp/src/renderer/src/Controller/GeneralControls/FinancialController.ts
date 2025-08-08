import {addDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {FinancialRequest} from "../Interfaces/FinancialRequestInterface"
import {createID} from "./IDController"
import {financialRequestCollection} from "../FirebaseConfig/firebaseConfig"
import {addNotif} from "./EmployeeController"

const validateFinancialRequest = (request: FinancialRequest): boolean => {
    if(request.department === '') return false
    else if(request.spending <= 0) return false
    else if(request.purpose === '') return false

    return true
}

const createFinancialRequest = async (sender : string, spending : number, purpose : string, department : string) => {
    const req : FinancialRequest = {
        by : sender,
        requestID : "request-" + createID(),
        spending : spending,
        purpose : purpose,
        revision : [],
        department : department,
        status : 'Pending'
    }

    if(!validateFinancialRequest(req)) return false

    try {
        await addDoc(financialRequestCollection, req)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const allFinancialRequest = async () => {
    const snapshot = await getDocs(financialRequestCollection)
    return snapshot.docs.map(doc => doc.data() as FinancialRequest)
}


const fetchPendingFinancialRequest = async () => {
    const snapshot = await getDocs(query(financialRequestCollection, where('status' ,'==', 'Pending')))
    return snapshot.docs.map(doc => doc.data() as FinancialRequest)
}
const fetchFinancialRequest= async (department : string) => {
    const snapshot = await getDocs(query(financialRequestCollection, where('department', '==', department)))

    return snapshot.docs.map(doc => doc.data() as FinancialRequest)
}

const getFinancialRequestRef = async (id : string) => {
    const snapshot = await getDocs(query(financialRequestCollection, where('requestID', '==', id)))
    return snapshot.docs[0].ref
}

const updateFinancialRequest = async (fq : FinancialRequest) => {
    try {
        const ref = await getFinancialRequestRef(fq.requestID)
        if(!ref) return false
        await updateDoc(ref, fq as any)
        await addNotif('Your financial request with ID ' + fq.requestID + 'has been ' + fq.status, fq.by)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}


const reviseFinancialRequest = async (fq : FinancialRequest, info : string) => {
    if(info.length <= 0) {
        alert('please insert reason for revising')
        return false
    }
    fq.revision.push(info)
    if(!confirm('Are you sure you want to revise this request')) return false
    return await updateFinancialRequest(fq)
}

const acceptFinancialRequest = async (fq : FinancialRequest) => {
    fq.status = 'Accepted'
    if(!confirm('Are you sure you want to revise this accept')) return false
    return await updateFinancialRequest(fq)
}

const rejectFinancialRequest = async (fq : FinancialRequest) => {
    fq.status = 'Rejected'
    if(!confirm('Are you sure you want to revise this reject')) return false
    return await updateFinancialRequest(fq)
}

export { createFinancialRequest, fetchFinancialRequest, allFinancialRequest, acceptFinancialRequest, reviseFinancialRequest, rejectFinancialRequest, fetchPendingFinancialRequest } 
