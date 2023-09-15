import React from 'react'
import { DndContext, DragEndEvent, closestCenter, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { useDispatch } from 'react-redux'

type PropsType = {
    children: JSX.Element | JSX.Element[],
    items: { id: string, [key: string]: any }[],
    onDragEnd: (activeIndex: number, overIndex: number) => void
}

export const SortableContainer = (props: PropsType) => {
    const { children, items, onDragEnd } = props
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8 // 鼠标移动超过8px 则认为进行拖拽
            }
        })
    )
    const handleDragEnd = (dragItem: DragEndEvent) => {
        const { active, over } = dragItem
        if (over === null) return
        if (active.id !== over.id) {
            const activeIndex = items.findIndex(item => item.id === active.id)
            const overIndex = items.findIndex(item => item.id === over.id)
            onDragEnd(activeIndex, overIndex)
        }
    }
    return <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToParentElement]}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    </DndContext>
}