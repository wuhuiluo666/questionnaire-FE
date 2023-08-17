import { ComponentTitleProps } from './ComponentTitle'
import { ComponentInputProps } from './ComponentInput'
import { FC } from 'react'
import { ComponentInputConfig } from './ComponentInput/component'
import { ComponentTitleConfig } from './ComponentTitle/component'

// 所有组件的属性
export type AllComponentProps = ComponentInputProps & ComponentTitleProps

// 所有组件的配置
export type ComponentConfig = {
  title: string
  type: string
  Component: FC<AllComponentProps>
  defaultProps: AllComponentProps
}
// 所有组件配置的列表
export const ComponentConfigList: ComponentConfig[] = [
  ComponentInputConfig,
  ComponentTitleConfig
]

// 左侧所有组件分类
export const ComponentConfigGroup = [
  {
    
  }
]

// 根据type返回组件配置
export const GetComponentByType = (type: string) => {
  return ComponentConfigList?.find((component) => component.type === type)
}
