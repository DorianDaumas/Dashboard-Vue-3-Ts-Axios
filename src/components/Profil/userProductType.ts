export interface userProductType {
  userProduct: {
    id: number
    total: number
    products: {
      id: number
      title: string
      price: number
      quantity: number
      description: string
      total: number
      discountPercentage: number
      discountedTotal: number
      rating: number
      thumbnail: string
    }[]
  }
}

export const userProductSchema = {
  userProduct: {
    id: 0,
    total: 0,
    products: [
      {
        id: 0,
        title: '',
        price: 0,
        quantity: 0,
        total: 0,
        description: '',
        discountPercentage: 0,
        discountedTotal: 0,
        rating: 0,
        thumbnail: ''
      }
    ]
  }
}
