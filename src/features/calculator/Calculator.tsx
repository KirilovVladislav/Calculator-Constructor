import { DragEvent, useEffect, useState } from 'react'
import { boardsCalc, POLIGON } from '../../app/const'
import { findItemInListFromId, sortCards } from '../../app/utils'
import { ButtonsGroup } from '../../components'
import { useDragAndDrop } from '../../hooks'
import { TypeBoardsCalc } from '../../types'
import { CalcScreen, ButtonToggler } from '../../ui'
import { Board, Toggler } from '../../widgets'
import styles from './Calculator.module.css'


export const Calculator = (): JSX.Element => {
    const [isRuntime, setIsRuntime] = useState<boolean>(false)
    const [boards, setBoards] = useState<TypeBoardsCalc>(boardsCalc)
    const [state, handlerBoard, handlerCard] = useDragAndDrop(boards[1].items)

    useEffect(() => {
        setBoards((prev) => prev.map((board) => board.title === POLIGON ? { ...board, items: state.poligon } : board))
    }, [state.poligon])

    const handleSetRuntime = (value: boolean) => {
        setIsRuntime(value)
    }

    return (
        <div className={styles.container}>
            <Toggler >
                <ButtonToggler onClick={() => handleSetRuntime(true)} active={isRuntime} text={'Runtime'} />
                <ButtonToggler onClick={() => handleSetRuntime(false)} active={!isRuntime} text={'Constructor'} />
            </Toggler>
            <div className={styles.calculator}>
                {boards.map((board) => (
                    <Board
                        key={board.id}
                        board={board}
                        drugOverBoard={board.title === state.drugOver?.title}

                        onDrop={(e: DragEvent) => handlerBoard.onDrop(e, board)}
                        onDragOver={handlerBoard.onDragOver}
                        onDragEnter={(e: DragEvent) => handlerBoard.onDragEnter(e, board)}
                        onDragLeave={(e: DragEvent) => handlerBoard.onDragLeave(e, board)}
                    >
                        {board.items.sort(sortCards).map((card) => (
                            <ButtonsGroup
                                key={card.id}
                                card={card}
                                showLine={!!(board.title === POLIGON && state.drugOver && card.order === state.dropOrder)}
                                draggable={!isRuntime && (board.title === POLIGON ? true : !findItemInListFromId(state.poligon, card))}
                                // draggable={board.title === POLIGON ? true : !findItemInListFromId(state.poligon, card)}
                                disabled={board.title === POLIGON ? false : !!findItemInListFromId(state.poligon, card)}
                                inPoligon={board.title === POLIGON}

                                onDragOver={handlerCard.onDragOver}
                                onDragStart={(e: DragEvent) => handlerCard.onDragStart(e, board, card)}
                                onDragEnter={(e: DragEvent) => handlerCard.onDragEnter(e, board, card)}
                                onDragLeave={(e: DragEvent) => handlerCard.onDragLeave(e, board, card)}

                                children={card.id === 1 ? <CalcScreen value={0} /> : <></>}
                            />
                        ))}
                    </Board>
                ))}
            </div>
        </div>
    )
}
