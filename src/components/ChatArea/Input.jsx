import React, { useContext, useState } from "react";
import Img from "../../img/img.png";
import Send from "../../img/send.png";
import EmojiIcon from "../../img/Emoji.png";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imageCompression from "browser-image-compression";


export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleShowPicker = ()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event) => {
    setText(text => text += event.emoji);
  };

  const handleSend = async () => {
    if (img) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedImg = await imageCompression(img, options);

      if (compressedImg) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, compressedImg);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            // setError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      }
    } else if (text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    

    if (text && img===null) {
      try {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        setText("");
        setImg(null);
      }

      try {
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        setText("");
        setImg(null);
      }
    } else if (img) {
      try {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text:"[Photo]  "+text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        setText("");
        setImg(null);
      }

      try {
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        setText("");
        setImg(null);
      }
    }

    setText("");
    setImg(null);
  };

  return (
    <React.Fragment>
      <div className="input">
        <div className="emojiTray">
          <img className="emojiIcon" src={EmojiIcon} alt="" onClick={handleShowPicker}/>
          { showEmojiPicker && 
          <EmojiPicker
          theme={Theme.AUTO}
          lazyLoadEmojis={true}
          height={400}
          width={300}
          onEmojiClick={handleEmojiClick}
        />}
        </div>
        <textarea
          type="text"
          placeholder="Type new message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="send">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>
            <img src={Send} alt="" />
          </button>
        </div>
      </div>
      
    </React.Fragment>
  );
};
