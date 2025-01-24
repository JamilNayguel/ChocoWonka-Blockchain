export interface Root {
  ok: boolean
  products: Product[]
}

export interface Product {
  image(image: any): unknown
  id: number
  name: string
  price: number
  category_id: number
  path: string
}