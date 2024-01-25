import React, { useEffect, useRef, useState } from 'react'
import arrow from '../../assets/arrow.png'
import styles from './NotesDisplay.module.css'
import { generateInitials } from '../../utils/constants'

export const NotesDisplay = (props) => {
    const [displayNotes, setDisplayNotes] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem("createdGroups"));
        return Array.isArray(storedData) ? storedData : [];
    }); // load previously stored notes
    const [currentNote, setCurrentNote] = useState() // auxillary note for temp store
    const [note, setNote] = useState(displayNotes[props.groupId] || { notes: [] });
    const [enable,setEnable] = useState(false)
    const text = useRef(null);
    
    useEffect(() => {
        // Retrieve data from local storage
        const storedData = JSON.parse(localStorage.getItem("createdGroups"));
        const cleanData = Array.isArray(storedData) ? storedData : [];
    
        // Update displayNotes state
        setDisplayNotes(cleanData);
    
        // Update note state using the callback function
        setNote(prevNote => cleanData[props.groupId] || { notes: [] });
    
        // Log the updated note text
        console.log(note.text);
    }, [props.groupId, setDisplayNotes]);
    
    
    const handleText = (e) => {
        
        if(e.target.value.length < 1){
            setEnable(false)
        }else {
            setEnable(true)
            setCurrentNote(e.target.value)
        }
    }

    const handleSaveNotes = (e) => {
        const newNote = {
            text: currentNote,
            date: new Date().toLocaleDateString(), // Example date format
            time: new Date().toLocaleTimeString(), // Example time format
        };

        if(enable){
        setDisplayNotes((prevNotes) => {
            const updatedNotes = [...prevNotes];
            updatedNotes[props.groupId].notes.push(newNote);
            localStorage.setItem("createdGroups", JSON.stringify(displayNotes))
            
            return updatedNotes;
        });
    }
        
    }
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1> <span style={{backgroundColor:`${note.color}`}}>{generateInitials(note.text)}</span> {note?.text} </h1>
            </div>
            <div className={styles.notes_section}>
                {note.notes.length > 0 && note.notes.map((note,idx) => (
                    <div key={idx} className={styles.notes}>
                        <p>{note.text}</p>
                        <h4>{note.date} &bull; {note.time}</h4>
                    </div>
                ))}
            </div>
            <div className={styles.text_area}>
                <textarea ref={text} onChange={(e) => handleText(e)} name="" id="" cols="130" rows="10" placeholder='Enter text here...'></textarea>
                <img onClick={handleSaveNotes} src={arrow} alt="" />
            </div>
        </div>
    )
}
