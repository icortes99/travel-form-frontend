import { FC, createElement } from 'react'
import styles from '../../../styles/stepper.module.scss'
import { CastleSVG, ContactSVG, InfoSVG, HotelSVG } from './svgIcons'
import {
  Box
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
      className={styles.stepper}
    >
      {
        steps.map((step, i) => (
          <Box
            key={i}
            className={currentStep === i ? `${styles.stepper__container} ${styles.stepper__container__focus}` : styles.stepper__container}
          >
            <Box
              className={styles.stepper__icon}
            >
              <step.icon focus={currentStep === i ? true : false} />
            </Box>
            <Box
              className={currentStep === i ? styles.stepper__info : styles.stepper__info__hidden}
            >
              <p
                className={styles.stepper__description}
              >
                {step.description}
              </p>
              <h2
                className={styles.stepper__title}
              >
                {step.title}
              </h2>
            </Box>
          </Box>
        ))
      }
    </Box>
  )
}

export default Stepper