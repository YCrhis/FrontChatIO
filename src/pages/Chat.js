import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { currentDay, getCurrentTimeAsNumber } from "../helper/getDay";
import UserChat from "../components/UserChat";
import { ListUsers } from "../services/user";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { URL_BACK } from "../environment";
let socket;
const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [users, setUsers] = useState([]);
  const ref = useRef();

  const navigate = useNavigate();

  let currentUser = JSON.parse(localStorage.getItem("user"));

  const sendMessage = () => {
    socket.emit("chat_message", {
      usuario: currentUser.name,
      message: message,
      image: currentUser.image,
      id: getCurrentTimeAsNumber(),
      date: currentDay(),
    });
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    socket = io(URL_BACK, {
      auth: { serverOffset: 0 },
    });
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("chat_message", (data, serverOffset) => {
      setMessageArray((messageArray) => [...messageArray, data]);
      socket.auth.serverOffset = serverOffset;

      ref.current.scrollTop = ref.current.scrollHeight;
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    ListUsers().then((rst) => {
      setUsers(rst.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="app">
      {loading && <Loader />}
      <div className="container">
        <h1 className="title__app">Chat.IO</h1>
        <h2 className="state__server">
          Servidor | {isConnected ? "Conectado" : "Desconectado"}
        </h2>
        <div className="logout" onClick={handleLogout}>
          LogOut
        </div>
        <div className="container__chat">
          <aside className="recent__users">
            <h3>Recent Users:</h3>
            <div className="user_container">
              {users.map((u, index) => (
                <UserChat key={index} usuario={u.name} image={u.image} />
              ))}
            </div>
          </aside>
          <section className="list__messages">
            <div className="messages" ref={ref}>
              {messageArray.map((m, index) => (
                <UserChat key={index} {...m} />
              ))}
            </div>
            <div className="form__send">
              <input
                type="text"
                value={message}
                placeholder="Send a message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Enviar Mensaje</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Chat;
