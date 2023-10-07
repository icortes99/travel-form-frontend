import { FC, useCallback, useRef, useState, lazy, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  useDisclosure,
  Checkbox,
  Divider
} from '@chakra-ui/react'
import FormTemplate from './form-template'
import CardCarousel from '../../../shared/components/card-carousel.component'
import { useAttractionsLazyQuery, useAgencyDestiniesQuery } from '../../../shared/generated/graphql-schema'
import Loading from '../../../shared/components/loading.component'

const Modal = lazy(() => import('../../../shared/components/modal.component'))
const CardItem = lazy(() => import('../../../shared/components/card-item.component'))

interface DestinationFormProps {
  lsKey: string
}

const DestinationForm: FC<DestinationFormProps> = ({ lsKey }: DestinationFormProps) => {
  const router = useRouter()
  const modalRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAttractions, setSelectedAttractions] = useState([])
  const agency = 'FantasticTravel'

  const travelAgencyResponse = useAgencyDestiniesQuery({
    variables: {
      where: {
        slug: agency
      }
    }
  })

  const [fetchAttractions, attractionsResponse] = useAttractionsLazyQuery()

  const onDestinationSelection = useCallback(async (clickedDestiny: string) => {
    await fetchAttractions({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          uuid: clickedDestiny
        }
      }
    })

    onOpen()
  }, [])

  const nextStep = () => {
    const data = {
      destination: agency,
      attractions: selectedAttractions
    }
    window.localStorage.setItem(lsKey, JSON.stringify(data))
    router.push(`/application/${agency}?step=2`)
  }

  const handleCheckbox = (attraction: string) => {
    const index = selectedAttractions.indexOf(attraction)

    if (index === -1)
      setSelectedAttractions((previous) => [...previous, attraction])
    else
      setSelectedAttractions((previous) => previous.filter((item) => item !== attraction))
  }

  const closeModal = () => {
    setSelectedAttractions([])
    onClose()
  }

  const agencyApplications = travelAgencyResponse?.data?.travelAgency?.applications ?? []

  const destinationAttractions = attractionsResponse?.data?.destination?.attractions ?? []

  return (
    <FormTemplate
      title='Escoge un destino'
      description='Comenzaremos con el destino que deseas visitar, te brindamos toda la información necesaria para que tomes la mejor decisión.'
      step={0}
    >
      <Box
        display={'flex'}
        flexDirection={{ sm: 'column', md: 'row' }}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
      >
        {
          (!travelAgencyResponse.loading) ?
            agencyApplications.map((application) => (
              <CardCarousel
                data={application.destination}
                onCLick={onDestinationSelection}
                key={application.uuid}
              />
            ))
            : <Loading area={'partial'} />
        }
      </Box>
      <Suspense fallback={<Loading />}>
        <Modal
          title='Nos gustaría saber cuáles atracciones son las que más te llaman la atención para centrar el viaje en torno a ellas:'
          finalFocusRef={modalRef}
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={nextStep}
          submitText={selectedAttractions.length === 0 ? 'Omitir' : 'Continuar'}
        >
          {
            (!attractionsResponse.loading) ?
              destinationAttractions.map((item, i) => (
                <>
                  <Box
                    key={i}
                    display='flex'
                    cursor={'pointer'}
                    backgroundColor={selectedAttractions.includes(item.uuid) ? `white.itemPink` : `white.white`}
                    _hover={{ backgroundColor: '#ffe6ea' }}
                    borderRadius={'.9rem'}
                  >
                    <CardItem
                      data={item}
                      onClick={handleCheckbox}
                      width={'90%'}
                    />
                    <Box
                      display={'flex'}
                      paddingTop={'9.5rem'}
                    >
                      <Checkbox
                        size='lg'
                        colorScheme='pink'
                        margin={'0 1rem'}
                        height={'1.6rem'}
                        isChecked={selectedAttractions.includes(item.uuid) ? true : false}
                        onChange={() => (handleCheckbox(item.uuid))}
                      />
                    </Box>
                  </Box>
                  {
                    (destinationAttractions.length - 1) > i &&
                    <Divider
                      key={i + 100}
                      margin={'1.5rem 0'}
                      border={'.01rem solid rgba(128, 128, 128, 0.5)'}
                      maxWidth={'99%'}
                    />
                  }
                </>
              ))
              : <Loading area='partial' />
          }
        </Modal>
      </Suspense>
    </FormTemplate>
  )
}

export default DestinationForm