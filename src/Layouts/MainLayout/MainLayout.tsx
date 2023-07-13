import React from 'react'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

const MainLayout = () => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>Logo</div>
                <div className={styles.right}>123</div>
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