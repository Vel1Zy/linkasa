import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";

const makeUserInAuth = async (email : string, password : string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;   
    } catch (error) {
        console.log(error);
        return false;   
    }
}



export { makeUserInAuth }
