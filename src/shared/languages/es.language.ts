import { ContactPreference, LeadSource, TripObjective } from '../generated/graphql-schema'
import { Dictionary, mapEnumKeysToValues, Languages } from '../types'

const SpanishDictionary: Dictionary = {
  languagePrefix: {
    en: Languages.en,
    es: Languages.es
  },
  applicationForm: {
    destiny: {
      title: 'Escoge un destino',
      description: `Comenzaremos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.`,
      step: 'Paso 1/4',
      stepName: 'Destino',
      questions: {
        modalTitle: 'Nos gustaría saber cuáles atracciones son las que más te llaman la atención para centrar el viaje en torno a ellas:',
        destination: 'destinationUUID'
      }
    },
    info: {
      title: 'Acerca del viaje',
      description: `Ahora, es necesario un poco más de información acerca de ti y sobre el viaje para calcular un estimado y otros trámites pertinentes.`,
      step: 'Paso 2/4',
      stepName: 'Acerca de',
      questions: {
        name: 'Nombre',
        lastName: 'Apellido',
        birthdate: 'Fecha de nacimiento',
        entryDate: 'Fecha de entrada',
        departureDate: 'Fecha de salida',
        tripObjective: 'Objetivo del viaje',
        residenceCountry: 'País de residencia',
        companions: '¿Viajas con acompañantes?',
        cantCompanions: 'Número de acompañantes',
        entryPermission: '¿Tienes permiso de entrada al país?',
        text: 'La información es relevante para saber si necesitas algún proceso previo para el viaje tal como la solicitud de la visa. Además, así podremos saber si planeas tus vacaciones en temporada de más alta demanda.'
      }
    },
    lodging: {
      title: 'Hospedaje',
      description: `Continuamos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.`,
      step: 'Paso 3/4',
      stepName: 'Hospedaje',
      questions: {
        hotel: 'Hotel de preferencia',
        rooms: 'Número de habitaciones',
        message: 'Por defecto, tú serás asignado a la habitación A en todas las ocasiones, así que ten esto en cuenta a la hora de asociar las habitaciones.',
        passenger: 'Pasajero',
        name: 'Nombre',
        lastName: 'Apellido',
        birthdate: 'Fecha de nacimiento',
        room: 'Habitación'
      }
    },
    contact: {
      title: 'Contacto',
      description: `En este último paso, recopilamos la información para contactarte, como te gustaría ser contactado y agendaremos una reunión online.`,
      step: 'Paso 4/4',
      stepName: 'Contacto',
      questions: {
        email: 'Correo',
        contactPreference: 'Preferencia de contacto',
        phone: 'Teléfono',
        leadSource: '¿Cómo diste con nosotros?'
      }
    }
  },
  enums: {
    contactPreference: mapEnumKeysToValues(ContactPreference, {
      [ContactPreference.Call]: 'Llamada',
      [ContactPreference.Email]: 'Correo',
      [ContactPreference.Other]: 'Otro',
      [ContactPreference.Sms]: 'Sms',
      [ContactPreference.VideoCall]: 'Video llamada',
      [ContactPreference.Whatsapp]: 'Whatsapp'
    }),
    leadSource: mapEnumKeysToValues(LeadSource, {
      [LeadSource.Facebook]: 'Facebook',
      [LeadSource.Instagram]: 'Instagram',
      [LeadSource.Other]: 'Otro',
      [LeadSource.Referral]: 'Referido',
      [LeadSource.Website]: 'Sitio web'
    }),
    tripObjective: mapEnumKeysToValues(TripObjective, {
      [TripObjective.Adventure]: 'Aventura',
      [TripObjective.BeachAndSun]: 'Playa y sol',
      [TripObjective.Couple]: 'En pareja',
      [TripObjective.CulturalExploration]: 'Exploración de cultura',
      [TripObjective.Family]: 'Familia',
      [TripObjective.FoodAndCulinary]: 'Comida y arte culinario',
      [TripObjective.Friends]: 'Amigos',
      [TripObjective.Honeymoon]: 'Luna de miel',
      [TripObjective.Other]: 'Otro',
      [TripObjective.Relaxation]: 'Relajación',
      [TripObjective.Solo]: 'Solo',
      [TripObjective.SportsAndRecreation]: 'Recreación y deportes',
      [TripObjective.Vacation]: 'Vacaciones',
      [TripObjective.WildlifeAndNature]: 'Naturaleza y vida salvaje'
    })
  },
  buttons: {
    select: 'Seleccionar',
    back: 'Atrás',
    next: 'Continuar',
    submit: 'Enviar'
  },
  error: {
    required: 'Este campo es requerido',
    tooShort: 'Mas caracteres necesarios',
    tooLong: 'Menos caracteres necesarios',
    invalidEmail: 'Correo inválido',
    invalidDate: 'Fecha inválida'
  }
}

export default SpanishDictionary