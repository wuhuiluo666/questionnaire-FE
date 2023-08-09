import React from 'react'
import styles from './index.module.scss'
import { useLoadQuestionData } from '../../../hooks/useLoadQuestionData'


const Edit = () => {
    const { loading, data } = useLoadQuestionData()
    return <div className={styles['edit-container']}>
        <div>Edit Header</div>
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>Left</div>
                <div className={styles.main}>
                    <div className={styles['canvas-warpper']}>
                        <div style={{ height: '900px' }}></div>
                    </div>
                </div>
                <div className={styles.right}>Rihgt</div>
            </div>
        </div>
    </div>
}

export default Edit