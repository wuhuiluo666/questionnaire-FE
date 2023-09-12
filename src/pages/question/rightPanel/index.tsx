import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { PropsForm } from '../PropsForm'
import { PageSetting } from '../pageSetting'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'

enum tabType {
    TAB_PROPS = 'prop',
    TAB_SETTINGS = 'settings'
}

export const RightPanel = () => {
    const [activeKey, setActiveKey] = useState('prop')
    const { selectedId } = useGetComponentsList()
    useEffect(() => {
        if (selectedId) {
            setActiveKey(tabType.TAB_PROPS)
        } else {
            setActiveKey(tabType.TAB_SETTINGS)
        }
    }, [selectedId])
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
            children: <PageSetting />
        }
    ]
    return <Tabs activeKey={activeKey} items={tabsItem} />
}