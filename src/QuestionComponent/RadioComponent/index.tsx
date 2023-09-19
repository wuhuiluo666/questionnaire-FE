import React from 'react'
import { ResponsiveContainer } from 'recharts'

interface RadioStatic {
    chart: { name: string, count: number }[]
}

export const RadioStatic = (props: RadioStatic) => {
    const { chart } = props
    return <div style={{ width: '400px', height: '400px' }}>
        <ResponsiveContainer width={'100%'} height={'100%'}>
        </ResponsiveContainer>
    </div>
}