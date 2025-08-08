import locationsArray, {Flight} from "../Interfaces/FlightInterface";
import {createID} from "./IDController";
import {Timestamp, addDoc, deleteDoc, getDocs, orderBy, query, updateDoc, where} from "firebase/firestore";
import {crews, flights} from "../FirebaseConfig/firebaseConfig";
import { convertTimeStampToDate, isPast }  from "./DateControl";
import {Crew} from "../Interfaces/CrewInterface";
import {Schedule} from "../Interfaces/EmployeeInterface";
import {addSchedule, getEmployeeDocRef, getEmployeeInformationByEmail} from "./EmployeeController";
import {Passenger} from "../Interfaces/PassengerInterface";
import {getPlaneInfo} from "./PlaneController";

const validateFlight = async (flight : Flight) => {
    if (isPast(flight.boardingTime)) {
        alert('cannot create flight schedule on the past')
        return false
    }
    const flights = await getAllFlightSchedule()
    for (const f of flights) {
        if (f.flightID == flight.flightID && f.boardingTime === flight.boardingTime) {
            alert('the same airplane is being used on that time')
            return false
        }
    }
    return true
}

const validateInput = (source : string, destination : string, boardingTime : string, duration : number, planeID : string) => {
    if (source === '' || destination === '' || boardingTime === '' || planeID === '' || duration === -1) return false
    return true
}

const createFlightSchedule = async (source : string,  destination : string,  boardingTime : string,  duration : number, planeID : string) => {
    if (!validateInput(source,  destination, boardingTime, duration, planeID)) {
        alert('Input every field plis')
        return
    }
    const date = new Date(boardingTime)
    const flight : Flight = {
        flightID : createID(),
        source : locationsArray[parseInt(source) - 1],
        destination : locationsArray[parseInt(destination) - 1],
        boardingTime : Timestamp.fromDate(date),
        duration : duration,
        planeID : planeID,
        passengerIDs : [],
        crewID : null,
        baggageIDs : [],
        status : 'in-transit'
    }
    if (await validateFlight(flight)) await addDoc(flights, flight)
}

