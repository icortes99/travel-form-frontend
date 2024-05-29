import { FC } from 'react'
import { DictionaryLeaves } from '../types'
import { Box, FormLabel } from '@chakra-ui/react'
import { useTranslation } from '../hooks'
import Error from './error.component'
import InputFlag from './input-flags.component'

interface FieldPhone {
  label: DictionaryLeaves
  input: {
    name: string
    value?: string
    onChange?: (e: any) => void
    isOk: boolean
    onBlur?: (e: any) => void
  }
  error?: string
  styles?: Record<string, string | Object>
}

const FieldPhone: FC<FieldPhone> = ({ label, input, error, styles }: FieldPhone) => {
  const { t } = useTranslation()
  
  return (
    <Box {...styles}>
      <FormLabel>{t(label)}:</FormLabel>
      <InputFlag
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        isOk={input.isOk}
        onBlur={input.onBlur}
      />
      <Error message={error} />
    </Box>
  )
}

export default FieldPhone