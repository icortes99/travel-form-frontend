import { ContactPreference, LeadSource, TripObjective } from '../generated/graphql-schema'

export enum Languages {
  en = 'EN',
  es = 'ES'
}

export type LanguagesDictionary = {
  en: string
  es: string
}

export function mapEnumKeysToValues(enumObj: Record<string, string>, enumValues: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {}

  for (const key in enumObj) {
    if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
      result[key] = enumValues[enumObj[key]]
    }
  }

  return result
}

interface PageTemplate {
  title: string,
  description: string,
  step: string,
  stepName: string,
  questions: Record<string, string>
}

export interface LanguageDictionary {
  languagePrefix: {
    en: Languages.en,
    es: Languages.es
  },
  applicationForm: {
    destiny: PageTemplate,
    info: PageTemplate,
    lodging: PageTemplate,
    contact: PageTemplate
  },
  enums: {
    contactPreference: Record<ContactPreference, string>,
    leadSource: Record<LeadSource, string>,
    tripObjective: Record<TripObjective, string>
  },
  buttons: {
    select: string,
    back: string,
    next: string,
    submit: string
  }
}