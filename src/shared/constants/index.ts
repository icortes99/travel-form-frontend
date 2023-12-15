import { Languages, LanguageOption } from '../types'

export * from './global-state.constant'

interface ConstantValues {
  DEFAULT_LANGUAGE: Languages
  SUPPORTED_LANGUAGES: LanguageOption[]
}

const DEFAULT_LANGUAGE: Languages = Languages.es
const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { label: 'languagePrefix.es', value: Languages.es },
  { label: 'languagePrefix.en', value: Languages.en }
]

const Constants: ConstantValues = {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES
}

export {
  Constants
}