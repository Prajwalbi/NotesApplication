import React, { useState,useEffect } from 'react'
import styles from './Home.module.css'
import { NotesGroup } from '../../components/NotesGroup/NotesGroup'
import { NotesHome } from '../../components/NotesHome/NotesHome'
import { NotesDisplay } from '../../components/NotesDisplay/NotesDisplay'
import { Modal } from '../../components/Modal/Modal'

export const Home = () => {
  const [showModal,setShowModal] = useState(false)
  const [groups, setGroups] = useState(()=>JSON.parse(localStorage.getItem("createdGroups"))) //for notes group 
  const [groupId,setGroupId] = useState(0)
  const [groupText,setGroupText] = useState("hello")

  const updateGroups = (newGroup) => {
       setGroups(newGroup)
  }
  const getNotes = (id,text)=>{
     setGroupId(id)

  }
  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(groups));
  }, [groups]);
  
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <NotesGroup setShowModal={setShowModal} groups={groups} getNotes={getNotes}/>
      </div>
      <div className={styles.right}>
        {/* <NotesHome/> */}
        <NotesDisplay groupId={groupId} />
       {showModal && <Modal setShowModal={setShowModal} updateGroups={updateGroups}/>}
      </div>
      
    </div>

  )
}