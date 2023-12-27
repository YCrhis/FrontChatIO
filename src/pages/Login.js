import { useState } from "react";
import { getCurrentTimeAsNumber } from "../helper/getDay";
import UIAlert from "../components/UIAlert";
import { RegisterUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    id: getCurrentTimeAsNumber(),
    name: "",
    image: "https://cdn-icons-png.flaticon.com/512/3398/3398643.png",
    state: true,
    email: "",
  });

  const handleRegister = () => {
    if (form.name !== "" || form.email !== "") {
      setLoading(true);
      RegisterUser(form).then((rst) => {
        if (rst.status === 200) {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(rst.data));
          navigate("/chat");
        }
      });
    } else {
      setError({ description: "Failed to register, complete all the fields" });
    }
  };

  return (
    <div className="login">
      {loading && <Loader />}
      {error && (
        <UIAlert description={error.description} setNewMessage={setError} />
      )}
      <div className="login__background"></div>
      <div className="container__login__form">
        <div className="login__form">
          <h1>Sign In</h1>
          <p>All the acounts will be deleted at 12:00 PM 👈</p>
          <div className="login__control">
            <label>User Name </label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="login__control">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="login__control">
            <label>
              Image Url <span>(*Optional)</span>
            </label>
            <input
              type="text"
              placeholder="This is a URL but is optional"
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
          <button onClick={handleRegister}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
