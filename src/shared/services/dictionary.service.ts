import { Languages, LanguagesDictionary } from '../types'

class DictionaryService {

  parseLanguageToDictionaryField(language: Languages): keyof LanguagesDictionary {
    return ({
      [Languages.en]: 'en',
      [Languages.es]: 'es',
    })[language] as keyof LanguagesDictionary
  }
}

const instance = new DictionaryService()

export default instance