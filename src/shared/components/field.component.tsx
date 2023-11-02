import { FC } from 'react'
import {
  Box,
  FormLabel
} from '@chakra-ui/react'
import { DictionaryLeaves } from '../types'
import { useTranslation } from '../hooks'
import Input from './input.component'
import Error from './error.component'

interface FieldProps {
  label: DictionaryLeaves
  input: {
    name: string
    placeholder: string
    value?: string
    onChange?: (e: any) => void
    isOk: boolean
    onBlur?: (e: any) => void
  }
  error?: string
  styles?: Record<string, string | Object>
}

const Field: FC<FieldProps> = ({ label, input, error, styles }: FieldProps) => {
  const { t } = useTranslation()

  return (
    <Box {...styles}>
      <FormLabel>{t(label)}:</FormLabel>
      <Input
        name={input.name}
        placeholder={input.placeholder}
        value={input.value}
        onChange={input.onChange}
        isOk={input.isOk}
        onBlur={input.onBlur}
      />
      {
        error && <Error message={error} />
      }
    </Box>
  )
}

export default Field