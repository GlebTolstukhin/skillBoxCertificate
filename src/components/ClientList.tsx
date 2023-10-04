import {FC, useEffect, useState} from "react"
import s from "../styles/universalStyles.module.css"
import ClientUnit from "./ClientUnit"
import CreateClientPopup from "./popups/CreateClientPopup"
import clientListS from "../styles/clientList.module.css"

interface IClientListProps {

}
export type TContact = {
    type: string,
    address: string
}
export type TClient = {
    id: number,
    name: {
        firstName: string,
        lastName: string,
        middleName: string,
    },
    creationDate: {
        date: string,
        time: string,
    },
    lastChange: {
        date: string,
        time: string,
    },
    contacts: TContact[]
}

const ClientList: FC<IClientListProps> = () => {

    
    const [clients, setClients] = useState<TClient[]>([])
    const [changed, setChanged] = useState<boolean> (false)
    const [createOpened, setCreateOpened] = useState<boolean>(false)
    const [idSorterReverse, setIdSorterReverse] = useState<boolean>(true)
    const [nameSorterReverse, setNameSorterReverse] = useState<boolean>(true)
    const [creationSorterReverse, setCreationSorterReverse] = useState<boolean>(true)
    const [lastChangeSorterReverse, setLastChangeSorterReverse] = useState<boolean>(true)




    async function fetchClients() {
        let response = await fetch("http://localhost:3001/persons")
        let data = await response.json()
        setClients(data)
    }
    function changeIdSorter(): void {
        setIdSorterReverse(!idSorterReverse)
    }
    function changeNameSorter(): void {
        setNameSorterReverse(!nameSorterReverse)
    }
    function changeCreationSorter(): void {
        setCreationSorterReverse(!creationSorterReverse)
    }
    function changeLastChangeSorter(): void {
        setLastChangeSorterReverse(!lastChangeSorterReverse)
    }
    useEffect(() => {
        fetchClients()
    }, [changed])
    useEffect(() => {
        if (idSorterReverse) {
            setClients(clients.sort((a, b) => a.id - b.id))
        }
        if (!idSorterReverse) {
            setClients(clients.sort((b, a) => a.id - b.id))
        }
    }, [idSorterReverse, clients])
    useEffect(() => {
        if (nameSorterReverse) {
            setClients(clients.sort((a, b) => {
                if(a.name.lastName.concat(a.name.firstName).concat(a.name.middleName) < b.name.lastName.concat(b.name.firstName).concat(b.name.middleName)) {
                    return -1
                }
                if(a.name.lastName.concat(a.name.firstName).concat(a.name.middleName) > b.name.lastName.concat(b.name.firstName).concat(b.name.middleName)) {
                    return 1
                }
                return 0
            }))
        }
        if (!nameSorterReverse) {
            setClients(clients.sort((a, b) => {
                if(a.name.lastName.concat(a.name.firstName).concat(a.name.middleName) < b.name.lastName.concat(b.name.firstName).concat(b.name.middleName)) {
                    return 1
                }
                if(a.name.lastName.concat(a.name.firstName).concat(a.name.middleName) > b.name.lastName.concat(b.name.firstName).concat(b.name.middleName)) {
                    return -1
                }
                return 0
            }))
        }

    }, [nameSorterReverse, clients])
    useEffect(() => {
        if (creationSorterReverse) {
            setClients(clients.sort((a, b) => {
                if(a.creationDate.date.concat(a.creationDate.time) < b.creationDate.date.concat(a.creationDate.time)) {
                    return -1
                }
                if(a.creationDate.date.concat(a.creationDate.time) > b.creationDate.date.concat(a.creationDate.time)) {
                    return 1
                }
                return 0
            }))
        }
        if (!creationSorterReverse) {
            setClients(clients.sort((a, b) => {
                if(a.creationDate.date.concat(a.creationDate.time) < b.creationDate.date.concat(a.creationDate.time)) {
                    return 1
                }
                if(a.creationDate.date.concat(a.creationDate.time) > b.creationDate.date.concat(a.creationDate.time)) {
                    return -1
                }
                return 0
            }))
        }

    }, [creationSorterReverse, clients])
    useEffect(() => {
        if (lastChangeSorterReverse) {
            setClients(clients.sort((a, b) => {
                if(a.lastChange.date.concat(a.lastChange.time) < b.lastChange.date.concat(a.lastChange.time)) {
                    return -1
                }
                if(a.lastChange.date.concat(a.lastChange.time) > b.lastChange.date.concat(a.lastChange.time)) {
                    return 1
                }
                return 0
            }))
        }
        if (!lastChangeSorterReverse) {
            setClients(clients.sort((a, b) => {
                if(a.lastChange.date.concat(a.lastChange.time) < b.lastChange.date.concat(a.lastChange.time)) {
                    return 1
                }
                if(a.lastChange.date.concat(a.lastChange.time) > b.lastChange.date.concat(a.lastChange.time)) {
                    return -1
                }
                return 0
            }))
        }

    }, [lastChangeSorterReverse, clients])

    return (
        <div className={s.container}>
            <h2 className={s.title}>Клиенты</h2>
            <div className={clientListS.listTitles}>
                <div className={clientListS.idSorter}>
                    <div>ID</div>
                    <button onClick={changeIdSorter}>^</button>
                </div>
                <div className={clientListS.nameSorter}>
                    <div>Фамилия Имя Отчество</div>
                    <button onClick={changeNameSorter}>^</button>
                </div>
                <div className={clientListS.dateSorter}>
                    <div>Дата и время создания</div>
                    <button onClick={changeCreationSorter}>^</button>
                </div>
                <div className={clientListS.lastChangeSorter}>
                    <div>Последние изменения</div>
                    <button onClick={changeLastChangeSorter}>^</button>
                </div>
                <div className={clientListS.contacts}>Контакты</div>
                <div className={clientListS.movements}>Действия</div>
                <div></div>
            </div>
            <ul className={clientListS.list}>
                {clients.map(client => <ClientUnit key={client.id} changed={changed} setChanged={setChanged} client={client}></ClientUnit>)}
            </ul>
            <button onClick={() => setCreateOpened(true)} className={clientListS.addButton}>Добавить клиента</button>
            {
                createOpened ? <CreateClientPopup setOpened={setCreateOpened} changed={changed} setChanged={setChanged}/> : ""
            }
        </div>
    )
}

export default ClientList