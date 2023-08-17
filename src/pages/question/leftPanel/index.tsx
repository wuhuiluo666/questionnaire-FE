import React from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'

export const LeftPanel = () => {
    const tabsItem = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <AppstoreOutlined />
                    组件库
                </span>
            ),
            children: <div>组件库</div>
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: <div>图层</div>
        }
    ]
    return <Tabs defaultActiveKey='componentLib' items={tabsItem}></Tabs>
}