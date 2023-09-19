import { ComponentRadio, defaultProps } from '.'
import { RadioStatic } from '../RadioComponent'
import { RadioProps } from './radioProps'

export const ComponentRadioConfig = {
  title: '单选框标题',
  type: 'questionRadio',
  Component: ComponentRadio,
  ComponentProps: RadioProps,
  ChartComp: RadioStatic,
  defaultProps: defaultProps
}
