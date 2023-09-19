import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts'

export const COLORS = [
    '#2468F2',
    '#A5E693',
    '#FAD000',
    '#F33E3E',
    '#A985FF',
    '#005C99',
    '#87D26D',
    '#FF8E52',
    '#E62E6B',
    '#98B8FF',
]

export interface RadioStaticProps {
    chart: { name: string, count: number }[]
}

export const RadioStatic = (props: RadioStaticProps) => {
    const { chart } = props
    return <div style={{ width: '400px', height: '400px' }}>
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <PieChart width={400} height={400}>
                <Pie data={chart} outerRadius={50} cx={'50%'} cy={'50%'} dataKey={'count'}>
                    {
                        chart.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]}></Cell>
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>
}