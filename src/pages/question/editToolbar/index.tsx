import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteComponent } from '../../../store/componentList'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const DeleteComp = () => {
        dispatch(deleteComponent())
    }
    return <div>
        <Tooltip title={'删除'}>
            <Button onClick={DeleteComp} icon={<DeleteOutlined />}></Button>
        </Tooltip>
    </div>
}