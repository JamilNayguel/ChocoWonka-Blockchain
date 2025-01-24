export interface Root {
    ok: boolean
    transactions: Transaction[]
}
  
export interface Transaction {
    id: number
    transaction_hash: string
    status: string
    amount: number
}
  