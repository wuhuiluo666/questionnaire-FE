import React from 'react'

interface StaticCharProps {
    selectedComponentId: string
    selectedComponentType: string
}

export const StaticChart = (props: StaticCharProps) => {
    const { selectedComponentId, selectedComponentType } = props
    if (!selectedComponentId) return <div style={{ textAlign: 'center', marginTop: '100px' }}>
        未选中任何组件
    </div>
    return <div>
        111
    </div>
}