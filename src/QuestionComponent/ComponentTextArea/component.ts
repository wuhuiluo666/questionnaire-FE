import { ComponentTextArea, defaultProps } from ".";
import { TextAreaProps } from "./textareaProps";

export const ComponentTextAreaConfig = {
    title: '多行输入',
    type: 'questionTextArea',
    Component: ComponentTextArea,
    ComponentProps: TextAreaProps,
    defaultProps: defaultProps
}