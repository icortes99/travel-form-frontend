import { useRecoilState } from 'recoil'

import { GlobalState } from './../constants'

import { RecoilStateDictionary } from '../recoil'

const useGlobalState = <T>(state: GlobalState) => {
  return useRecoilState<T>(RecoilStateDictionary[state])
}

export default useGlobalState