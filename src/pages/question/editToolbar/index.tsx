import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const deleteComponent = () => {

    }
    return <div>
        <Tooltip title={'删除'}>
            <Button icon={<DeleteOutlined />}></Button>
        </Tooltip>
    </div>   
}