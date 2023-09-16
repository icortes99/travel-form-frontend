import { FC } from 'react'
import {
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'

interface InputRadioOptionsProps {
  options?: string[]
  name: string
  value?: string
  onChange?: (e: any) => void
}

const InputRadioOptions: FC<InputRadioOptionsProps> = ({ options = ['Si', 'No'], name, value, onChange }: InputRadioOptionsProps) => {
  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
    >
      <Stack
        spacing={4}
        direction='row'
        width={'100%'}
        display={'flex'}
        justifyContent={'space-evenly'}
      >
        {
          options.map((option, i) => (
            <Radio
              isChecked={value === option}
              value={option}
              key={i}
            >
              {option}
            </Radio>
          ))
        }
      </Stack>
    </RadioGroup>
  )
}

export default InputRadioOptions