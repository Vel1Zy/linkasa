
export const baggageClaimStatus = ['received for transport' , 'in transit' , 'ready for pick up' , 'claimed by passenger']

export const baggageSecurityStatus = ['checked' , 'loading' , 'transferred' , 'in transit' , 'unloading' , 'received' , 'delayed']

interface Baggage {
    baggageID : string,
    passengerID : string,
    flightID : string,
    weight : number,
    length : number,
    width : number,
    height : number,
    baggageClaimStatus : 'received for transport' | 'in transit' | 'ready for pick up' | 'claimed by passenger',
    baggageSecurityStatus : 'checked' | 'loading' | 'transferred' | 'in transit' | 'unloading' | 'received' | 'delayed'
}

export type { Baggage }
