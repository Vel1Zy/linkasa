import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDl00f8P9GVrAP9UOyL8w6a2fqmiBqnIJM",
    authDomain: "linkasalm.firebaseapp.com",
    projectId: "linkasalm",
    storageBucket: "linkasalm.appspot.com",
    messagingSenderId: "141748212812",
    appId: "1:141748212812:web:4e9b78fe7fccd6efb110e9",
    measurementId: "G-JKLH08LQ6X"
};

// const firebaseConfig = { // second one 
//     apiKey: "AIzaSyD2EhbruqKtL2gGF-QJMk-AG4PTe9yyiDM",
//     authDomain: "secondlinkasa.firebaseapp.com",
//     projectId: "secondlinkasa",
//     storageBucket: "secondlinkasa.appspot.com",
//     messagingSenderId: "812469104997",
//     appId: "1:812469104997:web:5374dd5e99ba1fa154f18c",
//     measurementId: "G-YR3683EQXS"
// };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const firestore = getFirestore(app);
const employees = collection(firestore, 'employees');
const lostAndFound = collection(firestore, 'lostandfound')
const planes = collection(firestore, 'planes')
const refuelingSchedule= collection(firestore, 'refuelingschedule')
const visas = collection(firestore, 'visa')
const passports = collection(firestore, 'passport')
const passengerCollection = collection(firestore, 'passenger')
const flights = collection(firestore, 'flights')
const crews= collection(firestore, 'crews')
const maintenanceCrews = collection(firestore, 'maintenanceCrews')
const maintenanceSchedules = collection(firestore, 'maintenanceSchedules')
const globalMessage = collection(firestore, 'messages')
const departmentMessage = collection(firestore, 'departmentMessages')
const privateMessages = collection(firestore, 'privateMessages')
const baggageCollection = collection(firestore, 'baggages')
const maintenanceRequestCollection = collection(firestore, 'maintenanceRequestCollection')
const notificationsCollection = collection(firestore, 'notifications')
const securityIncidentCollection = collection(firestore, 'securityIncident')
const jobDetailCollection = collection(firestore, 'jobDetails')
const jobOfferCollection = collection(firestore, 'jobOffers')
const cargoCollection = collection(firestore, 'cargo')
const storageCollection = collection(firestore, 'storage')
const itemCollection = collection(firestore, 'item')
const taskCollection = collection(firestore, 'cargoTasks')
const logisticCollection = collection(firestore, 'logistic')
const logisticReportCollection = collection(firestore, 'logisticReport')
const feedbackFormCollection = collection(firestore, 'feedbackFormCollection')
const financialRequestCollection = collection(firestore, 'financialRequestCollection')

const storage = getStorage(app);


export { app, auth, firestore, storage, employees, lostAndFound, planes, refuelingSchedule, visas, passports, passengerCollection, flights, crews, maintenanceCrews, maintenanceSchedules, globalMessage, privateMessages, departmentMessage, baggageCollection, maintenanceRequestCollection, notificationsCollection, securityIncidentCollection, jobDetailCollection, jobOfferCollection, cargoCollection, storageCollection, itemCollection, taskCollection, logisticCollection, logisticReportCollection, feedbackFormCollection, financialRequestCollection }
