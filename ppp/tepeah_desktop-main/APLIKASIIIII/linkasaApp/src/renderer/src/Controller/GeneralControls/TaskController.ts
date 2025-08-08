import {addDoc, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {Cargo} from "../Interfaces/CargoInterface";
import {Task} from "../Interfaces/TaskInterface";
import {convertStringDateToTimeStamp, isPast} from "./DateControl";
import {createID} from "./IDController";
import {taskCollection} from "../FirebaseConfig/firebaseConfig";
import {Schedule} from "../Interfaces/EmployeeInterface";
import {addSchedule, removeEmployeeSchedule} from "./EmployeeController";
import {getEmployeeInformation} from "../PageControllers/LoginControllers";

const validateTask = async (task : Task) => {
    if(isPast(task.date)) {
        alert('date cannot be past')
        return false
    }
    else if(task.handler === '') {
        alert('handler cannot be empty')
        return false
    }
    else if(task.desc === ''){
        alert('description cannot be empty')
        return false
    }

    return true
}

const createTask = async (date : string, handler : string, task : string, cargo : Cargo) => {
    const scheduleID = 'schedule-' + createID()
    const newTask : Task = {
        scheduleID : scheduleID,
        taskID : 'task-' + createID(),
        handler : handler,
        desc : task,
        cargoID : cargo.cargoID,
        date : convertStringDateToTimeStamp(date)
    }
    if(!validateTask(newTask)) return false
    try {
        await addDoc(taskCollection, newTask)
        const schedule : Schedule = {
            scheduleID : newTask.scheduleID,
            task : "handling cargo for this task " + task,
            date : newTask.date
        }
        const employee = await getEmployeeInformation(handler)
        await addSchedule(employee, schedule)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getTaskOfCargo = async (id : string) => {
    const docs = await getDocs(query(taskCollection, where('cargoID', '==', id)))
    return docs.docs.map(doc => doc.data() as Task)
}

const getTaskRef = async (id : string) => {
    const docs = await getDocs(query(taskCollection, where('taskID', '==', id)))
    return docs.docs[0].ref
}

const deleteTask = async (task : Task) => {
    if(!confirm('Are you sure you want to delete this task')) return false
    try {
        const taskRef = await getTaskRef(task.taskID)
        if(!taskRef) return false   
        await removeEmployeeSchedule(task.handler, task.scheduleID)
        await deleteDoc(taskRef)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateTask = async (task : Task, handler : string, date : string, desc : string) => {
    if(!confirm('are you sure you want to update')) return false
    try {
        const taskRef = await getTaskRef(task.taskID)
        // old handler
        await removeEmployeeSchedule(task.handler, task.scheduleID)
        // new handler
        const schedule : Schedule = {
            scheduleID : task.scheduleID,
            task : "handling cargo for this task " + desc,
            date : convertStringDateToTimeStamp(date)
        }
        const employee = await getEmployeeInformation(handler)
        await addSchedule(employee, schedule)
        task.handler = handler
        task.desc = desc
        task.date = convertStringDateToTimeStamp(date)
        if(!validateTask(task)) return false
        await updateDoc(taskRef, task as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export { createTask, getTaskOfCargo, deleteTask, updateTask }
