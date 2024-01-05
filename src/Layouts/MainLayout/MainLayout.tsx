import React, { useState } from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../../components/Logo/Logo'
import UserInfo from '../../components/UserInfo/UserInfo'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { useNav } from '../../hooks/useNav'
const { Header, Content, Footer } = Layout

const MainLayout = () => {
    const { loading } = useGetUserInfo()
    useNav(loading)
    return (
        <Layout>
            <Header className={styles.header}>
                <div>
                    <Logo />
                </div>
                <div>
                    <UserInfo />
                </div>
            </Header>
            <Layout className={styles.main}>
                {loading && <Spin size={'large'} style={{ position: 'absolute', top: '50%', left: '50%' }} />}
                <Content>{!loading && <Outlet />}</Content>
            </Layout>
            <Footer className={styles.footer}>
                &copy;2023 - Present. Created By WuHuiLuo666
            </Footer>
        </Layout>
    )
}

export default MainLayout
