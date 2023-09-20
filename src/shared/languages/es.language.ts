import Dictionary from '../types'
import Languages from '../types/languages'

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
      stepName: 'Destino'
    },
    info: {
      title: 'Acerca del viaje',
      description: `Ahora, es necesario un poco más de información acerca de ti y sobre el viaje para calcular un estimado y otros trámites pertinentes.`,
      step: 'Paso 2/4',
      stepName: 'About'
    },
    lodging: {
      title: 'Hospedaje',
      description: `Continuamos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.`,
      step: 'Paso 3/4',
      stepName: 'Hospedaje'
    },
    contact: {
      title: 'Contacto',
      description: `En este último paso, recopilamos la información para contactarte, como te gustaría ser contactado y agendaremos una reunión online.`,
      step: 'Paso 4/4',
      stepName: 'Contacto'
    }
  }
}

export default SpanishDictionary