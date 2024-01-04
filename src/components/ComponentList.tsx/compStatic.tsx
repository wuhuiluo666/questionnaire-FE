import { useRequest } from 'ahooks'
import React from 'react'
import { GetComponentByType } from '../../QuestionComponent'
import { getChartListService } from '../../services/static'

interface StaticCharProps {
    selectedComponentId: string
    selectedComponentType: string
}

export const StaticChart = (props: StaticCharProps) => {
    const { run: getChartList } = useRequest(async () => {
        return await getChartListService()
    })
    const { selectedComponentId, selectedComponentType } = props
    if (!selectedComponentId) return <div style={{ textAlign: 'center', marginTop: '100px' }}>
        未选中任何组件
    </div>
    const componentConfig = GetComponentByType(selectedComponentType)
    if (componentConfig === undefined) return null
    console.log('componentConfig', componentConfig)
    const { ChartComp } = componentConfig
    if (ChartComp === undefined) return <div>
        该组件暂无图表统计
    </div>
    return <ChartComp chart=[] />
}
