export interface ItineraryLocalStorage {
  attractionsDetails: Attraction[]
}

interface Attraction {
  hotelType: string
  roomType: string
  start: string
  finish: string
}