import { useCallback } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { useGlobalState } from '.'
import LanguageDictionary from '../languages'
import { DictionaryService, StorageService } from '../services'
import { GlobalState } from '../constants'
import { Languages, Translator, TranslatorEnum } from '../types'

const useTranslation = () => {
  const router = useRouter()
  const [language, setLanguage] = useGlobalState(GlobalState.LANGUAGE)

  const t: Translator = useCallback((path) => {
    return _.get(LanguageDictionary[DictionaryService.parseLanguageToDictionaryField(language)], path);
  }, [language])

  const enumT: TranslatorEnum = useCallback((path) => {
    const translation = _.get(LanguageDictionary[DictionaryService.parseLanguageToDictionaryEnum(language)], path)
    return translation as Record<string, string>
  }, [language])

  const switchLanguage = useCallback(async (selectedLanguage: Languages, isReloadRequired: boolean = false) => {
    await StorageService.setLanguage(selectedLanguage)
    setLanguage(selectedLanguage)

    if (isReloadRequired) router.reload()
  }, [language])

  return { language, setLanguage, switchLanguage, t, enumT }
}

export default useTranslation;