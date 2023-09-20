import Dictionary from '../types'
import Languages from '../types/languages'

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
      stepName: 'Destiny'
    },
    info: {
      title: 'About the trip',
      description: `Now, we need a bit more info about you and the trip for an estimate and other relevant processes.`,
      step: 'Step 2/4',
      stepName: 'About'
    },
    lodging: {
      title: 'Lodging',
      description: `We'll continue with your desired destination, providing all the needed info for your best decision.`,
      step: 'Step 3/4',
      stepName: 'Hotel'
    },
    contact: {
      title: 'Contact info',
      description: `In this final step, we gather contact info, your preferred method, and schedule an online meeting.`,
      step: 'Step 4/4',
      stepName: 'Contact'
    }
  },
}

export default EnglishDisctionary