export interface PassengersLocalStorage {
  passengersData: Passenger[]
}

interface Passenger {
  name: string
  lastName: string
  age: number
  room: number
}