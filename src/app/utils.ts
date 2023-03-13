import { TypeCalcCardItem } from "../types"


export const preventDefault = (e: React.UIEvent) => {
    e.preventDefault()
    // e.stopPropagation()
}

export const isNodeContains = (e: React.DragEvent) => {
    return e.currentTarget?.contains(e.relatedTarget as Node)
}

export const findItemInListFromId = (arr: any[any], item: any) => {
    return arr.find((curr: any) => curr.id === item.id)
}

export const sortCards = (a: TypeCalcCardItem, b: TypeCalcCardItem) => a.order - b.order