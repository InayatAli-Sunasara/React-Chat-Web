import React, { useContext, useState } from "react";
import addImg from "../../Image/add-img-input.png";
import attached from "../../Image/attached-file.png";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
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

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    // const storageRef = ref(storage, uuid());

    // const uploadTask = uploadBytesResumable(storageRef, img);

    // uploadTask.on(
    //   () => {
    //     // setErr(true);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //       await updateDoc(doc(db, "chats", data.chatId), {
    //         messages: arrayUnion({
    //           id: uuid(),
    //           text,
    //           senderId: currentUser.uid,
    //           date: Timestamp.now(),
    //           img: downloadURL,
    //         }),
    //       });
    //     });
    //   }
    // );

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        () => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img
          src={attached}
          alt=""
          onChange={(e) => setImg(e.target.files[0])}
        />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={addImg} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
