import { FC } from 'react'
import { Select } from '@chakra-ui/react'

interface DropdownProps {
  options: string[] | Record<string, string>
  name: string
  placeholder: string
  value?: string | number
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
  type?: 'normal' | 'callback'
}

const InputDropdown: FC<DropdownProps> = ({ options, name, placeholder, value, onChange, isOk, onBlur, type = 'normal' }: DropdownProps) => {
  const borderColor = isOk ? 'white.skyBlue' : 'white.error'

  return (
    <Select
      name={name}
      errorBorderColor={borderColor}
      focusBorderColor={borderColor}
      isRequired
      isInvalid
      value={value === undefined ? 'novalue' : value}
      onChange={type === 'normal' ? onChange : (e) => onChange(e.target.value)}
      onBlur={onBlur}
      transition={'0.5s'}
    >
      <option value={'novalue'} hidden style={{ color: 'grey' }}>
        {placeholder}
      </option>
      {
        Array.isArray(options) ? (
          options.map((opt, i) => (
            <option
              key={i}
              value={opt}
            >
              {opt}
            </option>
          ))
        ) : (
          Object.keys(options).map((key, i) => (
            <option key={i} value={key}>
              {options[key]}
            </option>
          ))
        )
      }
    </Select>
  )
}

export default InputDropdown