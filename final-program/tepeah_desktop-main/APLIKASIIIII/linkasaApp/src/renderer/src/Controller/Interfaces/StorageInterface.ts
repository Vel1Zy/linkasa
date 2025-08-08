
interface Storage {
    cargoID : string,
    storageID : string,
    items : string[],
    maxWeight : number,
    currentWeight : number,
    location : string,
}

export type { Storage }
