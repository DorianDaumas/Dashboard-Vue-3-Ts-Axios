interface Reviews {
  comment: string
  reviewerName: string
  rating: number
}

interface Product {
  id: number
  title: string
  description: string
  brand: string
  price: number
  category: string
  sku: string
  stock: number
  thumbnail: string
  returnPolicy: string
  warrantyInformation: string
  weight: number
  shippingInformation: string
  rating: number
  reviews: Reviews[]
  tags: string[]
  images: string[]
}

export interface ProductType {
  productDetail: Product
}

export const productDetailSchema = {
  productDetail: {
    id: 0,
    title: '',
    sku: '',
    category: '',
    description: '',
    thumbnail: '',
    brand: '',
    price: 0,
    stock: 0,
    rating: 0,
    returnPolicy: '',
    warrantyInformation: '',
    weight: 0,
    shippingInformation: '',
    tags: [],
    reviews: [],
    images: []
  }
}
