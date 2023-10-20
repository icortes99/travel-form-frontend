import { useRecoilState } from 'recoil'

import { GlobalState } from './../constants'

import { RecoilStateDictionary } from '../recoil'

const useGlobalState = (state: GlobalState) => {
  return useRecoilState(RecoilStateDictionary[state])
}

export default useGlobalState