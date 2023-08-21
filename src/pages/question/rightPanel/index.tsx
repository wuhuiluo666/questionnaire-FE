import React from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { PropsForm } from '../PropsForm'


export const RightPanel = () => {
    const tabsItem = [
        {
            key: 'prop',
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <PropsForm />
        },
        {
            key: 'settings',
            label: <span>
                <SettingOutlined />
                页面设置
            </span>,
            children: <div>
                页面设置
            </div>
        }
    ]
    return <Tabs defaultActiveKey={'prop'} items={tabsItem} />
}