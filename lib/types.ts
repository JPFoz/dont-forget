export type Item = {
  id: string,
  text: string | null,
  done: boolean,
  dateCreated: Date,
  dateCompleted: Date
}

export type ItemStore = {
  items: Item[]
}