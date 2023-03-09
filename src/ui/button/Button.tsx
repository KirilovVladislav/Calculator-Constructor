import styles from './Button.module.css'


type Props = {
    value: string,
    sizeBtn?: string,
}

export const Button = ({value, sizeBtn = 'sizeS'}: Props): JSX.Element => {
    return (
        <button className={`
            ${styles.button} 
            ${styles[sizeBtn]}
            ${value === '0' && styles.sizeL}
            ${value === '=' && styles.bgBlue}
        `}>
            {value}
        </button>
    )
}