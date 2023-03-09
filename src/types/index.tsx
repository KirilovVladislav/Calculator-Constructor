export type TypeCalcCardItem = {
    id: number,
    order: number,
    sizeBtn?: string,
    value: string[],
    dasabled?: boolean,
}

export type TypeCalcCards = TypeCalcCardItem[]

export type TypeBoardItem = {
    id: number,
    title: string,
    items: TypeCalcCards,
}

export type TypeBoardsCalc = TypeBoardItem[]