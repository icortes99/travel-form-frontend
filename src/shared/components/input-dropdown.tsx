import { FC } from 'react'
import { Select } from '@chakra-ui/react'

interface DropdownProps {
  options: string[],
  name: string,
  placeholder: string
}

const InputDropdown: FC<DropdownProps> = ({ options, name, placeholder }: DropdownProps) => {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      errorBorderColor='#3182ce'
      isRequired
      isInvalid
    >
      {
        options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))
      }
    </Select>
  )
}

export default InputDropdown