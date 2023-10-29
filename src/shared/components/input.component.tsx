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
  return (
    <ChakraInput
      name={name}
      placeholder={placeholder}
      errorBorderColor={isOk ? 'white.skyBlue' : 'white.error'}
      isRequired
      isInvalid
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default Input