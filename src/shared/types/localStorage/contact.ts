import { ContactPreference, LeadSource } from '../../generated/graphql-schema'

export interface ContactLocalStorage {
  email: string
  contactPreference: string | ContactPreference
  leadSource: string | LeadSource
  phone: string
}