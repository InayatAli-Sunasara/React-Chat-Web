import React, { useContext } from "react";
import cam from "../../Image/cam.png";
import invite from "../../Image/invite.png";
import more from "../../Image/more.png";
import Messages from "./Messages";
import Input from "./Input.jsx";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={invite} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
