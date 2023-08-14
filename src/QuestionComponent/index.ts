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
