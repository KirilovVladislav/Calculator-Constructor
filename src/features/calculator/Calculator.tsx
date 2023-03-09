import { DragEvent, useEffect, useState } from 'react'
import { boardsCalc } from '../../app/const'
import { ButtonsGroup } from '../../components'
import { TypeBoardItem, TypeBoardsCalc, TypeCalcCardItem } from '../../types'
import { CalcScreen } from '../../ui'
import { Board } from '../../widgets'
import styles from './Calculator.module.css'


export const Calculator = (): JSX.Element => {
    // const [isDraggable, setIsDraggable] = useState(true)
    const [poligonList, setPoligonList] = useState(boardsCalc[1].items)
    const [drugOverBoard, setDrugOverBoard] = useState(false)
    const [boards, setBoards] = useState<TypeBoardsCalc>(boardsCalc)
    const [currentBoard, setCurrentBoard] = useState<TypeBoardItem>()
    const [currentCard, setCurrentCard] = useState<TypeCalcCardItem>()
    const [dropAfter, setDropAfter] = useState(poligonList.length)

    console.log(dropAfter)
    console.log(boards[1].items)

    useEffect(() => {
        setBoards((prev) => [{ ...prev[0] }, { ...prev[1], items: poligonList }])
    }, [poligonList])

    const dragStartHandler = (evt: DragEvent, board: TypeBoardItem, card: TypeCalcCardItem) => {
        setCurrentBoard(board)
        setCurrentCard(card)
        setDropAfter(poligonList.length)
    }

    const dragEndHandler = (evt: DragEvent) => {
        if (evt.currentTarget?.contains(evt.relatedTarget as Node)) return
        setDrugOverBoard(false)
    }

    const dragOverHandler = (evt: DragEvent, board: TypeBoardItem) => {
        evt.preventDefault()
    }

    const dragEnterHandler = (board: TypeBoardItem) => {
        if (board.title === 'poligon') {
            setDrugOverBoard(true)
        }
    }

    const dropHandler = (evt: DragEvent, board: TypeBoardItem) => {
        evt.preventDefault()
        setDrugOverBoard(false)

        if (currentBoard && currentCard && currentBoard.id !== board.id) {
            const currentIndex = currentBoard.items.indexOf(currentCard)
            const boardIndex = board.items.findIndex((item) => item.id === currentCard.id)

            if (board.title === 'cards') {
                currentBoard.items.splice(currentIndex, 1)
                board.items[boardIndex].dasabled = false
            } else if (board.title === 'poligon') {
                if (board.id !== currentBoard.id) {
                    currentBoard.items[currentIndex].dasabled = true
                    board.items.push({ ...currentCard, order: currentCard.id === 1 ? 1 : dropAfter + 1, dasabled: false })
                }
            }

            setBoards((prev) => prev.map((item) => {
                if (item.id === board.id) {
                    return board
                }
                if (item.id === currentBoard.id) {
                    return currentBoard
                }
                return item
            }))
        }
    }

    const dragCardEnterHandler = (board: TypeBoardItem, card: TypeCalcCardItem) => {
        board.title === 'poligon' && setDropAfter(card.order)
    }

    const dropCardHandler = (evt: DragEvent, board: TypeBoardItem, card: TypeCalcCardItem) => {
        evt.preventDefault()


        if (currentBoard && currentCard && board.title === 'poligon') {
            board.items.map((cardStore: any) => {
                if (cardStore.order > card.order) cardStore.order += 1
                currentCard.order = currentCard.id === 1 ? 1 : card.order + 1

                return cardStore
            })
        }
    }

    const isShowLine = (board: TypeBoardItem, card: TypeCalcCardItem) => {
        return dropAfter === card.order
    }

    const sortCards = (a: TypeCalcCardItem, b: TypeCalcCardItem) => a.order - b.order

    return (
        <div className={styles.calculator}>
            {boards.map((board) => (
                <Board
                    key={board.id}
                    board={board}
                    drugOverBoard={drugOverBoard}
                    onDragLeave={dragEndHandler}
                    onDragEnter={() => dragEnterHandler(board)}
                    onDragOver={dragOverHandler}
                    onDrop={(evt: DragEvent) => dropHandler(evt, board)}
                >
                    {board.items.sort(sortCards).map((card) => (
                        <ButtonsGroup
                            onDragEnter={() => dragCardEnterHandler(board, card)}
                            showLine={board.title === 'poligon' && drugOverBoard && isShowLine(board, card)}
                            key={card.id}
                            card={card}
                            inPoligon={board.title === 'poligon'}
                            draggable={!card.dasabled}
                            onDrop={(evt: DragEvent) => dropCardHandler(evt, board, card)}
                            onDragStart={(evt: DragEvent) => dragStartHandler(evt, board, card)}
                            children={card.id === 1 ? <CalcScreen value={0} /> : <></>}
                        />
                    ))}
                </Board>
            ))}
        </div>
    )
}
