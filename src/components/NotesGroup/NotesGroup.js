import React, { useEffect, useState } from 'react'
import styles from './NotesGroup.module.css'

export const NotesGroup = (props) => {
  const [updateGroup, setUpdateGroup] = useState(true)

 
  return (
    <>
      <div className={styles.container}>
        <h1>Pocket Notes</h1>
        {props.groups && props.groups.map((group) => (
          <div style={{cursor:"pointer"}} onClick={()=>props.getNotes(group.id,group.text)} key={group.id} className={styles.notes_group}>
            <p><span style={{backgroundColor:`${group.color}`}}>HE</span>{group.text}</p>
          </div>
        ))}


        <button onClick={() => { props.setShowModal((prevState) => !prevState) }}>+</button>
      </div>
    </>
  )
}
