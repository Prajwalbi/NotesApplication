import React, { useState, useEffect, useRef } from 'react'
import styles from './Home.module.css'
import { NotesGroup } from '../../components/NotesGroup/NotesGroup'
import { NotesHome } from '../../components/NotesHome/NotesHome'
import { NotesDisplay } from '../../components/NotesDisplay/NotesDisplay'
import { Modal } from '../../components/Modal/Modal'

export const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [groups, setGroups] = useState(() => JSON.parse(localStorage.getItem("createdGroups"))) //for notes group 
  const [groupId, setGroupId] = useState()
  const [home, setHome] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)


  const updateGroups = (newGroup) => {
    setGroups(newGroup)
  }
  const getNotes = (id) => {
    setGroupId(id)
    setHome(false)
  }
  const checkIsMobileView = () => {
    if (window.innerWidth < 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(groups));
  }, [groups]);

    useEffect(() => {
      checkIsMobileView();
      window.addEventListener('resize', checkIsMobileView);
      return () => {
        window.removeEventListener('resize', checkIsMobileView);
      };
    }, [])
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <NotesGroup setShowModal={setShowModal} groups={groups} getNotes={getNotes} />
      </div>
      <div className={styles.right}>

        {home ? <NotesHome /> : <NotesDisplay groupId={groupId} />}
        {showModal && <Modal setShowModal={setShowModal} updateGroups={updateGroups} />}

      </div>

    </div >

  )
}
