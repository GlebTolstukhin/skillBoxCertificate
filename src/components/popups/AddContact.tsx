import React, {FC, useEffect, useState} from "react"
import { TContact } from "../ClientList"

interface IAddContactProps {
    contactAddress: string
    contactType: string
    contact: TContact
    addContactType: (value: string, contact: TContact) => void
    addContactAddress: (value: string, contact: TContact) => void
    deleteContact: (contact: TContact) => void
}

const AddContact: FC<IAddContactProps> = ({contact, contactAddress, contactType, addContactType, addContactAddress, deleteContact}) => {


    const [address, setAddress] = useState<string>("")
    const [type, setType] = useState<string>("VK")


    function handleAddContactAddress(value: string, contact: TContact): void {
        setAddress(value)
        addContactAddress(value, contact)
    }
    function handleAddContactType(value: string, contact: TContact): void {
        setType(value)
        addContactType(value, contact)
    }
    useEffect(() => {
        setAddress(contactAddress)
    }, [contactAddress] )
    useEffect(() => {
        setType(contactType)
    }, [contactType] )
    
    return (
        <li> 
            <select value={type} onChange={(e) => handleAddContactType(e.target.value, contact)}>
                <option value="VK">VK</option>
                <option value="phoneNumber">phoneNumber</option>
                <option value="email">eMail</option>
                <option value="facebook">Facebook</option>
                <option value="ather">Другое</option>
            </select>
            <input value={address} type="text" onChange={(e) => handleAddContactAddress(e.target.value, contact)}/>  
            <button onClick={() => deleteContact(contact)}>x</button>     
        </li>
    )
}
export default AddContact