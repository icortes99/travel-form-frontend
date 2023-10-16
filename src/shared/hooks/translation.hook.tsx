import { useCallback } from 'react'

import { useRouter } from 'next/router'

import _ from 'lodash'

import { useGlobalState } from '.'

import LanguageDictionary from '../languages'

import { DictionaryService, StorageService } from '../services'

import { GlobalState } from '../constants'

import { LanguageState, Translator } from '../types'

import { Languages } from '../types'

const router = useRouter()

const useTranslation = () => {
  const [language, setLanguage] = useGlobalState<LanguageState>(GlobalState.LANGUAGE)

  const t: Translator = useCallback((path) => {
    return _.get(LanguageDictionary[DictionaryService.parseLanguageToDictionaryField(language)], path);
  }, [language])

  const switchLanguage = useCallback(async (selectedLanguage: Languages, isReloadRequired: boolean = false) => {
    await StorageService.setLanguage(selectedLanguage)
    setLanguage(selectedLanguage)

    if (isReloadRequired) router.reload()
  }, [language])

  return { language, setLanguage, switchLanguage, t }
}

export default useTranslation;