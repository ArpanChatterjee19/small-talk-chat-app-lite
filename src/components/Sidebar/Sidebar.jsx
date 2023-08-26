import React from 'react'
import {Navbar} from './Navbar'
import {Search} from './Search'
import {Chatlist} from './Chatlist'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <hr></hr>
      <Chatlist/>
      <footer className="copyright">
        <span>©chatRG 2023 | Arpan Chatterjee</span>
      </footer>
    </div>
  )
}
