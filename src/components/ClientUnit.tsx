import {FC, useState} from "react"
import clientUnitS from "../styles/clientUnit.module.css"
import { TClient } from "./ClientList"
import Contacts from "./Contacts"
import RemoveClientPopup from "./popups/RemoveClientPopup"
import UpdateClientPopup from "./popups/UpdateClientPopup"

interface IClientUnitProps {
    client: TClient
    setChanged: (arg: boolean) => void
    changed: boolean
}

const ClientUnit: FC<IClientUnitProps> = ({client, setChanged, changed}) => {

    const [removeOpened, setRemoveOpened] = useState<boolean>(false)
    const [updateOpened, setUpdateOpened] = useState<boolean>(false)




    function openRemove (): void {
        setRemoveOpened(true)
    }
    function openUpdate (): void {
        setUpdateOpened(true)
    }

    return (
        <li className={clientUnitS.wrapper}>
            <div className={clientUnitS.id}>{client.id}</div>
            <div className={clientUnitS.name}>
                <span>{client.name.lastName}</span> <span>{client.name.firstName}</span> <span>{client.name.middleName}</span>
            </div>
            <div className={clientUnitS.creationDate}>
                <span className={clientUnitS.date}>{client.creationDate.date}</span> <span className={clientUnitS.time}>{client.creationDate.time}</span>
            </div>
            <div className={clientUnitS.lastChange}>
                <span className={clientUnitS.date}>{client.lastChange.date}</span> <span className={clientUnitS.time}>{client.lastChange.time}</span>
            </div>
            <Contacts contacts={client.contacts}/>
            <button  onClick={openUpdate} className={clientUnitS.change}>
                <img src="" alt=""  className={clientUnitS.buttonIcon}/> <div>Изменить</div>
            </button>
            <button onClick={openRemove} className={clientUnitS.remove}>
                <img src="" alt=""  className={clientUnitS.buttonIcon}/> <div>Удалить</div>
            </button>
            {
                removeOpened ? <RemoveClientPopup setOpened={setRemoveOpened} changed={changed} setChanged={setChanged} client={client}/> : ""
            }
                        {
                updateOpened ? <UpdateClientPopup setOpened={setUpdateOpened} changed={changed} setChanged={setChanged} client={client}/> : ""
            }
        </li>
    )
}   
export default ClientUnit