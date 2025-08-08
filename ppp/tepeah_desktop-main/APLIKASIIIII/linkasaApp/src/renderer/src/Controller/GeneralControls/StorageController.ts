import {addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {createID} from "./IDController"
import {storageCollection} from "../FirebaseConfig/firebaseConfig"
import {Storage} from "../Interfaces/StorageInterface"
import {addStorageToCargo, removeStorageFromCargo} from "./CargoController"
import {Cargo} from "../Interfaces/CargoInterface"
import {Item} from "../Interfaces/ItemInterface"

const createStorage = async (cargo : Cargo, location : string, maxWeight : number) => {

    const storage : Storage = {
        cargoID : cargo.cargoID,
        storageID :'storage-' + createID(),
        items : [],
        maxWeight : maxWeight,
        currentWeight : 0,
        location : location,
    }

    try {
        console.log(storage);
        await addDoc(storageCollection, storage)
        await addStorageToCargo(cargo, storage)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getStorageOfCargo = async (cargo : Cargo) => {
    const storages = await getDocs(query(storageCollection, where('cargoID', '==', cargo.cargoID)));
    return storages.docs.map(doc => doc.data() as Storage)
}


const getStorageRef = async (id : string) => {
    const data = await getDocs(query(storageCollection, where('storageID', '==', id)));
    return data.docs[0].ref
}

const getStorageInfo = async (id : string) => {
    const data = await getDocs(query(storageCollection, where('storageID', '==', id)));
    return data.docs[0].data() as Storage
}

const deleteStorage = async (storage : Storage, cargo : Cargo) => {
    if(!confirm('Are you sure you want to delete')) return false
    try {
        const ref = await getStorageRef(storage.storageID)
        if(ref) {
            await removeStorageFromCargo(cargo, storage)
            await deleteDoc(ref)
            return true
        }
        return false
    } catch (error) {
        console.log(error);
        return false
    }
}

const addItemToStorage = async (storage : Storage, item : Item) => {
    storage.items.push(item.itemID)
    storage.currentWeight += item.weight
    console.log(storage.currentWeight);
    if(storage.currentWeight > storage.maxWeight) {
        alert('you cannot add more, storage is full')
        return false
    }
    else {
        try {
            const ref = await getStorageRef(storage.storageID)
            if(!ref) return false
            await updateDoc(ref, storage as any)
            return true
        } catch (error) {
            return false
        }
    }
    
}

const removeItemFromStorage = async (storage : Storage, i : Item) => {
    storage.items.filter((item) => {
        return item !== i.itemID
    })
    try {
        storage.currentWeight -= i.weight
        const ref = await getStorageRef(storage.storageID)
        if(!ref) return false
        await updateDoc(ref, storage as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateStorage = async (storage : Storage, location : string, maxWeight : number) => {
    if(!confirm('Are you sure you want to update')) return false
    try {
        storage.location = location
        storage.maxWeight = maxWeight
        const ref = await getStorageRef(storage.storageID)
        if(!ref) return false
        await updateDoc(ref, storage as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export { createStorage, getStorageOfCargo, deleteStorage, getStorageInfo, addItemToStorage, updateStorage, removeItemFromStorage }
