import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useUserQuery, useCreateApplicationMutation } from '../src/shared/generated/graphql-schema'
import CustomButton from '../src/shared/components/button'
import CardCarousel from '../src/shared/components/card-carousel'

export default function Home() {
  /*const user = useUserQuery({
    variables: {
      where: {
        email: 'cortes.ivan353@gmail.com'
      }
    }
  })*/

  //const [createApplication] = useCreateApplicationMutation()

  /*const handleClick = async ()=>{
    const response = await createApplication({
      variables: {
        data: {

        }
      }
    })
  }*/

  //console.log('user: ', user)

  const images = [
    'https://images.unsplash.com/photo-1524008279394-3aed4643b30b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzbmV5fGVufDB8fDB8fHww&w=1000&q=80',
    'https://images.unsplash.com/photo-1632754120060-5a14b0dd5ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlzbmV5JTIwd29ybGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://www.elespectador.com/resizer/MFd9UJWXzkpFw7FYdOJDKmvINIQ=/568x378/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/4C3EHKXPIRBWPJBZCYPFFPFUDU.jpg'
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Travel forms</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Index</h1>
        <CustomButton name='Naza' action={()=>console.log('prueba')} type='secondary'/>
        <CardCarousel name='Disneyland Paris' images={images} description='Orlando, Flordia' />
      </main>
    </div>
  )
}
