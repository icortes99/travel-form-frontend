import { FC } from 'react'
import { Select } from '@chakra-ui/react'

interface DropdownProps {
  options: string[] | Record<string, string>,
  name: string,
  placeholder: string
  value?: string | number
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
}

const InputDropdown: FC<DropdownProps> = ({ options, name, placeholder, value, onChange, isOk, onBlur }: DropdownProps) => {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      errorBorderColor={isOk ? 'white.skyBlue' : 'white.error'}
      isRequired
      isInvalid
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {
        Array.isArray(options) ?
          options.map((opt, i) => (
            <option
              key={i}
              value={opt}
            >
              {opt}
            </option>
          ))
          :
          Object.keys(options).map((key, i) => (
            <option key={i} value={key}>
              {options[key]}
            </option>
          ))
      }
    </Select>
  )
}

export default InputDropdown