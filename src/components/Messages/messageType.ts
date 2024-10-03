export interface messageType {
  message: {
    read: boolean
    id: number
    body: string
    postId: number
    likes: number
    user: {
      id: number
      username: string
      fullName: string
    }
  }[]
}

export const messageSchema = {
  message: [
    {
      read: true,
      id: 0,
      body: '',
      postId: 0,
      likes: 0,
      user: {
        id: 0,
        username: '',
        fullName: ''
      }
    }
  ]
}
