import React from 'react'
import styles from './index.module.scss'
import { EditCanvas } from '../EditCanvas'
import { useGetQuestionDetail } from '../../../hooks/useLoadQuestionData'


const Edit = () => {
    const { loading } = useGetQuestionDetail()
    return <div className={styles['edit-container']}>
        <div>Edit Header</div>
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>Left</div>
                <div className={styles.main}>
                    <div className={styles['canvas-warpper']}>
                       <EditCanvas />
                    </div>
                </div>
                <div className={styles.right}>Rihgt</div>
            </div>
        </div>
    </div>
}

export default Edit