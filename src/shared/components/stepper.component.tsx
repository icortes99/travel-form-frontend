import { FC, createElement } from 'react'
import { CastleSVG, ContactSVG, InfoSVG, HotelSVG, PassengersSVG } from './svgIcons.component'
import {
  Box,
  Text,
  Heading
} from '@chakra-ui/react'
import { DictionaryLeaves } from '../types'
import { useTranslation } from '../hooks'

interface StepperProps {
  currentStep: number
}

interface StepProps {
  title: DictionaryLeaves
  description: DictionaryLeaves,
  icon: FC
}

const Stepper: FC<StepperProps> = ({ currentStep }: StepperProps) => {
  const { t } = useTranslation()
  const steps: StepProps[] = [
    { title: 'applicationForm.destiny.stepName', description: 'applicationForm.destiny.step', icon: CastleSVG },
    { title: 'applicationForm.info.stepName', description: 'applicationForm.info.step', icon: InfoSVG },
    { title: 'applicationForm.itinerary.stepName', description: 'applicationForm.itinerary.step', icon: HotelSVG },
    { title: 'applicationForm.passengers.stepName', description: 'applicationForm.passengers.step', icon: PassengersSVG },
    { title: 'applicationForm.contact.stepName', description: 'applicationForm.contact.step', icon: ContactSVG }
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
            {t(steps[currentStep].description)}
          </Text>
          <Heading
            as={'h2'}
            fontSize={'1.05rem'}
            margin={0}
            height={'auto'}
            fontWeight={500}
            color={`white.text`}
          >
            {t(steps[currentStep].title)}
          </Heading>
        </Box>
      </Box>
    </Box>
  )
}

export default Stepper