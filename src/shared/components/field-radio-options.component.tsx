import { FC } from 'react'
import {
  Box,
  FormLabel
} from '@chakra-ui/react'
import { DictionaryLeaves } from '../types'
import { useTranslation } from '../hooks'
import Error from './error.component'
import InputRadioOptions from './input-radio-options.component'

interface FieldRadioOptionsProps {
  label: DictionaryLeaves
  input: {
    options?: string[]
    name: string
    value?: string
    onChange?: (e: any) => void
  }
  error?: string
  styles?: Record<string, string>
}

const FieldRadioOptions: FC<FieldRadioOptionsProps> = ({ label, input, error, styles }: FieldRadioOptionsProps) => {
  const { t } = useTranslation()
  const radioOptions = input.options ?? [{ name: t('basicWords.yes'), value: true }, { name: t('basicWords.no'), value: false }]

  return (
    <Box {...styles}>
      <FormLabel marginBottom={'1rem'}>{t(label)}:</FormLabel>
      <InputRadioOptions
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        options={radioOptions}
      />
      <Error message={error} />
    </Box>
  )
}

export default FieldRadioOptions