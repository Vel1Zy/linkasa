import {Timestamp} from "firebase/firestore"

const currentDate = new Date()

const isFuture = (date : Timestamp) => {
    return date.seconds * 1000 > currentDate.getTime()
}

const isPast = (date : Timestamp) => {
    return date.seconds * 1000 < currentDate.getTime()
}

const convertTimeStampToDate = (seconds : number) : Date => {
    return new Date(seconds * 1000)
}

const convertStringDateToTimeStamp = (str : string) => {
    console.log(str);
    const time = Timestamp.fromDate(new Date(str))
    console.log(time);
    return time
}

const utc = (sec : number) => {
    return convertTimeStampToDate(sec).toUTCString()
}

const getAge = (date : Timestamp) => { 
    const dob = new Date(date.seconds * 1000)
    const currentDate = new Date()
    return currentDate.getFullYear() - dob.getFullYear()
}


export { isPast, isFuture, convertTimeStampToDate, convertStringDateToTimeStamp, utc, getAge }
