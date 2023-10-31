import { FC } from 'react'
import {
  Box,
  FormLabel
} from '@chakra-ui/react'
import { DictionaryLeaves, DictionaryNodes } from '../types'
import { useTranslation } from '../hooks'
import InputDropdown from './input-dropdown.component'

interface FieldProps {
  label: DictionaryLeaves
  input: {
    options: string[] | DictionaryNodes
    name: string
    placeholder: string
    value?: string | number
    onChange?: (e: any) => void
    isOk: boolean
    onBlur?: (e: any) => void
  }
  error?: string
}

const Field: FC<FieldProps> = ({ label, input, error }: FieldProps) => {
  const { t, enumT } = useTranslation()

  return (
    <Box>
      <FormLabel>{t(label)}:</FormLabel>
      <InputDropdown
        name={input.name}
        placeholder={input.placeholder}
        options={Array.isArray(input.options) ? input.options : enumT(input.options)}
        value={input.value}
        onChange={input.onChange}
        isOk={input.isOk}
        onBlur={input.onBlur}
      />
      {/* ERROR */}
    </Box>
  )
}

export default Field