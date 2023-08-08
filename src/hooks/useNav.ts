import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserType } from '../store/user'
export const useNav = (loading: boolean) => {
  const { userName } = useSelector<{
    user: UserType
  }>((state) => state.user) as UserType
  const { pathname } = useLocation()
  console.log('pagehane' ,pathname)
  const l = ['/login', '/register']
  const b = ['/login', '/register', '/']
  const nav = useNavigate()
  useEffect(() => {
    if (loading) return
    // 已经登录
    if (userName) {
      console.log(l.includes(pathname))
      if (l.includes(pathname)) {
        nav('/manage/list')
      }
      return
    }
    // 未登录
    if(b.includes(pathname)) {
      return
    } else {
      nav('/login')
    }
    
  }, [userName, pathname, loading])
}
