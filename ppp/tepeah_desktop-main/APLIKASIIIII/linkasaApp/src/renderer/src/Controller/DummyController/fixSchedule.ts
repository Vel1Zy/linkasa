import {getDocs, updateDoc} from "firebase/firestore"
import {employees} from "../FirebaseConfig/firebaseConfig"
import {Employee} from "../Interfaces/EmployeeInterface"
import {createID} from "../GeneralControls/IDController"

const fixSchedule = async () => {
    console.log('here');
    const docs = await getDocs(employees)
    console.log(docs);
    for(const doc of docs.docs) {
        const employee = doc.data() as Employee
        for(const s of employee.schedule) {
            s.scheduleID = 'schedule-' + createID()
        }
        await updateDoc(doc.ref, employee as any)
        console.log('success');
    }
}

export {fixSchedule}
