import { atom } from 'recoil'

import { GlobalState, Constants } from '../constants'

import { LanguageState } from '../types'

export const languageState = atom<LanguageState>({
  key: GlobalState.LANGUAGE,
  default: Constants.DEFAULT_LANGUAGE
})

export const RecoilStateDictionary = {
  [GlobalState.LANGUAGE]: languageState
}