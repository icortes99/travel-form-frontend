import { FC } from 'react'
import { Input as ChakraInput } from '@chakra-ui/react'

interface InputProps {
  name: string,
  placeholder: string
  value?: string
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
}

const Input: FC<InputProps> = ({ name, placeholder, value, onChange, isOk, onBlur }: InputProps) => {
  const borderColor = isOk ? 'white.skyBlue' : 'white.error'

  return (
    <ChakraInput
      name={name}
      placeholder={placeholder}
      errorBorderColor={borderColor}
      focusBorderColor={borderColor}
      isRequired
      isInvalid
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      transition={'0.5s'}
    />
  )
}

export default Input