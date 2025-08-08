import {faker} from "@faker-js/faker";
import {Employee} from "../Interfaces/EmployeeInterface";
import {Crew} from "../Interfaces/CrewInterface";
import {addDoc, getDocs, updateDoc} from "firebase/firestore";
import {crews, employees, maintenanceCrews} from "../FirebaseConfig/firebaseConfig";
import {createID} from "../GeneralControls/IDController";
import {MaintenaceCrew} from "../Interfaces/MaintenanceInterface";

const MakeCrew = async () => {
    for (let i = 0; i < 30; i++) {
        const pilot = makePilot()
        await addDoc(employees, pilot)
        const attendants : string[] = []
        for (let j = 0; j < 3; j++) {
            const attendant = makeFlightAttendant()
            await addDoc(employees, attendant)
            attendants.push(attendant.companyEmail)
        }
        const crew : Crew = {
            crewID : createID(),
            crewName : faker.vehicle.vehicle(),
            pilot : pilot.companyEmail,
            flightAttendants : attendants,
            schedule : []
        }
        await addDoc(crews, crew)
    }
}

const makePilot = () : Employee => {
    const name = faker.person.fullName()
    return {
        name : name,
        dob : faker.date.past({years : 30}),
        gender : 'Male',
        email : name.split(' ')[0] + '@gmail.com',
        companyEmail : name.split(' ')[0] + '@lk.com',
        password : faker.person.middleName(),
        role : 'Pilot',
        schedule : []
    }
}


const makeFlightAttendant = () : Employee => {
    const name = faker.person.fullName()
    return {
        name : name,
        dob : faker.date.past({years : 30}),
        gender : 'Male',
        email : name.split(' ')[0] + '@gmail.com',
        companyEmail : name.split(' ')[0] + '@lk.com',
        password : faker.person.middleName(),
        role : 'FlightAttendant',
        schedule : []
    }
}
const fixCrew = async () => {
    const crewDocs = await getDocs(crews)
    for (const doc of crewDocs.docs) {
        const crew = doc.data() as Crew
        crew.schedule = []
        await updateDoc(doc.ref, crew as any)
    }
}

const makeMaintenanceCrew = async () => {
    console.log('make maintenance crew');
    for(let i = 0; i < 10; i++){
        const crew : string[] = []
        for(let k = 0; k < 3; k++){
            const email = faker.color.human()
            const employee : Employee = {
                name : faker.person.firstName(),
                email : faker.company.catchPhrase(),
                gender : 'Female',
                dob : faker.date.past({years : 20}),
                companyEmail : email + '@lk.com',
                password : email,
                schedule : [],
                role : 'MaintenanceStaff'
            }
            await addDoc(employees, employee)
            crew.push(employee.companyEmail)
        }
        const maintenanceCrew : MaintenaceCrew = {
            crewID : 'maintenanceCrew-' + createID(),
            crewName : faker.vehicle.bicycle(),
            crewEmails : crew,
            schedule : []
        }
        await addDoc(maintenanceCrews, maintenanceCrew)
    }
}

const fixMaintenance = async() => {
    const docs = await getDocs(maintenanceCrews)

    for(const doc of docs.docs) {
        const crew = doc.data() as MaintenaceCrew
        crew.crewID = 'crew-' + createID()
        await updateDoc(doc.ref, crew as any)
    }
}

export { MakeCrew, fixCrew, makeMaintenanceCrew, fixMaintenance }
