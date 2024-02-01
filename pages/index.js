import { useRouter } from 'next/navigation'
import DestinationForm from '../src/modules/applications/application-form/destination-form'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(()=>{
    router.push('/application/fantastic-travel?step=1')
  }, [])
  return (
    <DestinationForm />
  )
}