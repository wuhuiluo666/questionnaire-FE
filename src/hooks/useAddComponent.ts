import { ComponentProps, ComponentsStateProps } from "../store/componentList";

export const useAddComponent = (draft: ComponentsStateProps, newComponent: ComponentProps) => {
    const { componentsList,selectedId } = draft
    // 目前选中的组件下表
    const curCompIndex = componentsList.findIndex(component => component.fe_id === selectedId)
    // 未选中
    if(curCompIndex < 0) {
        componentsList.push(newComponent)
    } else {
        componentsList.splice(curCompIndex, 0 , newComponent)
    }
    draft.selectedId = newComponent.fe_id
}