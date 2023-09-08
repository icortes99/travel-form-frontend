import { FC } from 'react'
import {
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'

interface InputRadioOptionsProps {
  options?: string[]
  name: string
}


const InputRadioOptions: FC<InputRadioOptionsProps> = ({ options = ['Si', 'No'], name }: InputRadioOptionsProps) => {
  return (
    <RadioGroup
      name={name}
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
              value={option.toLowerCase()}
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