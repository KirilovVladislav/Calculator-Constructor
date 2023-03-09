import styles from './Calc-screen.module.css'


type Props = {
    value: number,
}

export const CalcScreen = ({value}: Props): JSX.Element => {
    return (
        <div className={styles.screen}>
            <span className={styles.text}>{value}</span>
        </div>
    )
}