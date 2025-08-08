
export interface Cargo {
    cargoID : string,
    storageIDs : string[],
    location : string,
    status : string
}

export const cargoStatus : string[] = [
    "awaiting pickup",
    "in transit",
    "under inspection",
    "stored",
    "delayed",
    "delivered",
    "damaged",
    "lost",
    "pending customs"
];
