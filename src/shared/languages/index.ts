import EnglishDictionary from './en.language'
import SpanishDictionary from './es.language'
import { Dictionary, LanguagesDictionary } from '../types'

const LanguageDictionary: Record<keyof LanguagesDictionary, Dictionary> = {
  en: EnglishDictionary,
  es: SpanishDictionary
}

export default LanguageDictionary