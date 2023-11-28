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
import { useTranslation } from '../../../shared/hooks'
import Head from 'next/head'

const Modal = lazy(() => import('../../../shared/components/modal.component'))
const CardItem = lazy(() => import('../../../shared/components/card-item.component'))

interface DestinationFormProps {
  lsKey: string
}

const DestinationForm: FC<DestinationFormProps> = ({ lsKey }: DestinationFormProps) => {
  const router = useRouter()
  const modalRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedDestiny, setSelectedDestiny] = useState<string>('')
  const [selectedAttractions, setSelectedAttractions] = useState([])
  const agency = 'FantasticTravel'
  const { t } = useTranslation()

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
    setSelectedDestiny(clickedDestiny)
  }, [])

  const nextStep = () => {
    console.log('destiny: ', selectedDestiny)
    const data = {
      destination: selectedDestiny,
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
      title={'applicationForm.destiny.title'}
      description='applicationForm.destiny.description'
      step={0}
      pageTitle={'applicationForm.destiny.stepName'}
      agencyName={agency}
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
          (!travelAgencyResponse.loading) ? (
            agencyApplications.map((application) => (
              <CardCarousel
                data={application.destination}
                onCLick={onDestinationSelection}
                key={application.uuid}
              />
            ))
          ) : <Loading area={'partial'} />
        }
      </Box>
      <Suspense fallback={<Loading />}>
        <Modal
          title={t('applicationForm.destiny.questions.modalTitle')}
          finalFocusRef={modalRef}
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={nextStep}
          submitText={t('buttons.next')}
        >
          {
            (!attractionsResponse.loading) ? (
              destinationAttractions.map((item, i) => (
                <>
                  <Box
                    key={item.uuid}
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
                      key={i}
                      margin={'1.5rem 0'}
                      border={'.01rem solid rgba(128, 128, 128, 0.5)'}
                      maxWidth={'99%'}
                    />
                  }
                </>
              ))
            ) : <Loading area='partial' />
          }
        </Modal>
      </Suspense>
    </FormTemplate>
  )
}

export default DestinationForm