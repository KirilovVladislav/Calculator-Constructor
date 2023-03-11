import { TypeCalcCardItem } from '../../types'
import { Button } from '../../ui'
import { LineIndicator } from '../line-indicator/Line-indicator'
import styles from './Buttons-group.module.css'


type Props = {
    card?: TypeCalcCardItem,
    showLine: boolean,
    inPoligon?: boolean,
    children?: JSX.Element | JSX.Element[],
    [key: string]: any,
}

export const ButtonsGroup = ({ card, showLine, inPoligon, children, ...props }: Props): JSX.Element => {
    return (
        <div className={styles.container}>
            <section
                className={`${styles.group} ${inPoligon && styles.inPoligon} ${card?.dasabled && styles.disabled}`}
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
            {showLine && <LineIndicator />}
        </div>
    )
}