import { FC, createElement } from 'react'
import { Select } from '@chakra-ui/react'

interface Flag {
  countryCode: string
  svg: any
}

interface DropdownProps {
  options: string[] | Record<string, string> | Flag[]
  name: string
  placeholder: string
  value?: string | number
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
}

const InputDropdown: FC<DropdownProps> = ({ options, name, placeholder, value, onChange, isOk, onBlur }: DropdownProps) => {
  const borderColor = isOk ? 'white.skyBlue' : 'white.error'

  return (
    <Select
      name={name}
      placeholder={placeholder}
      errorBorderColor={borderColor}
      focusBorderColor={borderColor}
      isRequired
      isInvalid
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      transition={'0.5s'}
    >
      {
        Array.isArray(options) ? (
          /*typeof options[0] === 'string' ?
            options.map((opt, i) => (
              <option
                key={i}
                value={opt}
              >
                {opt}
              </option>
            )) : options.map((opt, i: number) => (
              <option
                key={i}
                value={opt.countryCode}
              >
                Flag
              </option>
            ))*/
          options.map((opt, i) => (
            <option
              key={i}
              value={opt}
            >
              {opt}
            </option>
          ))
        ) :
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