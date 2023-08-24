import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import SmallTalkLogo from '../../img/ST-logo.png'
import Logout from '../../img/logout.png'

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">
        <img src={SmallTalkLogo} alt='' />
      </span>
      <div className="user">
        <img src={currentUser.photoURL} alt="avatar" />
        <span>{currentUser.displayName}</span>
        <img className="logout" src={Logout} alt='' onClick={()=>signOut(auth)} />
      </div>
    </div>
  )
}
