import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '../services/user'
import { UserType } from '../store/user'
import { loginReducer } from '../store/user'

export const useGetUserInfo = () => {
  // 加载userInfo的状态
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { userName } = useSelector<{
    user: UserType
  }>((state) => state.user) as UserType
  const { run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess: (result) => {
      const { nickName, userName } = result
      dispatch(
        loginReducer({
          nickName,
          userName
        })
      )
    },
    onFinally: () => {
      setLoading(false)
    }
  })
  useEffect(() => {
    if (userName) {
      setLoading(false)
      return
    }
    run()
  }, [userName])

  return {
    loading
  }
}
