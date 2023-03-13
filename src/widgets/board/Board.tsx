import { memo } from 'react'
import { TypeBoardItem } from '../../types'
import styles from './Board.module.css'


type Props = {
    board: TypeBoardItem,
    drugOverBoard?: boolean
    // children?: JSX.Element | JSX.Element[],
    children?: React.ReactNode,
    [key: string]: any,
}

export const Board = memo(({ board, drugOverBoard = false, children, ...props }: Props): JSX.Element => {
    const emptyPoligon = !board.items.length && board.title === 'poligon'

    return (
        <section
            className={`
                ${styles[board.title]} 
                ${styles.col} 
                ${emptyPoligon && styles.emptyPoligon}
                ${emptyPoligon && drugOverBoard && styles.dropIndicator}
                `}
            {...props}
        >
            {emptyPoligon
                ? <>
                    <span className={styles.title}>
                        Перетащите сюда
                    </span>
                    <span className={styles.text}>
                        любой элеиент<br />из левой части
                    </span>
                </>
                : <>
                    {children}
                </>
            }
            {/* {children} */}
        </section>
    )
})