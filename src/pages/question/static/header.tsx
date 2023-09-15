import React, { useRef } from 'react'
import { CopyOutlined, EditOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Input, Popover, Space, Tooltip, Typography, InputRef, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '../../../hooks/useGetPageInfo'
import QRCode from 'qrcode.react'
import styles from './header.module.scss'


export const StaticHeader = () => {
    const { id } = useParams()
    const { title, isPublished } = useGetPageInfo()
    const nav = useNavigate()
    const linkInputRef = useRef<InputRef>(null)
    const copyLink = () => {
        const ele = linkInputRef.current
        if (ele === null) return
        // 选中input内容
        ele.select()
        // 执行富文本编辑器
        document.execCommand('copy')
        message.success('链接已复制道剪贴板')
    }
    const genLinkAndQrCodeEle = () => {
        // 如果未发布
        // if (!isPublished) return null // 暂时注释掉
        // 拼接url
        const url = `http://localhost:3000/question/${id}`
        return <Space>
            <Input ref={linkInputRef} value={url} style={{ width: '300px' }} />
            <Tooltip title={'拷贝链接'}>
                <Button onClick={copyLink} icon={<CopyOutlined />}></Button>
            </Tooltip>
            <Popover content={<QRCode value={url} size={150}></QRCode>}>
                <Button icon={<QrcodeOutlined />}></Button>
            </Popover>
        </Space>
    }
    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={'link'} icon={<LeftOutlined />} onClick={() => nav(-1)}>
                        返回
                    </Button>
                    <Typography.Title style={{ marginTop: 0 }} level={5}>{title}</Typography.Title>
                </Space>
            </div>
            <div className={styles.main}>{genLinkAndQrCodeEle()}</div>
            <div className={styles.right}>
                <Button onClick={() => nav(`/question/edit/${id}`)} type={'primary'} icon={<EditOutlined />}>
                    编辑问卷
                </Button>
            </div>
        </div>
    </div>
}