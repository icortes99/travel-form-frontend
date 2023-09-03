import { FC } from 'react'
import { Input } from '@chakra-ui/react'

interface InputProps {
  name: string,
  placeholder: string
}

const InputString: FC<InputProps> = ({ name, placeholder }: InputProps) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      errorBorderColor='#3182ce'
      isRequired
      isInvalid
    />
  )
}

export default InputString