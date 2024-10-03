interface Products {
  thumbnail: string
  title: string
  price: number
  rating: number
  stock: number
  id: number
}

export interface otherProductType {
  otherProducts: {
    otherProductsDetail: Products[]
    limit: number
  }
}

export const OtherProductSchema = {
  otherProducts: {
    otherProductsDetail: [
      {
        thumbnail: '',
        id: 0,
        title: '',
        price: 0,
        rating: 0,
        stock: 0
      }
    ],
    limit: 0
  }
}
