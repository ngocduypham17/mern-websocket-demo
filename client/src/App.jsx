import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://172.16.23.220:1234");
// const socket = io("http://192.168.0.106:1234");
// const socket = io("http://localhost:1234");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages([msg]);
    });
  }, []);

  const newMessage = useMemo(() => {
    return messages[0]?.reverse();
  }, [messages]);

  const handleInputChange = (event) => {
    if (event.target.value.length > 50) {
      alert("must enter less than 50 characters");
    } else setInputValue(event.target.value);
  };

  const handleAddText = () => {
    if (inputValue.trim() === "" || username.trim() === "") {
      alert("cant not insert empty text or name");
    } else {
      setInputValue("");
      const message = {
        username: username,
        message: inputValue,
      };
      socket.emit("message", message);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label style={{ marginRight: "10px" }} htmlFor="message">
          Message:
        </label>
        <input
          type="text"
          id="message"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleAddText}>
          Send
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Username</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {newMessage?.length &&
            newMessage.map((message) => (
              <tr key={message._id}>
                {/* <td>{message._id}</td> */}
                <td>{message.username}</td>
                <td>{message.message}</td>
                <td>{message.timestamp}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
