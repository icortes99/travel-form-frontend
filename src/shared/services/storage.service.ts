import AsyncStorage from '@react-native-async-storage/async-storage'

import { Constants } from '../constants'

import { EmptyCacheError } from '../errors'

import { Language } from '../generated'

import { Theme } from './../types'

enum StorageName {
  THEME = '@theme',
  LANGUAGE = '@language',
  ID_TOKEN = '@idToken',
  ID_TOKEN_INFO = '@idTokenInfo',
  REFRESH_TOKEN = '@refreshToken',
  WORKOUT_START_TIME = '@refreshToken',
}

class StorageService {
  async clear() {
    return AsyncStorage.clear()
  }

  async getTheme(): Promise<Theme> {
    try {
      const value = await AsyncStorage.getItem(StorageName.THEME) as Theme

      if (!value) {
        throw new EmptyCacheError()
      }

      return value;

    } catch (error) {
      return Constants.DEFAULT_THEME
    }
  }

  async setTheme(value: Theme) {
    return AsyncStorage.setItem(StorageName.THEME, value)
  }

  async getLanguage(): Promise<Language> {
    try {
      const value = await AsyncStorage.getItem(StorageName.LANGUAGE) as Language

      if (!value) {
        throw new EmptyCacheError()
      }

      return value

    } catch (error) {
      return Constants.DEFAULT_LANGUAGE
    }
  }

  async setLanguage(value: Language) {
    return AsyncStorage.setItem(StorageName.LANGUAGE, value)
  }

  async getIdToken(): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(StorageName.ID_TOKEN) as string

      if (!value) {
        throw new EmptyCacheError()
      }

      return value;

    } catch (error) {
      return null
    }
  }

  async setIdToken(value: string) {
    return AsyncStorage.setItem(StorageName.ID_TOKEN, value)
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(StorageName.REFRESH_TOKEN) as string

      if (!value) {
        throw new EmptyCacheError()
      }

      return value;

    } catch (error) {
      return null
    }
  }

  async setRefreshToken(value: string) {
    return AsyncStorage.setItem(StorageName.REFRESH_TOKEN, value)
  }

  async getIdTokenInfo(): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(StorageName.ID_TOKEN_INFO) as string

      if (!value) {
        throw new EmptyCacheError()
      }

      return value

    } catch (error) {
      return null
    }
  }

  async setIdTokenInfo(value: string) {
    return AsyncStorage.setItem(StorageName.ID_TOKEN_INFO, value)
  }

  async setWorkoutTime(value: string) {
    return AsyncStorage.setItem(StorageName.WORKOUT_START_TIME, value)
  }

  async getWorkoutTime(): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(StorageName.WORKOUT_START_TIME) as string

      if (!value) {
        throw new EmptyCacheError()
      }

      return value

    } catch (error) {
      return null
    }
  }
}

const instance = new StorageService()

export default instance