import {addDoc, deleteDoc, getDocs, query, where} from "firebase/firestore"
import {Item} from "../Interfaces/ItemInterface"
import {Storage} from "../Interfaces/StorageInterface"
import {createID} from "./IDController"
import {itemCollection} from "../FirebaseConfig/firebaseConfig"
import {addItemToStorage, removeItemFromStorage} from "./StorageController"


const createItem = async (storage : Storage ,name : string, weight : number) => {
    const item : Item = {
        storageID : storage.storageID,
        itemID : 'item-' + createID(),
        name : name,
        weight : weight
    }
    try {
        const success = await addItemToStorage(storage, item)
        if(success) {
            await addDoc(itemCollection, item)
            return true
        } 
        return false
    } catch (error) {
        return false
    }
}

const getItemFromStorage = async (storage : Storage) => {
    const items = await getDocs(query(itemCollection, where('storageID', '==', storage.storageID)));
    return items.docs.map(doc => doc.data() as Item)
}

const getItemRef = async (id : string) => {
    const data = await getDocs(query(itemCollection, where('itemID', '==', id)));
    return data.docs[0].ref
}

const deleteItemFromStorage = async (storage : Storage, item : Item) => {
    if(!confirm('Are you sure you want to delete this item?')) return false
    else {
        try {
            const itemRef = await getItemRef(item.itemID)
            if(!itemRef) return false
            await deleteDoc(itemRef)
            await removeItemFromStorage(storage, item)
            return true
        } catch (error) {
            console.log(error);            
            return false
        }
    }    
}

export { createItem, getItemFromStorage, deleteItemFromStorage }
