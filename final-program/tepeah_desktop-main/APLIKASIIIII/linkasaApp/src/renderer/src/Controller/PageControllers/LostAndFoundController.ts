import {LostAndFoundItem} from "../Interfaces/LostAndFoundInterface";
import {uploadImage} from "../GeneralControls/FileController";
import { addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {lostAndFound} from "../FirebaseConfig/firebaseConfig";
import {createID} from "../GeneralControls/IDController";

const validateLogInformation = (information : LostAndFoundItem) : boolean => {
    // validate date claimed and found.
    console.log(information)
    return true
}
const addLostAndFoundItem = async (imageUpload : File, item : LostAndFoundItem) => {
  if (!validateLogInformation(item)) {
      alert('information is not valid')
      return false
  }
  const url = await uploadImage(imageUpload)
  if (url !== 'null') {
    item.photoUrl = url
    item.id = createID()
    await addDoc(lostAndFound, item)
    return true
  }
  return false
}

const getAllLog = async () : Promise<LostAndFoundItem[]> => {
  const logDocs = await getDocs(lostAndFound)
  const logs : LostAndFoundItem[] = []
  for (const log of logDocs.docs) {
    logs.push(log.data() as LostAndFoundItem)
  }
  return logs
}

const getLogInformationByID = async (id : string) : Promise<LostAndFoundItem | null> => {
  const docs = await getDocs(query(lostAndFound, where('id', '==', id)))
  if (docs.docs.length == 1) return docs.docs[0].data() as LostAndFoundItem
  return null
}

const getLogRef = async (id : string) => {
    const docs = await getDocs(query(lostAndFound, where('id', '==', id)))
    if (docs.docs.length == 1) return docs.docs[0].ref
    return null
}

const itemClaimedControl = async (item : LostAndFoundItem) => {
    if (!validateLogInformation(item)) {
        alert('invalid information')
        return
    }
    try {
        item.status = 'returned to owner'
        item.dateClaimed = item.dateClaimed
        const itemRef = await getLogRef(item.id)
        if (itemRef) {
            // @ts-ignore
            await updateDoc(itemRef, item)
            alert('success')
        }
    }
    catch (e) {
        console.log(e)
    }
}

const deleteLostAndFound = async (id : string) => {
  if(!confirm('Are you sure you want to delete')) return false
  const logRef = await getLogRef(id) 
  if(logRef) {
    await deleteDoc(logRef)
    return true
  }

  return false
} 

const updateLog = async (item : LostAndFoundItem, original : LostAndFoundItem, image : File) => {
  if (!validateLogInformation(item)) {
    alert('information is not valid')
    return false
  }
  const itemRef = await getLogRef(original.id)
  if (itemRef) {
    const url = await uploadImage(image)
    original.dateClaimed = item.dateClaimed
    original.photoUrl = url
    original.description = item.description
    original.locationFound = item.locationFound
    original.storageLocation = item.storageLocation
    await updateDoc(itemRef, original as any)
    return true
  }
  return false
}

export { addLostAndFoundItem, getAllLog, getLogInformationByID, itemClaimedControl, deleteLostAndFound, updateLog }


