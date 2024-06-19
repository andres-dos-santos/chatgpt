export enum Role {
  User = 0,
  Bot = 1,
}

export interface Message {
  role: Role
  content: string
  imageURL?: string
  prompt?: string
}

export interface Chat {
  id: number
  title: string
}
