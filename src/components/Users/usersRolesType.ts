export interface usersRolesType {
  total: number
  users: {
    image: string
    email: string
    company: {
      department: string
      title: string
    }
    role: string
    firstName: string
    lastName: string
    username: string
  }[]
}

export const usersRoleSchema = {
  total: 0,
  users: [
    {
      image: '',
      email: '',
      company: {
        department: '',
        title: ''
      },
      role: '',
      firstName: '',
      lastName: '',
      username: ''
    }
  ]
}
