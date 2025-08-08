import {addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {createID} from "./IDController"
import {Cargo} from "../Interfaces/CargoInterface"
import {cargoCollection, employees } from "../FirebaseConfig/firebaseConfig"
import {Storage} from "../Interfaces/StorageInterface"
import {Employee} from "../Interfaces/EmployeeInterface"

const createCargo = async (location : string) => {
    const cargo : Cargo = {
        cargoID : 'cargo-' + createID(),
        storageIDs : [],
        location : location,
        status : "awaiting pickup"
    }

    try {
        await addDoc(cargoCollection, cargo)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getCargo = async () => {
    const docs = await getDocs(cargoCollection)
    return docs.docs.map(doc => doc.data() as Cargo)
}

const getCargoInfo = async (id : string) => {
    const docs = await getDocs(query(cargoCollection, where('cargoID', '==', id)))
    return docs.docs[0].data() as Cargo
}

const getCargoRef = async (id : string) => {
    const docs = await getDocs(query(cargoCollection, where('cargoID', '==', id)))
    return docs.docs[0].ref
}

const addStorageToCargo = async (cargo : Cargo, storage : Storage) => {
    cargo.storageIDs.push(storage.storageID)
    try {
        const ref = await getCargoRef(cargo.cargoID)
        if(!ref) return false
        await updateDoc(ref, cargo as any)
        return true
    } catch (error) {
        return false
    }
}

const removeStorageFromCargo = async (cargo : Cargo, s : Storage) => {
    cargo.storageIDs.filter((storage) => {
        return storage !== s.storageID
    })
    try {
        const ref = await getCargoRef(cargo.cargoID)
        if(!ref) return false
        await updateDoc(ref, cargo as any)
        return true
    } catch (error) {
        return false
    }
}

const deleteCargo = async (cargo : Cargo) => {
    if(!confirm('Are you sure you want to delete')) return false
    try {
        const ref = await getCargoRef(cargo.cargoID)
        if(!ref) return false
        await deleteDoc(ref)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateCargoStatus = async (cargo : Cargo, status : string) => {
    if(status === '') return false
    if(!confirm('Are you sure you want to update')) return false
    try {
        cargo.status = status
        const ref = await getCargoRef(cargo.cargoID)
        if(!ref) return false
        await updateDoc(ref, cargo as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getCargoHandler = async () => {
    const docs = await getDocs(query(employees, where('role', '==', 'CargoHandlers')))
    return docs.docs.map(doc => doc.data() as Employee)
}



export { createCargo, getCargo, getCargoInfo, addStorageToCargo, removeStorageFromCargo, deleteCargo, updateCargoStatus, getCargoHandler } 
