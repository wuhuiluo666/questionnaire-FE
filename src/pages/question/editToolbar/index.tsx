import React from 'react'
import { ActionCreators as undoActionCreators } from 'redux-undo'
import { CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, HeartOutlined, LockOutlined, UpOutlined, DownOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { copyNewComponent, deleteComponent, hiddenComponent, lockedComponent, moveComponent, pasteComponent } from '../../../store/componentList'
import { useGetComponentsList } from '../../../hooks/useGetComponentsList'

export const EditToolBar = () => {
    const dispatch = useDispatch()
    const { componentsList, selectedId, currentComponent, copyComponent } = useGetComponentsList()
    const { isLocked } = currentComponent || {}
    const curIndex = componentsList.findIndex(c => c.fe_id === selectedId)
    const length = componentsList.length
    const first = curIndex <= 0
    const last = curIndex < 0 || curIndex + 1 === length
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
    const upComp = () => {
        // 上移
        dispatch(moveComponent({ activeIndex: curIndex, overIndex: curIndex - 1 }))
    }
    const downComp = () => {
        // 下移
        dispatch(moveComponent({ activeIndex: curIndex, overIndex: curIndex + 1 }))
    }
    // 重做
    const redo = () => {
        dispatch(undoActionCreators.redo())
    }
    // 撤销
    const undo = () => {
        dispatch(undoActionCreators.undo())
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
            <Tooltip title={'上移'}>
                <Button onClick={upComp} shape={'circle'} icon={<UpOutlined />} disabled={first}></Button>
            </Tooltip>
            <Tooltip title={'下移'}>
                <Button onClick={downComp} shape={'circle'} icon={<DownOutlined />} disabled={last}></Button>
            </Tooltip>
            <Tooltip title={'撤销'}>
                <Button onClick={undo} shape={'circle'} icon={<UndoOutlined />} disabled={last}></Button>
            </Tooltip>
            <Tooltip title={'重做'}>
                <Button onClick={redo} shape={'circle'} icon={<RedoOutlined />} disabled={last}></Button>
            </Tooltip>
        </Space>
    </div>
}