import { Constants } from '../constants'

import { Languages } from '../types'

enum StorageName {
  LANGUAGE = '@language',
  ID_TOKEN = '@idToken',
  ID_TOKEN_INFO = '@idTokenInfo',
  REFRESH_TOKEN = '@refreshToken'
}

class StorageService {
  async clear() {
    return window.localStorage.clear()
  }

  async getLanguage(): Promise<Languages> {
    try {
      //const value = await AsyncStorage.getItem(StorageName.LANGUAGE) as Languages

      if (false) {
        throw new Error()
      }

      return Languages.es

    } catch (error) {
      return Constants.DEFAULT_LANGUAGE
    }
  }

  async setLanguage(value: Languages) {
    //return AsyncStorage.setItem(StorageName.LANGUAGE, value)
  }
}

const instance = new StorageService()

export default instance