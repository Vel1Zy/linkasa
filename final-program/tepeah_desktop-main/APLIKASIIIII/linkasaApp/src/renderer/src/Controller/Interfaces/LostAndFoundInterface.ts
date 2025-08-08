import {Timestamp} from "firebase/firestore"

type LostAndFoundItemStatus = 'unclaimed' | 'returned to owner'

interface LostAndFoundItem {
    id : string,
    photoUrl : string,
    locationFound : string,
    description : string,
    storageLocation : string,
    dateFound : Timestamp,
    dateClaimed : Timestamp | null,
    status : LostAndFoundItemStatus
}

export type { LostAndFoundItem, LostAndFoundItemStatus}
