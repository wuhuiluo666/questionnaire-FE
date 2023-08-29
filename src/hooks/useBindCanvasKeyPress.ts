import { useKeyPress } from "ahooks"

export const useBindCanvasKeyPress = () => {
    useKeyPress(['backspace'], () => {
        console.log('aaaa')
    })
}