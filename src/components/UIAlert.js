import { useEffect } from "react";
import "./components.css";

const UIAlert = ({ description, setNewMessage }) => {
  useEffect(() => {
    const myTime = setTimeout(() => {
      setNewMessage(false);
    }, 5000);

    return () => clearTimeout(myTime);
  }, []);

  return <div className="container__alert">{description}</div>;
};

export default UIAlert;
