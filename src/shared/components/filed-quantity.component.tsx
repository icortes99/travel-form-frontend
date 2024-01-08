import { FC } from 'react'
import {
  Box,
  FormLabel
} from '@chakra-ui/react'
import { DictionaryLeaves } from '../types'
import { useTranslation } from '../hooks'
import Error from './error.component'
import InputQuantity from './input-quantity.component'

interface FieldQuantityProps {
  label: DictionaryLeaves
  input: {
    name: string
    placeholder: string
    value?: string | number
    onChange?: (e: any) => void
    isOk: boolean
    onBlur?: (e: any) => void
    min?: number
    max?: number
  }
  error?: string
  styles?: Record<string, string | Object>
}

const FieldQuantity: FC<FieldQuantityProps> = ({ label, input, error, styles }: FieldQuantityProps) => {
  const { t } = useTranslation()

  return (
    <Box {...styles}>
      <FormLabel>{t(label)}:</FormLabel>
      <InputQuantity
        name={input.name}
        placeholder={input.placeholder}
        defaultValue={input.value}
        onChange={input.onChange}
        isOk={input.isOk}
        onBlur={input.onBlur}
        min={input.min}
        max={input.max}

      />
      <Error message={error} />
    </Box>
  )
}

export default FieldQuantity