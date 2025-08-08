import {Plane} from "../Interfaces/PlaneInterface";
import {addDoc} from "firebase/firestore";
import {planes} from "../FirebaseConfig/firebaseConfig";

const planeArray : Plane[] = [
    { id: "001", name: "Boeing 747", passengerLimit: 660 },
    { id: "002", name: "Airbus A380", passengerLimit: 853 },
    { id: "003", name: "Cessna 172", passengerLimit: 4 },
    { id: "004", name: "Bombardier Global 7500", passengerLimit: 19 },
    { id: "005", name: "Embraer Phenom 300", passengerLimit: 10 },
    { id: "006", name: "Lockheed Martin F-22 Raptor", passengerLimit: 0 },
    { id: "007", name: "Boeing B-52 Stratofortress", passengerLimit: 8 },
    { id: "008", name: "Piper PA-28 Cherokee", passengerLimit: 4 },
    { id: "009", name: "Airbus A320", passengerLimit: 240 },
    { id: "010", name: "Gulfstream G650", passengerLimit: 19 },
    { id: "011", name: "Cirrus SR22", passengerLimit: 5 },
    { id: "012", name: "Boeing 737", passengerLimit: 230 },
    { id: "013", name: "Cessna Citation X", passengerLimit: 12 },
    { id: "014", name: "Airbus A350", passengerLimit: 440 },
    { id: "015", name: "Beechcraft King Air 350i", passengerLimit: 11 },
    { id: "016", name: "Boeing 777", passengerLimit: 550 },
    { id: "017", name: "Diamond DA42", passengerLimit: 4 },
    { id: "018", name: "Pilatus PC-12", passengerLimit: 9 },
    { id: "019", name: "F-35 Lightning II", passengerLimit: 1 },
    { id: "020", name: "Airbus A330", passengerLimit: 335 },
    { id: "021", name: "Cessna Caravan", passengerLimit: 14 },
    { id: "022", name: "Boeing 767", passengerLimit: 375 },
    { id: "023", name: "Dassault Falcon 7X", passengerLimit: 16 },
    { id: "024", name: "Mooney M20", passengerLimit: 4 },
    { id: "025", name: "Airbus A321", passengerLimit: 240 },
    { id: "026", name: "Boeing 787 Dreamliner", passengerLimit: 330 },
    { id: "027", name: "Bombardier Learjet 75", passengerLimit: 9 },
    { id: "028", name: "Cessna 208 Caravan", passengerLimit: 13 },
    { id: "029", name: "Antonov An-225 Mriya", passengerLimit: 0 },
    { id: "030", name: "Piaggio P180 Avanti", passengerLimit: 9 },
    { id: "031", name: "Airbus A340", passengerLimit: 440 },
    { id: "032", name: "Beechcraft Baron G58", passengerLimit: 6 },
    { id: "033", name: "Boeing 757", passengerLimit: 239 },
    { id: "034", name: "Embraer E190", passengerLimit: 114 },
    { id: "035", name: "Hawker 4000", passengerLimit: 12 },
    { id: "036", name: "Cessna 182 Skylane", passengerLimit: 4 },
    { id: "037", name: "Airbus A319", passengerLimit: 160 },
    { id: "038", name: "Piper M350", passengerLimit: 6 },
    { id: "039", name: "Boeing 717", passengerLimit: 134 },
    { id: "040", name: "Daher TBM 930", passengerLimit: 6 },
    { id: "041", name: "Bombardier Challenger 300", passengerLimit: 9 },
    { id: "042", name: "Diamond DA20 Katana", passengerLimit: 2 },
    { id: "043", name: "Airbus A310", passengerLimit: 280 },
    { id: "044", name: "Cirrus Vision SF50", passengerLimit: 7 },
    { id: "045", name: "Boeing 747-8", passengerLimit: 467 },
    { id: "046", name: "Piper Navajo", passengerLimit: 7 },
    { id: "047", name: "Airbus A300", passengerLimit: 345 },
    { id: "048", name: "Cessna Citation CJ4", passengerLimit: 10 },
    { id: "049", name: "Grumman G-21 Goose", passengerLimit: 6 },
    { id: "050", name: "Robinson R44", passengerLimit: 4 },
];

const pushData = async () => {
    for (const plane of planeArray) {
        await addDoc(planes, plane)
    }
}

export { pushData }
