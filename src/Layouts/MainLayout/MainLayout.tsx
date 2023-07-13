import React from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../../components/Logo/Logo'
import UserInfo from '../../components/UserInfo/UserInfo'

const { Header, Content, Footer } = Layout

const MainLayout = () => {
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
                <Content>{<Outlet />}</Content>
            </Layout>
            <Footer className={styles.footer}>
                &copy;2023 - Present. Created By WuHuiLuo666
            </Footer>
        </Layout>
    )
}

export default MainLayout