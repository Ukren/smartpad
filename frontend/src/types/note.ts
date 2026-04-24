export type Tag = {
  id: string
  name: string
}

export type Note = {
  id: string
  title: string
  content: string
  isPinned: boolean
  isDeleted: boolean
  tags: Tag[]
  createdAt: string
  updatedAt: string
}