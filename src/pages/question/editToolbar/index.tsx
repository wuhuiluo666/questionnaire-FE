import React from 'react'
import { CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { copyNewComponent, deleteComponent, hiddenComponent, lockedComponent, pasteComponent } from '../../../store/componentList'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const { selectedId, currentComponent, copyComponent } = useGetComponentsList()
    const { isLocked } = currentComponent || {}
    const DeleteComp = () => {
        dispatch(deleteComponent())
    }
    const hiddenComp = () => {
        dispatch(hiddenComponent({ fe_id: selectedId, hidden: true }))
    }
    const lockComp = () => {
        dispatch(lockedComponent({ fe_id: selectedId }))
    }
    const copyComp = () => {
        dispatch(copyNewComponent())
    }
    const pasteComp = () => {
        dispatch(pasteComponent())
    }
    return <div>
        <Space>
            <Tooltip title={'删除'}>
                <Button shape={'circle'} onClick={DeleteComp} icon={<DeleteOutlined />}></Button>
            </Tooltip>
            <Tooltip title={'隐藏'}>
                <Button shape={'circle'} onClick={hiddenComp} icon={<EyeInvisibleOutlined />}></Button>
            </Tooltip>
            {/* 默认未锁定 */}
            <Tooltip title={isLocked ? '解锁' : '锁定'}>
                <Button onClick={lockComp} type={isLocked ? 'primary' : 'default'} shape={'circle'} icon={<LockOutlined />}></Button>
            </Tooltip>
            <Tooltip title={'复制'}>
                <Button onClick={copyComp} shape={'circle'} icon={<CopyOutlined />}></Button>
            </Tooltip>
            <Tooltip title={'粘贴'}>
                <Button disabled={copyComponent === null} onClick={pasteComp} shape={'circle'} icon={<HeartOutlined />}></Button>
            </Tooltip>
        </Space>
    </div>
}