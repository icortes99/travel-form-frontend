import { ContactPreference, LeadSource, TripObjective } from '../generated/graphql-schema'
import { Dictionary, mapEnumKeysToValues, Languages } from '../types'

const EnglishDisctionary: Dictionary = {
  languagePrefix: {
    en: Languages.en,
    es: Languages.es
  },
  applicationForm: {
    destiny: {
      title: 'Choose a destiny',
      description: `Let's start with your desired destination, providing all the info for your best choice.`,
      step: 'Step 1/5',
      stepName: 'Destiny',
      questions: {
        modalTitle: "We'd like to know which attractions catch your eye the most so we can plan the trip around them:",
        destination: 'destinationUUID'
      }
    },
    info: {
      title: 'About the trip',
      description: `Now, we need a bit more info about you and the trip for an estimate and other relevant processes.`,
      step: 'Step 2/5',
      stepName: 'About',
      questions: {
        name: 'Name',
        lastName: 'Last name',
        birthdate: 'Birthdate',
        age: 'Age',
        entryDate: 'Entry date',
        departureDate: 'Departure date',
        tripObjective: 'Trip objective',
        residenceCountry: 'Residence country',
        companions: 'Traveling with companions?',
        cantCompanions: 'Number of companions',
        entryPermission: 'Do you have your passport and Visa up to date?',
        text: 'If you select no, the stay is completely at your expense, and you will receive support regarding park tickets and adventure options.',
        lodging: 'Do you want support with your stay?'
      }
    },
    itinerary: {
      title: 'Your itinerary',
      description: `We'll continue with your desired destination, providing all the needed info for your best decision.`,
      step: 'Step 3/5',
      stepName: 'Hotel',
      questions: {
        hotel: 'Preferred hotel',
        rooms: 'Number of rooms',
        message: 'By default, you will be assigned to room 1 on all occasions, so keep this in mind when assigning the rooms.',
        passenger: 'Passenger',
        name: 'Name',
        lastName: 'Last name',
        birthdate: 'Birthdate',
        room: 'Room',
        roomTypeText: 'The room type determines the price and availability, as some room types are more sought after than others. For that reason, please let us know the room type(s) you prefer:',
        selectType: 'Room type',
        applyForAll: 'Apply for all rooms',
        attractionStart: 'From',
        attractionEnd: 'To',
        hotelType: 'Hotel type',
        roomType: 'Rooms type'
      }
    },
    passengers: {
      title: 'About the passengers',
      description: 'Abaout the fucking passengers',
      step: 'Step 3/5',
      stepName: 'Passengers',
      questions: {}
    },
    contact: {
      title: 'Contact info',
      description: `In this final step, we gather contact info, your preferred method, and schedule an online meeting.`,
      step: 'Step 4/5',
      stepName: 'Contact',
      questions: {
        email: 'Email',
        contactPreference: 'Contact preference',
        phone: 'Phone number',
        leadSource: 'How did you find us?'
      }
    }
  },
  enums: {
    contactPreference: mapEnumKeysToValues(ContactPreference, {
      [ContactPreference.Call]: 'Call',
      [ContactPreference.Email]: 'Email',
      [ContactPreference.Other]: 'Other',
      [ContactPreference.Sms]: 'Sms',
      [ContactPreference.VideoCall]: 'Video Call',
      [ContactPreference.Whatsapp]: 'Whatsapp'
    }),
    leadSource: mapEnumKeysToValues(LeadSource, {
      [LeadSource.Facebook]: 'Facebook',
      [LeadSource.Instagram]: 'Instagram',
      [LeadSource.Other]: 'Other',
      [LeadSource.Referral]: 'Referral',
      [LeadSource.Website]: 'Website'
    }),
    tripObjective: mapEnumKeysToValues(TripObjective, {
      [TripObjective.Adventure]: 'Adventure',
      [TripObjective.BeachAndSun]: 'Beach and sun',
      [TripObjective.Couple]: 'Couple',
      [TripObjective.CulturalExploration]: 'Cultural exploration',
      [TripObjective.Family]: 'Family',
      [TripObjective.FoodAndCulinary]: 'Food and culinary',
      [TripObjective.Friends]: 'Friends',
      [TripObjective.Honeymoon]: 'Honeymoon',
      [TripObjective.Other]: 'Other',
      [TripObjective.Relaxation]: 'Relaxation',
      [TripObjective.Solo]: 'Solo',
      [TripObjective.SportsAndRecreation]: 'Sports and recreation',
      [TripObjective.Vacation]: 'Vacations',
      [TripObjective.WildlifeAndNature]: 'Wild life and nature'
    })
  },
  buttons: {
    select: 'Select',
    back: 'Back',
    next: 'Continue',
    submit: 'Submit'
  },
  error: {
    required: 'This field is required',
    tooShort: 'More characters needed',
    tooLong: 'Less characters needed',
    invalidEmail: 'Email address is invalid',
    invalidDate: 'Date is invalid',
    tooYoung: 'You do not meet the minimum age',
    invalidAge: 'Invalid age',
    datesOverlap: 'Dates overlap'
  },
  basicWords: {
    yes: 'Yes',
    no: 'No'
  }
}

export default EnglishDisctionary