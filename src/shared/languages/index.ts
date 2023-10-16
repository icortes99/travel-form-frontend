import EnglishDisctionary from './en.language'
import SpanishDictionary from './es.language'
import { LanguagesDictionary } from '../types/languages.type'
import Dictionary from '../types'

const LanguageDictionary: Record<keyof LanguagesDictionary, Dictionary> = {
  en: EnglishDisctionary,
  es: SpanishDictionary
}

export default LanguageDictionary