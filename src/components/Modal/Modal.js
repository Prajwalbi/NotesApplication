import React, { useEffect, useState } from 'react'
import styles from './Modal.module.css'
import { colors } from '../../utils/constants'

export const Modal = (props) => {
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [createdGroups, setCreatedGroups] = useState([]);

    useEffect(()=>{
        const storedGroups = JSON.parse(localStorage.getItem("createdGroups"))
        if(storedGroups){
            setCreatedGroups(storedGroups)
        }
    },[])

    const handleColor = (idx) => {
     setSelectedColor(colors[idx])
    }

    const handleChange = (e) => {
        setGroupName(e.target.value)
    }
    const handleCreate = ()=>{
        if(groupName && selectedColor) {
            const newGroup = {
                id : createdGroups.length,
                text : groupName,
                color : selectedColor,
                notes :[]

            }
            const updatedGroups = [...createdGroups,newGroup]
            localStorage.setItem("createdGroups",JSON.stringify(updatedGroups))
            props.updateGroups(updatedGroups)
            setGroupName("")
            setSelectedColor(null)
            props.setShowModal(false)
            
        }
        
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Create New Group</h1>
                <div className={styles.text}>
                    <label htmlFor="group">Group Name <input maxLength={15} onChange={(e)=>handleChange(e)}  type="text" name="group" placeholder='Enter Group Name' /></label>
                </div>
                <div className={styles.colors}>
                    <h1>Choose Color</h1>
                    <div className={styles.color}>
                        <p onClick={() => handleColor(0)}></p>
                        <p onClick={() => handleColor(1)}></p>
                        <p onClick={() => handleColor(2)}></p>
                        <p onClick={() => handleColor(3)}></p>
                        <p onClick={() => handleColor(4)}></p>
                        <p onClick={() => handleColor(5)}></p>
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={handleCreate}>Create</button>
            </div>
        </div>

    )
}
