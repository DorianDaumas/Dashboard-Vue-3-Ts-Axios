interface Products {
  id: number
  title: string
  description: string
  brand: string
  price: number
  stock: number
  rating: number
  tags: string[]
  images: string[]
  thumbnail: string
  reviews?: string[]
}

export interface ProductsListType {
  products: Products[]
  total: number
}

export const productSchema = {
  products: [
    {
      id: 0,
      title: '',
      description: '',
      brand: '',
      price: 0,
      stock: 0,
      rating: 0,
      tags: [],
      images: [],
      thumbnail: '',
      reviews: []
    }
  ],
  total: 0
}
