import styles from './BigLoader.module.css';

type Props = {
    dark:boolean
}

const SmallLoader: React.FC<Props> = ({dark}) => {
    return (
        <div className={dark ? styles.spinner_dark : styles.spinner_light}></div>
    )
}

export default SmallLoader;