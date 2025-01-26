export interface Root {
    items: Item[]
    total_price: number
  }
  
  export interface Item {
    productId: number
    quantity: number
    price: number
    name: string
  }
