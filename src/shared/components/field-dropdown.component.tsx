import { FC } from 'react'
import {
  Box,
  FormLabel
} from '@chakra-ui/react'
import { DictionaryLeaves, DictionaryNodes } from '../types'
import { useTranslation } from '../hooks'
import InputDropdown from './input-dropdown.component'
import Error from './error.component'

interface FieldDropdownProps {
  label: DictionaryLeaves
  input: {
    options: string[] | DictionaryNodes | Record<string, string> | number[]
    name: string
    placeholder: string
    value?: string | number
    onChange?: (e: any) => void
    isOk: boolean
    onBlur?: (e: any) => void
    type?: 'normal' | 'callback'
  }
  error?: string
  styles?: Record<string, string>
}

const FieldDropdown: FC<FieldDropdownProps> = ({ label, input, error, styles }: FieldDropdownProps) => {
  const { t, enumT } = useTranslation()

  return (
    <Box {...styles}>
      <FormLabel>{t(label)}:</FormLabel>
      <InputDropdown
        name={input.name}
        placeholder={input.placeholder}
        options={(Array.isArray(input.options) || typeof input.options === 'object') ? input.options : enumT(input.options)}
        value={input.value}
        onChange={input.onChange}
        isOk={input.isOk}
        onBlur={input.onBlur}
        type={input.type}
      />
      <Error message={error} />
    </Box>
  )
}

export default FieldDropdown