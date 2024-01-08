import { Leaves, Paths } from '.'
import { ContactPreference, LeadSource, TripObjective } from '../generated/graphql-schema'

export enum Languages {
  en = 'EN',
  es = 'ES'
}

export type LanguageOption = {
  label: DictionaryLeaves,
  value: Languages
}

export type LanguagesDictionary = {
  en: string
  es: string
}

export type EnumLanguagesDictionary = {
  en: Record<string, string>
  es: Record<string, string>
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

export type Translator = (path: DictionaryLeaves) => string

export type TranslatorEnum = (path: DictionaryNodes) => Record<string, string>

export interface Dictionary {
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
  },
  error: {
    required: string,
    tooShort: string,
    tooLong: string,
    invalidEmail: string,
    invalidDate: string,
    tooYoung: string,
    invalidAge: string
  },
  basicWords: {
    yes: string,
    no: string
  }
}

export type DictionaryLeaves = Leaves<Dictionary, 5>

export type DictionaryNodes = Paths<Dictionary, 2>