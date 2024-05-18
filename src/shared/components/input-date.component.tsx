import { FC } from 'react'
import { Input } from '@chakra-ui/react'

interface InputDateProps {
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
}

const InputDate: FC<InputDateProps> = ({ name, placeholder = 'mm/dd/aaaa', value, onChange, isOk, onBlur }: InputDateProps) => {
  const borderColor = isOk ? 'white.skyBlue' : 'white.error'

  return (
    <Input
      name={name}
      placeholder={placeholder}
      size='md'
      type='date'
      isRequired
      isInvalid
      errorBorderColor={borderColor}
      focusBorderColor={borderColor}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      transition={'0.5s'}
      color={(value !== '' && value !== ' ' && value !== undefined) ? 'black' : 'grey'}
    />
  )
}

export default InputDate