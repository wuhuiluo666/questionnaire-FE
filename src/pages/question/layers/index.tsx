import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { Button, Input, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentList'

export const Layers = () => {
    const titleDefaultClassName = styles.title
    const selectedClassName = styles.selected
    const dispatch = useDispatch()
    const { componentsList, selectedId } = useGetComponentsList()
    const [changingTitleId, setChangingTitleId] = useState('')
    // 点击图层标题
    const handleTitleClick = (id: string) => {
        const curComponent = componentsList.find(c => c.fe_id === id)
        if (curComponent && curComponent.isHidden) {
            message.info('不能选中隐藏的组件')
            return
        }
        if (id !== selectedId) {
            dispatch(changeSelectedId(id))
            setChangingTitleId('')
            return
        }
        setChangingTitleId(id)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('e', e.target.value)
    }
    return <>
        {
            componentsList.map(c => {
                // isHidden默认是false 没有被隐藏
                const { title, fe_id, isHidden, isLocked } = c
                const titleClassName = classNames({
                    [titleDefaultClassName]: true,
                    [selectedClassName]: fe_id === selectedId // 右侧选中哪个哪个高亮
                })
                return (
                    <div key={fe_id} className={styles.wrapper}>
                        <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                            {changingTitleId === fe_id && <Input value={title} onChange={changeTitle} />}
                            {changingTitleId !== fe_id && title}
                        </div>
                        <div className={styles.handler}>
                            <Space>
                                <Button className={!isHidden ? styles.btn : ''} size={'small'} shape={'circle'} type={isHidden ? 'primary' : 'text'} icon={<EyeInvisibleOutlined />}></Button>
                                <Button className={!isLocked ? styles.btn : ''} size={'small'} shape={'circle'} type={isLocked ? 'primary' : 'text'} icon={<LockOutlined ></LockOutlined>}></Button>
                            </Space>
                        </div>
                    </div>
                )
            })
        }
    </>
}