const updateFlightSchedule = async (flight : Flight, source : string,  destination : string,  boardingTime : string,  duration : number, planeID : string) => {
    if (!validateInput(source,  destination, boardingTime, duration, planeID)) {
        alert('Input every field plis')
        return false
    }
    try {
        const date = Timestamp.fromDate(new Date(boardingTime))
        flight.boardingTime = date
        flight.source = locationsArray[parseInt(source) - 1]
        flight.destination = locationsArray[parseInt(destination) - 1]
        flight.planeID = planeID
        flight.duration = duration
        const flightRef = await getFlightRef(flight)
        if (await validateFlight(flight)) await updateDoc(flightRef, flight as any)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const updateFlightCrewSchedule =async (crewID : string, date : Timestamp) => {
    const crew = await getCrewData(crewID)
    crew.schedule = crew.schedule.filter((element) => {
        return element.date != date
    })

    const pilot = await getEmployeeInformationByEmail(crew.pilot)
    if(pilot) {
        pilot.schedule = pilot.schedule.filter((s) => {
            return s.date != date
        })
        const pilotRef = await getEmployeeDocRef(pilot.companyEmail)
        if(pilotRef) await updateDoc(pilotRef, pilot as any)
    }
    
    const crewRef = await getCrewRef(crew.crewID)
    if(crewRef) await updateDoc(crewRef, crew as any)
    for(const email of crew.flightAttendants) {
        const employee = await getEmployeeInformationByEmail(email)
        if(employee) {
            const docRef = await getEmployeeDocRef(employee.companyEmail)
            employee.schedule = employee.schedule.filter((element) => {
                return element.date != date
            })
            if(docRef) await updateDoc(docRef, employee as any)
        }
    }
}


const deleteFlightSchedule = async(flight : Flight) => {
    if(!confirm('you sure')) return false
    const flightRef = await getFlightRef(flight)
    if(flight.crewID) updateFlightCrewSchedule(flight.crewID, flight.boardingTime)
    try {
        await deleteDoc(flightRef)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const getAllFlightSchedule = async () => {
    const fs : Flight[] = []
    const docs = await getDocs(query(flights, orderBy('boardingTime', 'asc')))
    for (const doc of docs.docs) {
        const data = doc.data() as Flight
        fs.push(data)
    }

    return fs
}

const getFlightInfoByID = async (flightID : string) => {
    console.log(flightID);
    const docs = (await getDocs(query(flights, where('flightID', '==', flightID)))).docs
    if (docs.length == 1) return docs[0].data() as Flight
    return null
}

const getAvailableCrews = async (flight : Flight) => {
    const crewArray : Crew[] = []
    const crewDocs = await getDocs(crews)
    for (const doc of crewDocs.docs) {
        const crew = doc.data() as Crew
        const schedules = crew.schedule
        if (schedules.length == 0) {
            crewArray.push(crew)
            continue
        }
        for (const schedule of schedules) {
            if (!(schedule.date == flight.boardingTime)) {
                crewArray.push(crew)
            }
        }
    }

    return crewArray
}
const getFlightRef = async (flight : Flight) => {
    const doc = (await getDocs(query(flights, where('flightID', '==', flight.flightID)))).docs[0]
    return doc.ref
}

const getCrewRef = async (crewID: string) => {
    const doc = (await getDocs(query(crews, where('crewID', '==', crewID)))).docs[0]
    return doc.ref
}

const getCrewData = async (crewID: string) => {
    const doc = (await getDocs(query(crews, where('crewID', '==', crewID)))).docs[0]
    return doc.data() as Crew
}

const addScheduleToCrews = async (crew : Crew, schedule : Schedule) => {
    const pilot = await getEmployeeInformationByEmail(crew.pilot)
    if (pilot) await addSchedule(pilot, schedule)

    for (const attendant of crew.flightAttendants) {
        const employee = await getEmployeeInformationByEmail(attendant)
        if (employee) await addSchedule(employee, schedule)
    }
}

const validateCrewAvailability = async (flight : Flight, crew : Crew) => {
    const flightDate = convertTimeStampToDate(flight.boardingTime.seconds)  
    const month = flightDate.getMonth()
    const year = flightDate.getFullYear()
    const date = flightDate.getDate()

    for(const s of crew.schedule) {
        const d = convertTimeStampToDate(s.date.seconds)
        if(d.getMonth() === month && d.getFullYear() === year && d.getDate() === date) {
            return false
        }
    }

    return true
}
    



const assignCrewToFlight = async (flight : Flight,  crewID : string) => {
    try {
        const flightRef = await getFlightRef(flight)
        const crewRef= await getCrewRef(crewID)
        const crewData = await getCrewData(crewID)
        if(!validateCrewAvailability(flight, crewData)) return false
        const schedule : Schedule = {
            scheduleID : 'schedule-' + createID(),
            task : 'Flight Attendant for ' + flight.flightID,
            date : flight.boardingTime
        }
        crewData.schedule.push(schedule)
        flight.crewID = crewID
        await addScheduleToCrews(crewData, schedule)
        await updateDoc(flightRef, flight as any)
        await updateDoc(crewRef, crewData as any)   
        return true
    } catch (error) {
        console.log(error); 
        return false
    }
}

const getFlightsForPassenger = async (passenger : Passenger) => {
    const flightDocs = await getDocs(flights)
    const flightForPassenger : Flight[] = []
    for (const doc of flightDocs.docs) {
        const data = doc.data() as Flight
        const plane = await getPlaneInfo(data.planeID) 
        if(data.passengerIDs.length == 0) {
            flightForPassenger.push(data)
            continue
        }
        else if(plane && data.passengerIDs.length >= plane?.passengerLimit)
        for (const id of data.passengerIDs) {
            if (!(id == passenger.passengerID)) flightForPassenger.push(data)
        }
    }
    return flightForPassenger
}

const validatePassenger = (passenger : Passenger, flight : Flight) => {
    for(const email of flight.passengerIDs) {
        if(email === passenger.email) return true
    }
    return false
}

const addPassengerToFlight = async (pass : Passenger, flight : Flight) => {
    try {
        flight.passengerIDs.push(pass.email)
        const flightRef = await getFlightRef(flight)   
        if(flightRef) updateDoc(flightRef, flight as any)
        return true
    } catch (error) {
        console.log(error);    
        return false
    }
}

const deleteFlightCrewFromFlight = async (flight: Flight, crew : Crew) => {
    const confirmation = confirm('are you sure you want to delete the crew from the maintenance schedule')
    if(!confirmation) return false
    try {
        if(!flight.crewID) return false
        await updateFlightCrewSchedule(flight.crewID, flight.boardingTime)
        flight.crewID = null
        const maintenanceRef = await getFlightRef(flight)
        await updateDoc(maintenanceRef, flight as any)   
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}



export { createFlightSchedule, getAllFlightSchedule, getFlightInfoByID, getAvailableCrews, assignCrewToFlight, getCrewData, getFlightsForPassenger, addPassengerToFlight, validatePassenger, updateFlightSchedule, deleteFlightSchedule, deleteFlightCrewFromFlight, getFlightRef }
