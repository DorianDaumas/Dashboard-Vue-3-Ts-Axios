export interface usersType {
  total: number
  users: {
    image: string
    phone: string
    email: string
    role: string
    company: {
      name: string
      title: string
      department: string
      address: {
        address: string
        postalCode: string
        city: string
      }
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
  }[]
}

export const usersSchema = {
  total: 0,
  users: [
    {
      image: '',
      phone: '',
      email: '',
      company: {
        name: '',
        title: '',
        department: '',
        address: {
          address: '',
          postalCode: '',
          city: ''
        }
      },
      address: {
        address: '',
        postalCode: '',
        city: ''
      },
      birthDate: '',
      firstName: '',
      lastName: '',
      role: '',
      username: ''
    }
  ]
}
