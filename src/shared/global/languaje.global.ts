import { atom } from 'recoil'

const Language = atom({
  key: 'language',
  default: 'es'
})

export default Language