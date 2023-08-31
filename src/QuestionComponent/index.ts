import { ComponentTitleProps } from './ComponentTitle'
import { ComponentInputProps } from './ComponentInput'
import { FC } from 'react'
import { ComponentInputConfig } from './ComponentInput/component'
import { ComponentTitleConfig } from './ComponentTitle/component'
import { ComponentParagraphProps } from './ComponentParagraph'
import { ComponentParagraphConfig } from './ComponentParagraph/component'

// 所有组件的属性
export type AllComponentProps = ComponentInputProps &
  ComponentTitleProps &
  ComponentParagraphProps

// 所有组件的配置
export type ComponentConfig = {
  title: string
  type: string
  Component: FC<AllComponentProps>
  ComponentProps: FC<AllComponentProps>
  defaultProps: AllComponentProps
}
// 所有组件配置的列表
export const ComponentConfigList: ComponentConfig[] = [
  ComponentInputConfig,
  ComponentTitleConfig,
  ComponentParagraphConfig
]

// 左侧所有组件分类
export const ComponentConfigGroup = [
  {
    group_id: 'Group_Text',
    groupName: '文本显示',
    components: [ComponentTitleConfig, ComponentParagraphConfig]
  },
  {
    group_id: 'Group_Input',
    groupName: '用户输入',
    components: [ComponentInputConfig]
  }
]

// 根据type返回组件配置
export const GetComponentByType = (type: string) => {
  return ComponentConfigList?.find((component) => component.type === type)
}
