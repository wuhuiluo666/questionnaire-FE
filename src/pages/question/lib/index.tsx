import React from 'react'
import { ComponentConfigGroup } from '../../../QuestionComponent'
import { Typography } from 'antd'

const { Title } = Typography

export const ComponentLib = () => {
    return <div>
        {
            ComponentConfigGroup.map((group,index) => {
                return <div key={group.group_id}>
                    <Title level={3} style={{ marginTop: index > 0 ? '20px' : 0, marginBottom: 0, fontSize: '16px' }}>{group.groupName}</Title>
                </div>
            })
        }
    </div>
}