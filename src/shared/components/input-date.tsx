import { FC } from 'react'
import { Input } from '@chakra-ui/react'

interface InputDateProps {
  name: string
  placeholder: string
}

const InputDate: FC<InputDateProps> = ({ name, placeholder }: InputDateProps) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      size='md'
      type='date'
      isRequired
      isInvalid
      errorBorderColor='#3182ce'
    />
  )
}

export default InputDate