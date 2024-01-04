import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import { GetComponentByType } from '../../QuestionComponent'
import { getChartListService } from '../../services/static'
import { useParams } from 'react-router'

interface StaticCharProps {
    selectedComponentId: string
    selectedComponentType: string
}

export const StaticChart = (props: StaticCharProps) => {
    const { selectedComponentId, selectedComponentType } = props
    const { id = '' } = useParams()
    const [stat, setStat] = useState([])
    const { run } = useRequest(async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
      {
       manual: true,
       onSuccess(res) {
        setStat(res.stat)
       },
      },
    )
    useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
    }, [id, selectedComponentId])
    if (!selectedComponentId) return <div style={{ textAlign: 'center', marginTop: '100px' }}>
        未选中任何组件
    </div>
    const componentConfig = GetComponentByType(selectedComponentType)
    if (componentConfig === undefined) return null
    const { ChartComp } = componentConfig
    if (ChartComp === undefined) return <div>
        该组件暂无图表统计
    </div>
    return <ChartComp chart={stat} />
}
