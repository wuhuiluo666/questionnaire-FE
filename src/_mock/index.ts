import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => ({
  error: 0,
  data: {
    message: '我是吴辉洛'
  }
}))
