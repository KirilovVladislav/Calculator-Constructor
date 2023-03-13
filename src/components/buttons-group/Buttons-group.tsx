import { memo } from 'react'
import { TypeCalcCardItem } from '../../types'
import { Button } from '../../ui'
import { LineIndicator } from '../line-indicator/Line-indicator'
import styles from './Buttons-group.module.css'


type Props = {
    card?: TypeCalcCardItem,
    disabled?: boolean,
    showLine?: boolean,
    inPoligon?: boolean,
    // children?: JSX.Element | JSX.Element[],
    children?: React.ReactNode,
    [key: string]: any,
}

export const ButtonsGroup = memo(({ card, disabled, showLine = false, inPoligon = false, children, ...props }: Props): JSX.Element => {
    return (
        <div className={`${styles.container}`}>
            {showLine && <LineIndicator />}
            <section
                className={`${styles.group} ${inPoligon && styles.inPoligon} ${disabled && styles.disabled}`}
                {...props}
            >
                {children}
                {card && card.value.map((value: string): JSX.Element => (
                    <Button
                        sizeBtn={card.sizeBtn}
                        value={value}
                        key={value}
                    />
                ))}
            </section>
        </div>
    )
})