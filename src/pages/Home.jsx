import React from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { ChatArea } from '../components/ChatArea/ChatArea'

export const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar/>
            <ChatArea/>
        </div>
    </div>
  )
}


