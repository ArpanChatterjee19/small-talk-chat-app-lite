import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  const ref = useRef(null);

  const msgTimestamp = new Date(message.date.seconds *1000).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true });

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])


  // console.log (message);
  return (
    <div ref={ref} className= {`message ${message.senderId === currentUser.uid && "self"}`}>
      <div className="messageInfo">
        <img src = {message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>{msgTimestamp}</span>
      </div>
      <div className="messageContent">
        {message.text && !message.img && <p>{message.text}</p>}
        {message.img && message.text==='' && <img src= {message.img} alt="" loading='lazy'/>}
        {message.text && message.img && 
          <flexbox className='captionedImg'>
            <img src={message.img} alt="" />
            <p>{message.text}</p>
          </flexbox>
        }
      </div>
    </div>
  )
}
