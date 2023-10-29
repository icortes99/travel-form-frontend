import { FC } from 'react'
import { Input } from '@chakra-ui/react'

interface InputDateProps {
  name: string
  placeholder: string
  value?: string
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
}

const InputDate: FC<InputDateProps> = ({ name, placeholder, value, onChange, isOk, onBlur }: InputDateProps) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      size='md'
      type='date'
      isRequired
      isInvalid
      errorBorderColor={isOk ? 'white.skyBlue' : 'white.error'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default InputDate