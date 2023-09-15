import React from 'react'
import { DndContext, DragEndEvent, closestCenter, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

type PropsType = {
    children: JSX.Element | JSX.Element[],
    items: { id: string, [key: string]: any }[]
}

export const SortableContainer = (props: PropsType) => {
    const { children, items } = props
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8 // 鼠标移动超过8px 则认为进行拖拽
            }
        })
    )
    return <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToParentElement]}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    </DndContext>
}