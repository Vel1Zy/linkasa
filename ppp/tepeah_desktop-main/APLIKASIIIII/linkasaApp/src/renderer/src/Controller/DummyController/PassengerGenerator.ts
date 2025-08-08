import {Passenger} from "../Interfaces/PassengerInterface";
import {Timestamp, addDoc, getDocs, updateDoc} from "firebase/firestore";
import {passengerCollection } from "../FirebaseConfig/firebaseConfig";
import {createID} from "../GeneralControls/IDController";
import {faker} from "@faker-js/faker";

const makePassenger = async () => {
    console.log('here');
    for(let i = 0 ; i < 10; i++){
        const name = faker.person.firstName()
        const passenger : Passenger = {
            passengerID : 'passenger-' + createID(),
            name : name,
            email : name + '@gmail.com',
            sex : 'Male',
            dob : Timestamp.fromDate(faker.date.past({years : 20})),
            password : 'test123',
            phoneNumber : '081808452411',
            passportID : null,
            visaID: null
        }
        await addDoc(passengerCollection, passenger)
    }
}

const fixPassenger = async () => {
    const snapshots = await getDocs(passengerCollection)
    for (const doc of  snapshots.docs) {
        const passenger = doc.data() as Passenger
        passenger.sex = 'Male'
        await updateDoc(doc.ref, passenger as any)
    }
}

export { fixPassenger, makePassenger }

