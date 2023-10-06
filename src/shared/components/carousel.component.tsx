import { FC, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import styles from '../../../styles/carousel.module.css'
import { Box, Image } from '@chakra-ui/react'
/*import {
  Image
} from '@chakra-ui/react'*/
//import Image from 'next/image'

interface CarouselProps {
  images: string[]
}

interface ArrowProps {
  left: boolean,
  onClick: (param) => void
}

const Arrow: FC<ArrowProps> = ({ left, onClick }: ArrowProps) => {
  return (
    <svg
      onClick={onClick}
      className={`${styles.arrow} ${left ? `${styles.arrow__left}` : `${styles.arrow__right}`}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox="0 0 24 24"
    >
      {left && (
        <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
      )}
      {!left && (
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      )}
    </svg>
  )
}

const Carousel: FC<CarouselProps> = ({ images }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: images.length,
      loop: true,
      detailsChanged(s) {
        const new_opacities = s.track.details.slides.map((slide) => slide.portion)
        setOpacities(new_opacities)
        setCurrentSlide(s.track.details.rel)
      },
      created() {
        setLoaded(true)
      }
    }
  )

  const [opacities, setOpacities] = useState([])

  return (
    <Box
      ref={sliderRef}
      height={'18.5rem'}
      position={'relative'}
      overflow={'hidden'}
      width={'100%'}
      borderTopLeftRadius={'.9rem'}
      borderTopRightRadius={'.9rem'}
      clipPath={'ellipse(90% 85% at 50% 15%)'}
    >
      {
        /*<Image
          src={image[0]}
          alt='image test'
          width={500}
          height={500}
        />*/
        //error: https://nextjs.org/docs/messages/next-image-unconfigured-host
      }
      <Box>
        {
          images.map((src, idx) => (
            <Box
              key={idx}
              style={{ opacity: opacities[idx] }}
              width={'100%'}
              height={'100%'}
              position={'absolute'}
              top={0}
            >
              <Image
                src={src}
                width={'100%'}
                height={'100%'}
                objectFit={'cover'}
                top={0}
              />
            </Box>
          ))
        }
      </Box>
      {
        loaded && instanceRef.current && (
          <> {/* ARROWS */}
            <Arrow
              left={true}
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />

            <Arrow
              left={false}
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />

            {/* DOTS */}
            <Box
              position={'absolute'}
              width={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              zIndex={'999!important'}
              bottom={'0'}
              padding={'.5rem 0'}
            >
              {
                images.map((img, i) => {
                  return (
                    <span
                      key={i}
                      className={`${styles.dots__dot} ${currentSlide === i ? styles.dots__active : ''}`}
                    ></span>
                  )
                })
              }
            </Box>
          </>
        )
      }
    </Box>
  )
}

export default Carousel