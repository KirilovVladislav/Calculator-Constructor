import styles from './Toggler.module.css'


type Props  = {
    children?: React.ReactNode,
}

export const Toggler = ({children}: Props) => {
    return (
        <section className={styles.toggler}>
            {children}
        </section>
    )
}