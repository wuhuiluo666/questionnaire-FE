import { DndContext } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { useSortable, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Checkbox, Typography } from 'antd'
import React, { useState } from 'react'


export type ItemType = {
    key: string
    width: number
    isChecked: boolean
    title: string
}

export const Drag = () => {
    const [dataList, setDataList] = useState([
        { key: 'name', width: 0.25, isChecked: true, title: '姓名' },
        { key: 'age', width: 0.25, isChecked: true, title: '年龄' },
        { key: 'sex', width: 0.25, isChecked: true, title: '性别' },
        { key: 'phone', width: 0.25, isChecked: true, title: '手机号' }
    ])
    const MoveIndex = (dataList: ItemType[], dragItem: any) => {
        const { active, over } = dragItem
        let activeIndex = 0
        let overIndex = 0
        try {
            dataList.forEach((item: any, index: any) => {
                if (active.id === item.key) {
                    activeIndex = index
                }
                if (over.id === item.key) {
                    overIndex = index
                }
            })
        } catch (error) {
            overIndex = activeIndex // 如果有问题复位
        }
        return {
            activeIndex, overIndex
        }
    }
    // 拖拽项组件
    const SortableItem = (props: any) => {
        const { checkedItem } = props
        const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
            id: checkedItem.key,
            transition: {
                duration: 500,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
            }
        })
        const styles = {
            transform: CSS.Transform.toString(transform),
            transition
        }
        const changeCheck = (e: any) => {
            console.log('aaa', e)
        }
        return <li ref={setNodeRef} {...attributes} {...listeners} style={styles}>
            <Checkbox checked={checkedItem.isChecked} onChange={changeCheck}></Checkbox>
            <Typography.Text>{checkedItem.title}</Typography.Text>
        </li>
    }
    const dragEndEvent = (dragItem: any) => {
        setDataList((prevDataList) => {
            const moveDataList = [...prevDataList]
            const { activeIndex, overIndex } = MoveIndex(moveDataList, dragItem)
            const newDataList = arrayMove(moveDataList, activeIndex, overIndex)
            return newDataList
        })
    }
    return <DndContext onDragEnd={dragEndEvent} modifiers={[restrictToParentElement]}>
        <SortableContext items={dataList.map(data => data.key)} strategy={verticalListSortingStrategy}>
            {/* 这里的items接收一个数组,这里的数组值要和useSortable传入的id一一对应 */}
            <div>
                <ul>
                    {
                        dataList.map(data => (
                            <SortableItem checkedItem={data} key={data.key}></SortableItem>
                        ))
                    }
                </ul>
            </div>
        </SortableContext>
    </DndContext>
}