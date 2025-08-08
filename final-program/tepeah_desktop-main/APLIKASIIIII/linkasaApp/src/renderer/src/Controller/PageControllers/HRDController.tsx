import { Timestamp, addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { employees } from "../FirebaseConfig/firebaseConfig";
import { makeUserInAuth } from "../GeneralControls/UserController";
import { Employee } from "../Interfaces/EmployeeInterface";
import {convertStringDateToTimeStamp, getAge} from "../GeneralControls/DateControl";


const validateEmployeeInformation = (employee : Employee) => {
    // check every value is inputted
    // age > 18
    if(employee.email === '' || employee.name === '' || employee.companyEmail === '') {
        alert('please fill in every information')
        return false 
    }
    else if(getAge(employee.dob) < 18) {
        alert('age must be 18 or more than 18')
        return false
    }

    return true
}

const createEmployee = async (employee : Employee, date : string) => {
    employee.dob = convertStringDateToTimeStamp(date)
    employee.companyEmail = generateEmail(employee.email)
    // employee.password = generatePassword(employee.companyEmail, employee.dob)
    employee.password = 'test123'
    try {
        if(!validateEmployeeInformation(employee)) return false
        if(!confirm('Are you sure role for the new employee '+ employee.email + ' is ' + employee.role)) return false
        if(!(await makeUserInAuth(employee.companyEmail, employee.password))) return false   
        await addDoc(employees, employee);
        return true
    } catch (error) {
        console.log(error);   
        return false
    }
}

const generateEmail = (email : string) : string => {
    const emailLeft = email.split('@')[0];
    const companyEmail = emailLeft + '@lk.com'
    return companyEmail
}

const generatePassword = (companyEmail : string, dob : Timestamp) : string => {
    const password = companyEmail.split('@')[0] + dob.toLocaleString();
    return password;
}

const deleteEmployeeByEmail = async (companyEmail : string) => {
    try {
        const docs = await getDocs(query(employees, where('companyEmail', '==', companyEmail)))
        console.log(docs.docs[0]);
        const docRef = docs.docs[0].ref
        console.log(docs.docs[0].data);
        console.log(docRef);
        await deleteDoc(docRef)
        alert('success')
    } catch (error) {
        console.log(error);
    }

}

export {validateEmployeeInformation, deleteEmployeeByEmail, createEmployee};
