import {FC, useRef, MouseEvent} from "react"
import removeS from "../../styles/removeClientPopup.module.css"
import { TClient } from "../ClientList"


interface IRemoveClientPopupProps {
    client: TClient
    setChanged: (arg: boolean) => void
    changed: boolean
    setOpened: (arg: boolean) => void
}


const RemoveClientPopup: FC<IRemoveClientPopupProps> = ({client, setChanged, changed, setOpened}) => {

    let innerArea = useRef<HTMLDivElement>(null)
    let innerTitle = useRef<HTMLDivElement>(null)
    let innerText = useRef<HTMLDivElement>(null)



    async function removeClient() {
        await fetch(`http://localhost:3001/persons/${client.id}`, {
            method: "DELETE",
        })
        setChanged(!changed)
        setOpened(false)
    }

    function closePopup(event: MouseEvent<HTMLDivElement | HTMLButtonElement>): void {
        if(event.target !== innerArea.current && event.target !== innerTitle.current && event.target !== innerText.current) {
            setOpened(false)
        }
    }
    return (
        <div className={removeS.aroundArea} onClick={(e) => closePopup(e)}>
            <div ref={innerArea} className={removeS.innerArea}>
                <button onClick={(e) => closePopup(e)} className={removeS.closeButton}>X</button>
                <div ref={innerTitle} className={removeS.title}>Удалить клиента</div>
                <div ref={innerText} className={removeS.question}>Вы действительно хотите удалить клиента?</div>
                <button onClick={removeClient} className={removeS.removeButton}>Удалить</button>
                <button className={removeS.backButton}>Отмена</button>
            </div>
        </div>
    )
}

export default RemoveClientPopup