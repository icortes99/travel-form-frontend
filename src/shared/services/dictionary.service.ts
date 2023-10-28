import { Languages, LanguagesDictionary, EnumLanguagesDictionary } from '../types'

class DictionaryService {
  parseLanguageToDictionaryField(language: Languages): keyof LanguagesDictionary {
    return ({
      [Languages.en]: 'en',
      [Languages.es]: 'es',
    })[language] as keyof LanguagesDictionary
  }

  parseLanguageToDictionaryEnum(language: Languages): keyof EnumLanguagesDictionary {
    return ({
      [Languages.en]: 'en',
      [Languages.es]: 'es',
    })[language] as keyof EnumLanguagesDictionary
  }
}

const instance = new DictionaryService()

export default instance