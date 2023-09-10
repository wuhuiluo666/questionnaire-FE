import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { Button, Input, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { changeSelectedId, changeComponentTitle, lockedComponent, hiddenComponent } from '../../../store/componentList'

export const Layers = () => {
    const titleDefaultClassName = styles.title
    const selectedClassName = styles.selected
    const dispatch = useDispatch()
    const { componentsList, selectedId } = useGetComponentsList()
    // 判断左侧点击的组件右侧是否对应
    const [changingTitleId, setChangingTitleId] = useState('')
    // 点击图层标题
    const handleTitleClick = (id: string) => {
        const curComponent = componentsList.find(c => c.fe_id === id)
        if (curComponent && curComponent.isHidden) {
            message.info('不能选中隐藏的组件')
            return
        }
        if (id !== selectedId) {
            // 不是选中的组件将selectedId置为那个后，清空changingTitleId(不要出现输入框)
            dispatch(changeSelectedId(id))
            setChangingTitleId('')
            return
        }
        setChangingTitleId(id)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value.trim()
        if (!newTitle) return
        dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
    }
    const hideComponent = (fe_id: string, hidden: boolean) => {
        dispatch(hiddenComponent({ fe_id, hidden }))
    }
    const lockComponent = (fe_id: string) => {
        dispatch(lockedComponent({ fe_id }))
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
                            {changingTitleId === fe_id && <Input onPressEnter={() => setChangingTitleId('')} onBlur={() => setChangingTitleId('')} value={title} onChange={changeTitle} />}
                            {changingTitleId !== fe_id && title}
                        </div>
                        <div className={styles.handler}>
                            <Space>
                                <Button onClick={() => hideComponent(fe_id, !isHidden)} className={!isHidden ? styles.btn : ''} size={'small'} shape={'circle'} type={isHidden ? 'primary' : 'text'} icon={<EyeInvisibleOutlined />}></Button>
                                <Button onClick={() => lockComponent(fe_id)} className={!isLocked ? styles.btn : ''} size={'small'} shape={'circle'} type={isLocked ? 'primary' : 'text'} icon={<LockOutlined ></LockOutlined>}></Button>
                            </Space>
                        </div>
                    </div>
                )
            })
        }
    </>
}