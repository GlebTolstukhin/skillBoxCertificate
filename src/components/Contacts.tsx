import {FC} from "react"
import { TContact } from "./ClientList"
import contactS from "../styles/constacts.module.css"


interface IContactsProps {
    contacts: TContact[]
}


const Contacts: FC<IContactsProps> = ({contacts}) => {





    return (
        <div className={contactS.wrapper}>
            {contacts.map(contact => <div className={contactS.icon}>{contact.type}</div>)}
        </div>
    )
}
export default Contacts