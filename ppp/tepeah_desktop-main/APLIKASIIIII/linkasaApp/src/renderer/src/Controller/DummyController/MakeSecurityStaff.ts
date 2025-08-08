import {faker} from "@faker-js/faker"
import {Employee} from "../Interfaces/EmployeeInterface"
import {Timestamp, addDoc} from "firebase/firestore"
import {auth, employees} from "../FirebaseConfig/firebaseConfig"
import {createUserWithEmailAndPassword} from "firebase/auth"

const makeSecurityStaff = async () => {
    for(let i = 0; i < 20; i++){
        const name = faker.person.fullName()
        const staff : Employee = {
            name : name,
            dob : Timestamp.fromDate(faker.date.past({years : 30})),
            gender : 'Male',
            email : name.split(' ')[0] + '@gmail.com',
            companyEmail : name.split(' ')[0] + '@lk.com',
            password : 'test123',
            role : 'LandsideOperationsStaff',
            schedule : []
        }
        // await createUserWithEmailAndPassword(auth, staff.companyEmail, staff.password)
        await addDoc(employees, staff)
    }
}

export { makeSecurityStaff }
