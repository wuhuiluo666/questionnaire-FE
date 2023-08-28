import React from 'react'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { deleteComponent, hiddenComponent } from '../../../store/componentList'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const { selectedId } = useGetComponentsList()
    const DeleteComp = () => {
        dispatch(deleteComponent())
    }
    const hiddenComp = () => {
        dispatch(hiddenComponent({ fe_id: selectedId, hidden: true }))
    }
    return <div>
        <Tooltip title={'删除'}>
            <Button shape={'circle'} onClick={DeleteComp} icon={<DeleteOutlined />}></Button>
        </Tooltip>
        <Tooltip title={'隐藏'}>
            <Button shape={'circle'} onClick={hiddenComp} icon={<EyeInvisibleOutlined />}></Button>
        </Tooltip>
    </div>
}