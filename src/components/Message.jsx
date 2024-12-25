import React from "react";

import { SiGooglemessages } from "react-icons/si";

import "./../style/component.scss";

function Message() {
  const handleBtn = () => {
    window.open("https://wa.me/250781996271", "_blank");
  };

  return (
    <>
      <div className="message">
        <button className="icon" onClick={handleBtn}>
          <SiGooglemessages />
        </button>
      </div>
    </>
  );
}

export default Message;
