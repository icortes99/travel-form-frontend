import { FC } from 'react'
import { Input as ChakraInput } from '@chakra-ui/react'

interface InputProps {
  name: string,
  placeholder: string
  value?: string
  onChange?: (e: any) => void
}

const Input: FC<InputProps> = ({ name, placeholder, value, onChange }: InputProps) => {
  return (
    <ChakraInput
      name={name}
      placeholder={placeholder}
      errorBorderColor='#3182ce'
      isRequired
      isInvalid
      value={value}
      onChange={onChange}
    />
  )
}

export default Input