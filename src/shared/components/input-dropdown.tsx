import { FC } from 'react'
import { Select } from '@chakra-ui/react'

interface DropdownProps {
  options: string[],
  name: string,
  placeholder: string
  value?: string
  onChange?: (e: any) => void
}

const InputDropdown: FC<DropdownProps> = ({ options, name, placeholder, value, onChange }: DropdownProps) => {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      errorBorderColor='#3182ce'
      isRequired
      isInvalid
      value={value}
      onChange={onChange}
    >
      {
        options.map((opt, i) => (
          <option
            key={i}
            value={opt}
          >
            {opt}
          </option>
        ))
      }
    </Select>
  )
}

export default InputDropdown