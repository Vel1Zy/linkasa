
interface FinancialRequest {
    requestID : string,
    purpose : string,
    spending : number,
    department : string,
    revision : string[],
    status : 'Pending' | 'Accepted' | 'Rejected' | 'Revised',
    by : string
}

export type { FinancialRequest }
