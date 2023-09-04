import { FC, createElement } from 'react'
import styles from '../../../styles/stepper.module.scss'
import { CastleSVG, ContactSVG, InfoSVG, HotelSVG } from './svgIcons'

interface CustomerStepperProps {
  currentStep: number
}

const CustomerStepper: FC<CustomerStepperProps> = ({ currentStep }: CustomerStepperProps) => {
  const steps = [
    { title: 'Destino', description: 'Paso 1/4', icon: CastleSVG },
    { title: 'Acerca de ', description: 'Paso 2/4', icon: InfoSVG },
    { title: 'Hospedaje', description: 'Paso 3/4', icon: HotelSVG },
    { title: 'Contacto', description: 'Paso 4/4', icon: ContactSVG }
  ]

  return (
    <section className={styles.stepper}>
      {
        steps.map((step, i) => (
          <div key={i} className={currentStep === i ? `${styles.stepper__container} ${styles.stepper__container__focus}` : styles.stepper__container}>
            <div className={styles.stepper__icon}>
              <step.icon focus={currentStep === i ? true : false} />
            </div>
            <div className={currentStep === i ? styles.stepper__info : styles.stepper__info__hidden} >
              <p className={styles.stepper__description}>{step.description}</p>
              <h2 className={styles.stepper__title}>{step.title}</h2>
            </div>
          </div>
        ))
      }
    </section>
  )
}

export default CustomerStepper