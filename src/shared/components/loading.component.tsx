import { FC } from 'react'
import styles from '../../../styles/loader.module.css'

interface LoadingProps {
  area?: 'full' | 'partial'
}

const Loading: FC<LoadingProps> = ({ area = 'full' }: LoadingProps) => {
  return (
    <div className={area === 'full' ? styles.loader_container : styles.loader_container_inside}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Loading