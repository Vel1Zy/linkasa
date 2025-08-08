import {getDocs} from "firebase/firestore"
import {employees} from "../FirebaseConfig/firebaseConfig"

const checkConnection = async () => {
    const docs = await getDocs(employees)
    console.log(docs.docs.length);
    for(const d of docs.docs) {
        console.log(d.data());
    }
}

export { checkConnection}
