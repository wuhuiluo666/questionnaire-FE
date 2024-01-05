import { ComponentCheckBox, defaultProps } from ".";
import { CheckBoxProps } from "./CheckProps";
import StatComponent from "./CheckboxStatic"

export const ComponentCheckBoxConfig = {
    title: '复选框',
    type: 'QuestionCheckbox',
    Component: ComponentCheckBox,
    ChartComp: StatComponent,
    ComponentProps: CheckBoxProps,
    defaultProps: defaultProps 
}
