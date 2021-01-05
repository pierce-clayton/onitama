import React, { useState } from "react";
const PlayerInfo = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(props);

  return (
    <div>
      <h1 className="title">{props.user}</h1>
    </div>
  );
};

export default PlayerInfo;
