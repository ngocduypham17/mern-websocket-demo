/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://172.16.23.220:1234");
// const socket = io("http://192.168.0.106:1234");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, []);

  const newMessage = useMemo(() => {
    return messages[0]?.reverse();
  }, [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddText = () => {
    if (inputValue.trim() === "") {
      alert("do not insert empty text");
    } else {
      setInputValue("");
      socket.emit("message", `${inputValue}`);
    }
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit" onClick={handleAddText}>
        Send it 
      </button>
      <table>
        <thead>
          <td>ID</td>
          <td>Message</td>
          <td>Timestamp</td>
        </thead>
        <tbody>
          {newMessage?.length &&
            newMessage.map((message) => (
              <tr key={message._id}>
                <td>{message._id}</td>
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
