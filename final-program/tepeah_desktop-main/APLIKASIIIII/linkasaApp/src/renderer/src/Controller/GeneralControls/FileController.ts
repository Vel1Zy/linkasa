import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from '../FirebaseConfig/firebaseConfig'

const uploadImage = async (file : File) => {
  try{
    const storageRef = ref(storage, 'images/' + file.name)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  } catch (error) {
    console.log(error)
  }

  return 'null'
}

export { uploadImage }
