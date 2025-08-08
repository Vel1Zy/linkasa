import {Timestamp, addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {SecurityIncident} from "../Interfaces/SecurityIncidentInterface";
import {securityIncidentCollection} from "../FirebaseConfig/firebaseConfig";
import {createID} from "./IDController";

const createSecurityIncident = async (location : string, description : string, date : string) => {
    const securityIncident : SecurityIncident = {
        id: "security-incident-" + createID(),
        location: location,
        description: description,
        date: Timestamp.fromDate(new Date(date))
    }

    try {
        await addDoc(securityIncidentCollection, securityIncident)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getAllSecurityIncident = async () => {
    const ds = await getDocs(securityIncidentCollection)
    return ds.docs.map(doc => doc.data() as SecurityIncident)
}

const getSecurityRef = async (id : string) => {
    const doc = await getDocs(query(securityIncidentCollection, where('id', '==', id)))
    return doc.docs[0].ref
}


const updateSecurityIncident = async (incident : SecurityIncident, location : string, desc : string, date : string) => {
    incident.location = location
    incident.description = desc
    incident.date = Timestamp.fromDate(new Date(date))

    try {
        const ref = await getSecurityRef(incident.id)
        if(ref) await updateDoc(ref, incident as any)
        return true
    } catch (error) {
        console.log(error);     
        return false
    }

}

const deleteSecurityIncident = async (id : string) => {
    if(!confirm('Are you sure you want to delete this incident')) return false
    try {
        const ref = await getSecurityRef(id) 
        if(ref) await deleteDoc(ref)
        return true
    }
    catch (error) {
        console.log(error);
        return false
    }
}
export { createSecurityIncident, getAllSecurityIncident, updateSecurityIncident, deleteSecurityIncident }
