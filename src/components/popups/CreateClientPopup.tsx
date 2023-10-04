import React, {FC, MouseEvent, useRef, useState} from "react"
import createS from "../../styles/createClientPopup.module.css"
import { TContact } from "../ClientList"
import AddContact from "./AddContact"


interface ICreateClientPopupProps {
    setChanged: (arg: boolean) => void
    changed: boolean
    setOpened: (arg: boolean) => void
}

type TNewClient = {
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


const CreateClientPopup: FC<ICreateClientPopupProps> = ({setChanged, changed, setOpened}) => {

    const [contacts, setContacts] = useState<TContact[]>([])
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [middleName, setMiddleName] = useState<string>("")

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
        console.log(value)
        let newContacts = contacts
        newContacts[newContacts.indexOf(contact)].address = value
        setContacts(newContacts)
    }
    function deleteContact(contact:  TContact): void {
        setContacts(contacts.filter(elem => elem !== contact))
        console.log(contacts)
    }


    async function addClient() {
        let date = new Date()
        let newClient: TNewClient  = {
            name: {
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
            },
            creationDate: {
                date: (
                    ((+date.getDay()+1).toString().length === 1 ? "0" + (+date.getDay()+1).toString() : (+date.getDay()+1).toString()) + "."
                    + ((+date.getMonth()+1).toString().length === 1 ? "0" + (+date.getMonth()+1).toString() : (+date.getMonth()+1).toString())  + "."
                    + date.getFullYear()
                    ),
                time: (
                    (+date.getHours()).toString().length === 1 ? "0" + (+date.getHours()).toString() : (+date.getHours()).toString()) + "."
                    + ((+date.getMinutes()).toString().length === 1 ? "0" + (+date.getMinutes()).toString() : (+date.getMinutes()).toString()
                    ),
            },
            lastChange: {
                date: (
                    ((+date.getDay()+1).toString().length === 1 ? "0" + (+date.getDay()+1).toString() : (+date.getDay()+1).toString()) + "."
                    + ((+date.getMonth()+1).toString().length === 1 ? "0" + (+date.getMonth()+1).toString() : (+date.getMonth()+1).toString())  + "."
                    + date.getFullYear()
                    ),
                time: (
                    (+date.getHours()).toString().length === 1 ? "0" + (+date.getHours()).toString() : (+date.getHours()).toString()) + "."
                    + ((+date.getMinutes()).toString().length === 1 ? "0" + (+date.getMinutes()).toString() : (+date.getMinutes()).toString()
                    ),
            },
            contacts: contacts.filter(contact => !!contact)
        }
        await fetch(`http://localhost:3001/persons/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify(newClient),
        })
        setChanged(!changed)
        setOpened(false)
    }

    const addRef = useRef<HTMLButtonElement>(null)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const middleNameRef = useRef<HTMLInputElement>(null)
    const contactsListRef = useRef<HTMLUListElement>(null)




    function closePopup(event: MouseEvent<HTMLDivElement | HTMLButtonElement>): void {
        // if(
        //     event.target !== addRef.current && event.target !== firstNameRef.current && event.target !== lastNameRef.current &&
        //     event.target !== middleNameRef.current
        // ) {
        // setOpened(false)

        // }   
    }



    
    
    return (
        <div className={createS.aroundArea} onClick={(e) => closePopup(e)}>
            <div className={createS.innerArea}>
                <button onClick={(e) => closePopup(e)} className={createS.closeButton}>X</button>
                <div className={createS.title}>Новый клиент</div>
                <input ref={firstNameRef} value={firstName} 
                    onChange={(event) => setFirstName(event.target.value)} className={createS.input} type="text" placeholder="Фамилия"/>
                <input ref={lastNameRef} value={lastName} 
                    onChange={(event) => setLastName(event.target.value)} className={createS.input} type="text" placeholder="Имя"/>
                <input ref={middleNameRef} value={middleName} 
                    onChange={(event) => setMiddleName(event.target.value)} className={createS.input} type="text" placeholder="Отчество"/>
                {
                    contacts.map(contact => (
                        <AddContact contact={contact} deleteContact={deleteContact} contactType={contact.type} contactAddress={contact.address}
                         addContactAddress={addContactAddress} addContactType={addContactType}/>
                    ))
                }
                <button onClick={addContatact} className={createS.newContact}>Добавить контакт</button>
                <button onClick={addClient} className={createS.saveButton}>Сохранить</button>
                <button className={createS.backButton}>Отмена</button>
            </div>
        </div>
    )
}

export default CreateClientPopup