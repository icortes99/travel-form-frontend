import { FC } from 'react'
import {
  Box,
  FormLabel
} from '@chakra-ui/react'
import { DictionaryLeaves } from '../types'
import { useTranslation } from '../hooks'
import InputDate from './input-date.component'
import Error from './error.component'

interface FieldDateProps {
  label: DictionaryLeaves
  input: {
    name: string
    placeholder?: string
    value?: string
    onChange?: (e: any) => void
    isOk: boolean
    onBlur?: (e: any) => void
  }
  error?: string
  styles?: Record<string, string>
}

const FieldDate: FC<FieldDateProps> = ({ label, input, error, styles }: FieldDateProps) => {
  const { t } = useTranslation()

  return (
    <Box {...styles}>
      <FormLabel>{t(label)}:</FormLabel>
      <InputDate
        name={input.name}
        placeholder={input.placeholder}
        value={input.value}
        onChange={input.onChange}
        isOk={input.isOk}
        onBlur={input.onBlur}
      />
      <Error message={error} />
    </Box>
  )
}

export default FieldDate