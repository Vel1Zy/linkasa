import {Timestamp, addDoc} from "firebase/firestore"
import {DepartmentChat, PrivateChat} from "../Interfaces/ChatInterface"
import {Employee} from "../Interfaces/EmployeeInterface"
import {departmentMessage, privateMessages} from "../FirebaseConfig/firebaseConfig"

const chatGlobalChat = () => {

}

const departmentChat = async (deparment : string, message : string, user : Employee) => {
    try {
        const chat : DepartmentChat = {
            department : deparment,
            message : message,
            createdAt : Timestamp.fromDate(new Date()),
            user : user
        }
        await addDoc(departmentMessage, chat);

        return true   
    } catch (error) {
        return false   
    }
}

const privateChat =async (user : Employee, staff: string, message : string) => {
    try {
        const chat : PrivateChat = {
            to : staff, 
            user : user,
            from : user.companyEmail,
            message : message,
            createdAt : Timestamp.fromDate(new Date())
        }   
        console.log(chat);
        await addDoc(privateMessages, chat)
        return true
    } catch (error) {
        console.log(error);
        return false     
    }
}


export { chatGlobalChat, departmentChat, privateChat }
