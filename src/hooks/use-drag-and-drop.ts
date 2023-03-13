import { DragEvent, useEffect, useMemo, useState } from "react"
import { POLIGON } from "../app/const"
import { isNodeContains, preventDefault } from "../app/utils"
import { TypeBoardItem, TypeCalcCardItem, TypeCalcCards } from "../types"

// type DragState = {
//     poligon: TypeCalcCards,
//     drugOver: TypeBoardItem | null,
//     dropOrder: number
// }

export const useDragAndDrop = (initialPoligon: TypeCalcCards) => {
    const [poligon, setPoligon] = useState<TypeCalcCards>(initialPoligon)
    const [currentBoard, setCurrentBoard] = useState<TypeBoardItem | null>(null)
    const [currentCard, setCurrentCard] = useState<TypeCalcCardItem | null>(null)
    const [drugOver, setDrugOver] = useState<TypeBoardItem | null>(null)
    const [dropOrder, setDropOrder] = useState<number>(0)

    useEffect(() => {
        currentCard?.id === 1 && setDropOrder(0)
    }, [currentCard?.id, dropOrder])

    const state = useMemo(() => ({
        poligon,
        drugOver,
        dropOrder,
    }), [poligon, drugOver, dropOrder])

    const handlerBoard = useMemo(() => ({
        onDrop: (e: DragEvent, board: TypeBoardItem) => {
            preventDefault(e)

            if (!currentBoard || !currentCard) return

            if (board.title !== currentBoard.title) {
                setPoligon((prev) => {
                    let tmp = prev
                    const haveSameOrder = prev.some((item) => item.order === dropOrder)

                    if (board.title === POLIGON) {
                        if (haveSameOrder) {
                            tmp = tmp.map((card, i) => (
                                { ...card, order: card.order >= dropOrder ? i + 1 : i }
                            ))
                        }
                        return [...tmp, { ...currentCard, order: dropOrder }]
                    } else {
                        tmp = tmp.filter((card) => card.id !== currentCard.id)

                        return tmp.map((card, i) => ({ ...card, order: i }))
                    }
                })
            } else if (board.title === currentBoard.title && board.title === POLIGON) {
                if (currentCard.order !== dropOrder)
                    setPoligon((prev) => {
                        return prev.map((card, i) => {
                            if (card.id !== currentCard.id) {
                                if (dropOrder >= currentCard.order) {
                                    return { ...card, order: card.order <= dropOrder && card.order >= currentCard.order ? i - 1 : i }
                                }
                                return { ...card, order: card.order >= dropOrder ? i + 1 : i }
                            }
                            return { ...card, order: dropOrder }
                        })
                    })
            }

            setCurrentBoard(null)
            setCurrentCard(null)
            setDropOrder(-1)
        },
        onDragOver: (e: DragEvent) => {
            preventDefault(e)
        },
        onDragEnter: (e: DragEvent, board: TypeBoardItem) => {
            if (isNodeContains(e)) return
            setDrugOver(board)
        },
        onDragLeave: (e: DragEvent, board: TypeBoardItem) => {
            if (isNodeContains(e)) return
            setDrugOver(null)

            if (board.title === currentBoard?.title && board.title === POLIGON) {
                const lastOrder = poligon.at(-1)?.order || poligon.length
                setDropOrder(lastOrder)
            }
        }
    }), [currentBoard, currentCard, poligon, dropOrder])

    const handlerCard = useMemo(() => ({
        onDragStart: (e: DragEvent, board: TypeBoardItem, card: TypeCalcCardItem) => {
            setCurrentBoard(board)
            setCurrentCard(card)

            if (board.title !== POLIGON) {
                setDropOrder(poligon.length)
            }
        },
        onDragEnter: (e: DragEvent, board: TypeBoardItem, card: TypeCalcCardItem) => {
            if (isNodeContains(e) || board.title !== POLIGON) return

            setDropOrder(card.id === 1 ? card.order + 1 : card.order)
        },
        onDragOver: (e: DragEvent) => {
            preventDefault(e)
        },
        onDragLeave: (e: DragEvent, board: TypeBoardItem, card: TypeCalcCardItem) => {
            if (isNodeContains(e) || board.title !== POLIGON || board.title === currentBoard?.title) return

            if (card.id === poligon.at(-1)?.id) {
                setDropOrder(poligon.length)
            }
        },
    }), [poligon, currentBoard])

    return [state as any, handlerBoard, handlerCard]
}