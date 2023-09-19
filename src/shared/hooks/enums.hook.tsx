import {
  ContactPreference,
  LeadSource,
  TripObjective
} from '../generated/graphql-schema'

interface EnumProps {
  name: 'contactPreference' | 'leadSource' | 'tripObjective'
}

const useEnum = ({ name }: EnumProps) => {
  let enumSelected: Object

  switch (name) {
    case 'contactPreference':
      enumSelected = ContactPreference
      break
    case 'leadSource':
      enumSelected = LeadSource
      break
    case 'tripObjective':
      enumSelected = TripObjective
      break
    default:
      break
  }

  const returnEnum: Record<string, string> = {}
  for (const key in enumSelected) {
    returnEnum[key] = enumSelected[key] //despues del = se debe aplicar la funcion de useTranslator
  }

  return returnEnum
}

export default useEnum