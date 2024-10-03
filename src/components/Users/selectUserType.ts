export interface selectUserType {
  userInfo: {
    image: string
    phone: string
    email: string
    company: {
      name: string
      title: string
    }
    address: {
      address: string
      postalCode: string
      city: string
    }
    birthDate: string
    firstName: string
    lastName: string
    username: string
  }
}

export const selectUserSchema = {
  userInfo: {
    image: '',
    phone: '',
    email: '',
    company: {
      name: '',
      title: ''
    },
    address: {
      address: '',
      postalCode: '',
      city: ''
    },
    birthDate: '',
    firstName: '',
    lastName: '',
    username: ''
  }
}
