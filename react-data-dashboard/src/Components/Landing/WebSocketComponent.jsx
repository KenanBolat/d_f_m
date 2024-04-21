import React, { useState, useEffect } from "react";

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws/events/");
        ws.onopen = () => {
            console.log("connected");
        };
        ws.onmessage = (e) => {
            console.log(e.data);

            setMessages((prevMessages) => [...prevMessages, e.data]);
        };
        ws.onclose = () => {
            console.log("disconnected");
        };
        return () => {
            ws.close();
        };
    }, []);
    return (
        <div>
            <h1>WebSocket Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

export default WebSocketComponent;