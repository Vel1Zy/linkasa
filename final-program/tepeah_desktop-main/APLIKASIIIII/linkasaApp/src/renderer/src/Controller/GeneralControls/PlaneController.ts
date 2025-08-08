import {DocumentReference, getDocs, query, where} from "firebase/firestore";
import {flights, planes} from "../FirebaseConfig/firebaseConfig";
import {Plane} from "../Interfaces/PlaneInterface";
import {Flight} from "../Interfaces/FlightInterface";

const getAllPlane = async () => {
    const planeDocs = await getDocs(planes)
    return planeDocs.docs.map(doc => doc.data() as Plane)
}

const getPlaneDocRef = async (id : string) => {
    const docs = await getDocs(query(planes, where('id', '==', id)))
    const ref = docs.docs[0].ref
    if (ref) return ref as DocumentReference
    return null
}

const getPlaneInfo = async (id :string) => {
    const docs = await getDocs(query(planes, where('id', '==', id)))
    if(docs.docs[0].data()) return docs.docs[0].data() as Plane 
    return null
}

const getPlanesFromFligts = async (flights: Flight[]) => {
    const p : Plane[] = []
    for(const f of flights) {
        const plane = await getPlaneInfo(f.planeID) as Plane
        p.push(plane)
    }

    return p
}

export { getAllPlane, getPlaneDocRef, getPlaneInfo, getPlanesFromFligts }
