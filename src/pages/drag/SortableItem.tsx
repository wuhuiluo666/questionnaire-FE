import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type PropsType = {
    id: string
    children: JSX.Element
}

export const SortableItem = (props: PropsType) => {
    const { id, children } = props
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id
    })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
        {children}
    </div>
}