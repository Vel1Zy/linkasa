import {Timestamp, addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {JobDetail, JobOffers} from "../Interfaces/JobInterface"
import {createID} from "./IDController"
import {jobDetailCollection, jobOfferCollection} from "../FirebaseConfig/firebaseConfig"

const createJobDetail = async (title : string, department : string, description : string, slot : number) => {
    const jobDetail : JobDetail = {
        jobID : 'job-detail-' + createID(),
        title : title,
        department : department,
        description : description,
        slot : slot
    }

    try {
        await addDoc(jobDetailCollection, jobDetail)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getDetailRef = async (id : string) => {
    const ref = await getDocs(query(jobDetailCollection, where('jobID', '==', id)))
    return ref.docs[0].ref
}

const updateJobDetail = async (detail : JobDetail, title : string, department : string, description : string, slot : number) => {
    if(!confirm('Are you sure you want to update')) return false
    try {
        const ref = await getDetailRef(detail.jobID)
        if(!ref) return false
        detail.title = title
        detail.department = department
        detail.description = description
        detail.slot = slot
        await updateDoc(ref, detail as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const deleteJobDetail = async (id : string) => {
    try {
        const ref = await getDetailRef(id)
        if(!ref) return false
        await deleteDoc(ref)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getAllJobDetails = async () => {
    const docs = await getDocs(jobDetailCollection)
    return docs.docs.map(doc => doc.data() as JobDetail)
}

const getJobInformation = async (jobID : string) => {
    const doc = await getDocs(query(jobDetailCollection, where('jobID', '==', jobID)))
    return doc.docs[0].data() as JobDetail
}

const createJobOffer = async (job : JobDetail, email : string, name : string, phone : string, date : string, description : string) => {
    const offer : JobOffers = {
        offerID : 'job-offer-' + createID(),
        jobID : job.jobID,
        email : email,
        name : name,
        phoneNumber : phone,
        dob : Timestamp.fromDate(new Date(date)),
        status : 'pending',
        personalDescription : description
    }

    try {
        await addDoc(jobOfferCollection, offer)
        return true
    } catch (error) {
        console.log(error);
        return false
    }

}

const getAllJobOffer = async () => {
    const d = await getDocs(jobOfferCollection)
    return d.docs.map(doc => doc.data() as JobOffers)
}

const getJobFromOffer = async (offers : JobOffers[]) => {
    const jobDetails : JobDetail[] = []
    for(const offer of offers) {
        const job = await getJobInformation(offer.jobID)
        jobDetails.push(job)
    }
    return jobDetails
}

const getJobOfferDetail = async (offerID : string) => {
    const doc = await getDocs(query(jobOfferCollection, where('offerID', '==', offerID)))
    return doc.docs[0].data() as JobOffers
}


const getJobOfferRef = async (offerID : string) => {
    const doc = await getDocs(query(jobOfferCollection, where('offerID', '==', offerID)))
    return doc.docs[0].ref 
}


const acceptJobOffer = async (offer : JobOffers) => {
    if(!confirm('Are you sure you want to accept')) return true
    try {
        const ref = await getJobOfferRef(offer.offerID)
        if(!ref) return false
        offer.status = 'accepted'
        await updateDoc(ref, offer as any)
        return true   
    } catch (error) {
        console.log(error);
        return false
    }
}

const rejectJobOffer = async (offer : JobOffers) => {
    if(!confirm('Are you sure you want to reject')) return false
    try {
        const ref = await getJobOfferRef(offer.offerID)
        if(!ref) return false
        offer.status = 'rejected'
        await updateDoc(ref, offer as any)
        return true   
    } catch (error) {
        console.log(error);
        return false
    }
}

export { createJobDetail, getAllJobDetails, updateJobDetail, deleteJobDetail, getJobInformation, createJobOffer, getAllJobOffer, getJobFromOffer, getJobOfferDetail, acceptJobOffer, rejectJobOffer }
