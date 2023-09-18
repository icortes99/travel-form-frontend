import { FC } from 'react'
import styles from '../../../styles/loader.module.css'

const Loading: FC = () => {
  return (
    <div className={styles.loader_container}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Loading