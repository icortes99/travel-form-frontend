import { FC } from 'react'
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text
} from '@chakra-ui/react'
import Carousel from './carousel'
import styles from '../../../styles/card-carousel.module.scss'

interface CardCarouselProps {
  images: string[]
  title: string
  description: string
}

const CardCarousel: FC<CardCarouselProps> = ({ images, title, description }: CardCarouselProps) => {
  return (
    <Card maxW='md' className={styles.card}>
      <Carousel images={images} />
      <CardBody py={3}>
        <Stack mt='0' spacing='0'>
          <Heading py={1} size='md'>{title}</Heading>
          <Text size='md' py={0} className={styles.card__text}>
            {description}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default CardCarousel