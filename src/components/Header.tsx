import react, {FC} from "react"
import headerS from "../styles/headerS.module.css"
import s from "../styles/universalStyles.module.css"


    interface IHeaderProps {

    }
const Header: FC<IHeaderProps> = () => {
    return (
        <header className={headerS.header}>
            <div className={s.container}></div>
        </header>
    )
}
export default Header