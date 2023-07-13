import React from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import './Logo.module.scss'

const Logo = () => {
    return (
        <div>
            <Link to={"/"}>
                <Space>
                    <Typography.Title>
                        <FormOutlined />
                    </Typography.Title>
                    <Typography.Title>
                        问卷系统
                    </Typography.Title>
                </Space>
            </Link>
        </div>
    )
}

export default Logo