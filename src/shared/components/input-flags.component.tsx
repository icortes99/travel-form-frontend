
import { FC } from 'react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import styles from '../../../styles/input-flags.module.css'

interface PhoneInputProps {
  country: any
  inputValue: string
}

interface InputFlagProps {
  name: string
  defaultValue?: string
  onChange?: (e: any) => void
  value: string
  isOk: boolean
  onBlur?: (e: any) => void
}

const InputFlag: FC<InputFlagProps> = ({
  name,
  defaultValue = 'cr',
  onChange,
  value,
  isOk,
  onBlur
}: InputFlagProps) => {
  const handleChange = (phone: string, data: PhoneInputProps) => {
    onChange(data?.inputValue)
  }

  return (
    <PhoneInput
      name={name}
      defaultCountry={defaultValue}
      className={`${styles.container} ${!isOk && styles.container_error}`}
      onChange={handleChange}
      value={value}
      forceDialCode
      required
      inputClassName={styles.input}
      onBlur={onBlur}
    />
  )
}

export default InputFlag