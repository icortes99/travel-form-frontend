import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
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
