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
      step: 'Step 1/4',
      stepName: 'Destiny',
      questions: {
        destination: 'destinationUUID'
      }
    },
    info: {
      title: 'About the trip',
      description: `Now, we need a bit more info about you and the trip for an estimate and other relevant processes.`,
      step: 'Step 2/4',
      stepName: 'About',
      questions: {
        name: 'Name',
        lastName: 'Last name',
        birthdate: 'Birthdate',
        entryDate: 'Entry date',
        departureDate: 'Departure date',
        tripObjective: 'Trip objective',
        residenceCountry: 'Residence country',
        companions: 'Traveling with companions?',
        cantCompanions: 'Number of companions',
        entryPermission: 'Permission to enter the country?',
        text: 'The information is relevant to determine if you require any prior procedures for the trip, such as applying for a visa. Furthermore, this way we can find out if you plan your vacations during the peak demand season.'
      }
    },
    lodging: {
      title: 'Lodging',
      description: `We'll continue with your desired destination, providing all the needed info for your best decision.`,
      step: 'Step 3/4',
      stepName: 'Hotel',
      questions: {
        hotel: 'Preferred hotel',
        rooms: 'Number of rooms',
        message: 'By default, you will be assigned to room A on all occasions, so keep this in mind when assigning the rooms.',
        passenger: 'Passenger',
        name: 'Name',
        lastName: 'Last name',
        birthdate: 'Birthdate'
      }
    },
    contact: {
      title: 'Contact info',
      description: `In this final step, we gather contact info, your preferred method, and schedule an online meeting.`,
      step: 'Step 4/4',
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
  }
}

export default EnglishDisctionary