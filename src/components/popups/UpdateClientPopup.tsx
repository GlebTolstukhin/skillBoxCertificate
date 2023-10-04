import {FC, useState} from 'react'
import updateS from "../../styles/updateClientPopup.module.css"
import { TClient } from '../ClientList'
import { TContact } from '../ClientList'
import AddContact from './AddContact'

interface IUpdateClientPopupProps {
    client: TClient
    setChanged: (arg: boolean) => void
    changed: boolean
    setOpened: (arg: boolean) => void
}

const UpdateClientPopup: FC<IUpdateClientPopupProps> = ({client, setChanged, changed, setOpened}) => {

    
    const [upClient, setUpClient] = useState<TClient>(client)
    const [contacts, setContacts] = useState<TContact[]>(client.contacts)

    function addContatact() {
        let newContact = {
            type: "VK",
            address: ""
        }
        setContacts(contacts.concat([newContact]))
    }
    function addContactType(value: string, contact: TContact): void {
        let newContacts = contacts
        newContacts[newContacts.indexOf(contact)].type = value
        setContacts(newContacts)

    }
    function addContactAddress(value: string, contact: TContact): void {
        let newContacts = contacts
        newContacts[newContacts.indexOf(contact)].address = value
        setContacts(newContacts)

    }
    function deleteContact(contact:  TContact): void {
        setContacts(contacts.filter(elem => elem !== contact))
    
    }
    function changeClientNameFirst (name: string): void {
        let newClient  = {...upClient}
        newClient.name.firstName = name
        setUpClient(newClient)
    }
    function changeClientNameLast (name: string): void {
        let newClient  = {...upClient}
        newClient.name.lastName = name
        setUpClient(newClient)
    }
    function changeClientNameMiddle (name: string): void {
        let newClient  = {...upClient}
        newClient.name.middleName = name
        setUpClient(newClient)
    }
    async function patchClient() {
        let date = new Date()
        let newClient = {...upClient}
        newClient.lastChange.date = "new"
        newClient.lastChange.time = "new"
        newClient.contacts = contacts
        newClient.lastChange = {
            date: (
                ((+date.getDay()+1).toString().length === 1 ? "0" + (+date.getDay()+1).toString() : (+date.getDay()+1).toString()) + "."
                + ((+date.getMonth()+1).toString().length === 1 ? "0" + (+date.getMonth()+1).toString() : (+date.getMonth()+1).toString())  + "."
                + date.getFullYear()
                ),
            time: (
                (+date.getHours()).toString().length === 1 ? "0" + (+date.getHours()).toString() : (+date.getHours()).toString()) + "."
                + ((+date.getMinutes()).toString().length === 1 ? "0" + (+date.getMinutes()).toString() : (+date.getMinutes()).toString()
                ),
        }
        
        await fetch(`http://localhost:3001/persons/${client.id}`, {

            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify(newClient)
        }) 
        setOpened(false)
        setChanged(!changed)
    }
    async function removeClient() {
        await fetch(`http://localhost:3001/persons/${client.id}`, {
            method: "DELETE",
        })
        setChanged(!changed)
        setOpened(false)
    }
    function closePopup(event: any): void {
        setOpened(false)
    }

    return (
        <div className={updateS.aroundArea}>
            <div className={updateS.innerArea}>
                <button onClick={(e) => closePopup(e)} className={updateS.closeButton}>X</button>
                <div className={updateS.title}>Изменить данные</div>
                <input value={upClient.name.lastName} onChange={(e) => changeClientNameLast(e.target.value) }
                    className={updateS.input} type="text" placeholder="Фамилия"/>
                <input value={upClient.name.firstName} onChange={(e) => changeClientNameFirst(e.target.value) }
                     className={updateS.input} type="text" placeholder="Имя"/>
                <input value={upClient.name.middleName} onChange={(e) => changeClientNameMiddle(e.target.value) } 
                     className={updateS.input} type="text" placeholder="Отчество"/>
                <ul>
                {
                    contacts.map(contact => (
                        <AddContact contact={contact} deleteContact={deleteContact} contactType={contact.type} contactAddress={contact.address}
                         addContactAddress={addContactAddress} addContactType={addContactType}/>
                    ))
                }  
                </ul>
                {
                    contacts.length < 10 ? <button onClick={addContatact} className={updateS.newContact}>Добавить контакт</button> 
                    : ""
                }   
                <button onClick={patchClient}>Сохранить</button>
                <button onClick={removeClient}>Удалить клиента</button>
            </div>
        </div>
    )
}
export default UpdateClientPopup