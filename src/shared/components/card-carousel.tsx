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
  name: string
  description: string
}

const CardCarousel: FC<CardCarouselProps> = ({ images, name, description }: CardCarouselProps) => {
  return (
    <Card maxW='md' className={styles.card}>
      <Carousel images={images} />
      <CardBody py={3}>
        <Stack mt='0' spacing='0'>
          <Heading py={0} size='md'>{name}</Heading>
          <Text py={3}>
            {description}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default CardCarousel