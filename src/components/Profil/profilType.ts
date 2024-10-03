export interface profilType {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  age: number
  phone: string
  university: string
  address: {
    address: string
    city: string
    country: string
    state: string
    postalCode: string
  }
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    department: string
    name: string
    title: string
  }
  ssn: string
  accessToken: string
  refreshToken: string
}

export const currentUserSchema = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  phone: '',
  age: 0,
  university: '',
  address: {
    address: '',
    city: '',
    country: '',
    state: '',
    postalCode: ''
  },
  bank: {
    cardExpire: '',
    cardNumber: '',
    cardType: '',
    currency: '',
    iban: ''
  },
  company: {
    department: '',
    name: '',
    title: ''
  },
  ssn: '',
  accessToken: '',
  refreshToken: ''
}
