import React, { useContext } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import StartChat from "../../img/StartChat.png";
import { MessageSection } from "./MessageSection";
import { Input } from "./Input";
import { ChatContext } from "../../context/ChatContext";

export const ChatArea = () => {
  const { data } = useContext(ChatContext);

  return (
    <React.Fragment>
      {data.chatId !== "null" ? (
        <div className="chatArea">
          <div className="chatHeader">
            <div className="chatInfo">
              <img src={data.user?.photoURL} alt="avatar" className="avatar" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <MessageSection/>
          <Input />
        </div>
      ) : (
        <div className="startChat">
          <img src={StartChat} alt=" " />
          <span>Click on a chat to start conversation</span>
        </div>
      )}
    </React.Fragment>
  );
};
