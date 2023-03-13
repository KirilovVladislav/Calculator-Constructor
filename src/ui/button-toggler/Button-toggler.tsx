import styles from './Button-toggler.module.css'


type Props = {
    active: boolean,
    text: string,
    [key: string]: any,
}

export const ButtonToggler = ({ active = false, text, ...props }: Props) => {
    return (
        <button className={`${styles.button} ${active && styles.active}`} {...props}>
            <span className={styles.text}>{text}</span>
        </button>
    )
}