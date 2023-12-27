import "./components.css";

const UserChat = ({ message, usuario, date, image }) => {
  return (
    <div className="user__chat">
      <div className="user__information">
        <img src={image} alt="icon" />
        <div className="user__content">
          {usuario && <strong>{usuario}</strong>}
          {date && <span>{date}</span>}

          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
