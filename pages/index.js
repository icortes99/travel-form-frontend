import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useUserQuery, useCreateApplicationMutation } from '../src/shared/generated/graphql-schema'

export default function Home() {
  const user = useUserQuery({
    variables: {
      where: {
        email: 'cortes.ivan353@gmail.com'
      }
    }
  })

  const [createApplication] = useCreateApplicationMutation()

  const handleClick = async ()=>{
    const response = await createApplication({
      variables: {
        data: {

        }
      }
    })
  }

  console.log('user: ', user)

  return (
    <div className={styles.container}>
      <Head>
        <title>Travel forms</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Index</h1>
      </main>
    </div>
  )
}
