import { FC } from 'react'
import {
  HStack,
  Button,
  Input,
  useNumberInput,
} from '@chakra-ui/react'

interface InputQuantityProps {
  min?: number
  max?: number
  name: string
  placeholder?: string
  defaultValue?: string | number
  onChange?: (e: any) => void
  isOk: boolean
  onBlur?: (e: any) => void
}

const InputQuantity: FC<InputQuantityProps> = ({ min = 1, max = 100, name, placeholder = '', defaultValue, onChange, isOk, onBlur }: InputQuantityProps) => {
  const borderColor = isOk ? 'white.skyBlue' : 'white.error'

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value
  } = useNumberInput({
    step: 1,
    min: min,
    max: max,
    precision: 0,
    defaultValue: defaultValue
  })

  const handleButtonClick = (newValue: number) => {
    if (onChange) {
      onChange({ target: { name, value: newValue } })
    }
  }

  const inc = getIncrementButtonProps({
    onClick: () => handleButtonClick(parseInt(value) + 1)
  })
  const dec = getDecrementButtonProps({
    onClick: () => handleButtonClick(parseInt(value) - 1)
  })
  const input = getInputProps({
    onChange: onChange,
    onBlur: onBlur,
    name: name
  })

  return (
    <HStack
      gap={'1rem'}
    >
      <Button
        {...dec}
        variant={'outline'}
        colorScheme={'pink'}
        border={'.2rem solid'}
        type={'button'}
      >-</Button>
      <Input
        {...input}
        placeholder={placeholder}
        errorBorderColor={borderColor}
        focusBorderColor={borderColor}
        isRequired
        isInvalid
        transition={'0.5s'}
      />
      <Button
        {...inc}
        variant={'outline'}
        colorScheme={'pink'}
        border={'.2rem solid'}
        type={'button'}
      >+</Button>
    </HStack>
  )
}

export default InputQuantity