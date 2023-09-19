import { FC } from 'react'
import { ComponentTitleProps } from './ComponentTitle'
import { ComponentInputProps } from './ComponentInput'
import { ComponentInputConfig } from './ComponentInput/component'
import { ComponentTitleConfig } from './ComponentTitle/component'
import { ComponentParagraphProps } from './ComponentParagraph'
import { ComponentParagraphConfig } from './ComponentParagraph/component'
import { ComponentInfoProps } from './ComponentInfo'
import { ComponentInfoConfig } from './ComponentInfo/component'
import { ComponentTextAreaProps } from './ComponentTextArea'
import { ComponentTextAreaConfig } from './ComponentTextArea/component'
import { ComponentRadioConfig } from './ComponentRadio/component'
import { ComponentRadioProps } from './ComponentRadio'
import { ComponentCheckBoxProps } from './ComponentCheckbox'
import { ComponentCheckBoxConfig } from './ComponentCheckbox/component'
import { RadioStaticProps } from './RadioComponent'

export type AllComponentProps = ComponentInputProps &
  ComponentTitleProps &
  ComponentParagraphProps &
  ComponentInfoProps &
  ComponentTextAreaProps &
  ComponentRadioProps &
  ComponentCheckBoxProps

export type CharComponentProps = RadioStaticProps

// 所有组件的配置
export type ComponentConfig = {
  title: string
  type: string
  Component: FC<AllComponentProps>
  ComponentProps: FC<AllComponentProps>
  ChartComp?: FC<CharComponentProps>
  defaultProps: AllComponentProps
}
// 所有组件配置的列表
export const ComponentConfigList: ComponentConfig[] = [
  ComponentInputConfig,
  ComponentTitleConfig,
  ComponentParagraphConfig,
  ComponentInfoConfig,
  ComponentTextAreaConfig,
  ComponentRadioConfig,
  ComponentCheckBoxConfig
]

// 左侧所有组件分类
export const ComponentConfigGroup = [
  {
    group_id: 'Group_Text',
    groupName: '文本显示',
    components: [
      ComponentTitleConfig,
      ComponentParagraphConfig,
      ComponentInfoConfig
    ]
  },
  {
    group_id: 'Group_Input',
    groupName: '用户输入',
    components: [ComponentInputConfig, ComponentTextAreaConfig]
  },
  {
    group_id: 'Group_Radio',
    groupName: '用户选择',
    components: [ComponentRadioConfig, ComponentCheckBoxConfig]
  }
]

// 根据type返回组件配置
export const GetComponentByType = (type: string) => {
  return ComponentConfigList?.find((component) => component.type === type)
}
