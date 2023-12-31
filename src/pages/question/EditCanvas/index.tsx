import React from 'react'
import styles from './index.module.scss'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'
import { Spin } from 'antd'
import { ComponentProps, moveComponent } from '../../../store/componentList'
import { GetComponentByType } from '../../../QuestionComponent'
import { changeSelectedId } from '../../../store/componentList'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useBindCanvasKeyPress } from '../../../hooks/useBindCanvasKeyPress'
import { SortableContainer } from '../../../components/DragSortable/SortableContainer'
import { SortableItem } from '../../drag/SortableItem'

export const EditCanvas = ({ loading }: { loading: boolean }) => {
    const dispatch = useDispatch()
    // 渲染组件
    const genComponent = (component: ComponentProps) => {
        const { type, props } = component // 后端数据获取的type和props
        // 为什么要找因为要传入props
        const ComponentConfig = GetComponentByType(type) // 根据type返回Component
        if (!ComponentConfig) return null
        const { Component } = ComponentConfig
        return <Component {...props} />
    }
    // onClick 只能传入函数不能传入函数执行 意味着函数执行只要有参数就需要 () => 去执行需要执行的函数
    const clickComponnet = (e: MouseEvent, id: string) => {
        e.stopPropagation()
        dispatch(changeSelectedId(id))
    }
    const { componentsList, selectedId } = useGetComponentsList() // redux获取componentsList
    const componentListWithId = componentsList.map(c => ({ ...c, id: c.fe_id }))
    const handleDragEnd = (activeIndex: number, overIndex: number) => {
        dispatch(moveComponent({ activeIndex, overIndex }))
    }
    useBindCanvasKeyPress()
    if (loading) {
        return <Spin size={'large'} style={{ position: 'relative', top: '50%', left: '50%' }} />
    }
    return <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        <div className={styles.canvas}>
            {
                componentsList.filter(visible => !visible.isHidden).map((component: ComponentProps) => {
                    const { fe_id, isLocked } = component
                    const defaultComponentClassName = styles['component-wrapper']
                    const selectedComponentClassName = styles.selected
                    const lockedComponentClassName = styles.locked
                    const ComponentClassName = classNames({
                        [defaultComponentClassName]: true,
                        [selectedComponentClassName]: fe_id === selectedId,
                        [lockedComponentClassName]: isLocked
                    })
                    return <SortableItem key={fe_id} id={fe_id}>
                        <div onClick={(e: any) => clickComponnet(e, fe_id)} key={fe_id} className={ComponentClassName}>
                            <div className={styles.component}>
                                {genComponent(component)}
                            </div>
                        </div>
                    </SortableItem>
                })
            }
        </div>
    </SortableContainer>
}