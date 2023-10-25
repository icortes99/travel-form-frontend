import { FC } from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import Poppins from '../font/font'
import Button from './button.component'
import { useTranslation } from '../hooks'

interface ModalProps {
  title: string
  children: any
  finalFocusRef: any
  exitButton?: boolean
  isOpen: boolean
  onClose: () => void
  size?: string
  onSubmit: () => void
  submitText: string
}

const Modal: FC<ModalProps> = ({ title, children, finalFocusRef, exitButton = false, isOpen, onClose, size = 'lg', onSubmit, submitText }: ModalProps) => {
  const { t } = useTranslation()

  return (
    <ChakraModal
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      isOpen={isOpen}
      scrollBehavior={'inside'}
      size={{ sm: 'full', md: 'xl' }}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor={'white'}
        className={Poppins.className}
      >
        <ModalHeader
          py={0}
          marginTop={'.3rem'}
          padding={'.6rem 1rem .5rem'}
          fontWeight={'normal'}
          fontSize={'normal'}
          color={`white.text`}
        >
          {title}
          {exitButton && <ModalCloseButton />}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter
          display={'flex'}
          width={'100%'}
          justifyContent={'space-evenly'}
        >
          <Button
            text={t('buttons.back')}
            onClick={onClose}
            variant='outline'
          />
          <Button
            text={submitText}
            onClick={onSubmit}
            variant='solid'
          />
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal