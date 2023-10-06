import { FC } from 'react'
import { Input } from '@chakra-ui/react'

interface InputDateProps {
  name: string
  placeholder: string
  value?: string
  onChange?: (e: any) => void
}

const InputDate: FC<InputDateProps> = ({ name, placeholder, value, onChange }: InputDateProps) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      size='md'
      type='date'
      isRequired
      isInvalid
      errorBorderColor='#3182ce'
      value={value}
      onChange={onChange}
    />
  )
}

export default InputDate