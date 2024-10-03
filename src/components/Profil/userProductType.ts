export interface userProductType {
  userProduct: {
    id: number
    total: number
    products: {
      id: number
      title: string
      price: number
      quantity: number
      total: number
      discountPercentage: number
      discountedTotal: number
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
        discountPercentage: 0,
        discountedTotal: 0,
        thumbnail: ''
      }
    ]
  }
}
