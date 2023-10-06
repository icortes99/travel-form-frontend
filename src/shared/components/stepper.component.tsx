import { FC, createElement } from 'react'
import { CastleSVG, ContactSVG, InfoSVG, HotelSVG } from './svgIcons.component'
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react'

interface StepperProps {
  currentStep: number
}

const Stepper: FC<StepperProps> = ({ currentStep }: StepperProps) => {
  const steps = [
    { title: 'Destino', description: 'Paso 1/4', icon: CastleSVG },
    { title: 'Acerca de ', description: 'Paso 2/4', icon: InfoSVG },
    { title: 'Hospedaje', description: 'Paso 3/4', icon: HotelSVG },
    { title: 'Contacto', description: 'Paso 4/4', icon: ContactSVG }
  ]

  return (
    <Box
      display={'flex'}
      width={'100%'}
      marginBottom={'1.7rem'}
      justifyContent={{ sm: 'center', md: 'center', lg: 'flex-end' }}
    >
      {/*
        steps.map((step, i) => (
          <Box
            key={i}
            boxShadow={'1px 6px 10px 0px rgba(0,0,0,0.44)'}
            className={currentStep === i ? `${styles.stepper__container} ${styles.stepper__container__focus}` : styles.stepper__container}
          >
            <Box
              width={'2.5rem'}
            >
              <step.icon focus={currentStep === i ? true : false} />
            </Box>
            <Box
              className={currentStep === i ? styles.stepper__info : styles.stepper__info__hidden}
            >
              <Text
                fontSize={'.75rem'}
                color={'#636363'}
                margin={0}
              >
                {step.description}
              </Text>
              <Heading
                as={'h2'}
                fontSize={'1.05rem'}
                margin={0}
                height={'auto'}
                fontWeight={500}
              >
                {step.title}
              </Heading>
            </Box>
          </Box>
        ))
      */}
      <Box
        boxShadow={'1px 6px 10px 0px rgba(0,0,0,0.44)'}
        width={'10rem'}
        padding={'.5rem .9rem .5rem .6rem'}
        display={'flex'}
        backgroundColor={`white.main`}
        borderRadius={'.9rem'}
      >
        <Box
          width={'2.5rem'}
          marginRight={'.6rem'}
        >
          {createElement(steps[currentStep].icon)}
        </Box>
        <Box>
          <Text
            fontSize={'.75rem'}
            color={`white.subTitles`}
            margin={0}
          >
            {steps[currentStep].description}
          </Text>
          <Heading
            as={'h2'}
            fontSize={'1.05rem'}
            margin={0}
            height={'auto'}
            fontWeight={500}
            color={`white.text`}
          >
            {steps[currentStep].title}
          </Heading>
        </Box>
      </Box>
    </Box>
  )
}

export default Stepper