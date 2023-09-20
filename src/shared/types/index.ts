import Languages from './languages'

interface PageTemplate {
  title: string,
  description: string,
  step: string,
  stepName: string
}

interface Dictionary {
  languagePrefix: {
    en: Languages.en,
    es: Languages.es
  },
  applicationForm: {
    destiny: PageTemplate,
    info: PageTemplate,
    lodging: PageTemplate,
    contact: PageTemplate
  }
}

export default Dictionary