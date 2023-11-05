import { FC } from 'react'
import {
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'

interface InputRadioOptionsProps {
  options: { name: string, value: boolean }[] | string[]
  name: string
  value?: string | boolean
  onChange?: (e: any) => void
}

const InputRadioOptions: FC<InputRadioOptionsProps> = ({ options, name, value, onChange }: InputRadioOptionsProps) => {
  return (
    <RadioGroup
      name={name}
      value={value.toString()}
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
              isChecked={value === option.value.toString()}
              value={typeof option[0] === 'string' ? option.name : option.value.toString()}
              key={i}
            >
              {option.name}
            </Radio>
          ))
        }
      </Stack>
    </RadioGroup>
  )
}

export default InputRadioOptions