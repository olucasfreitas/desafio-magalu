import "./App.css";
import { useEffect, useState } from "react";
import api from "./api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const user = {
        username,
        password,
      };
      const response = await api.post("/sign-in", user);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("password", response.data.password);
      navigate("/welcome");
    } catch (err) {
      if (err) {
        setShowMessage(true);
      }
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      navigate("/welcome");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="App">
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="example"
        name="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="***********"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={submit}>Entrar</button>
      {showMessage && <h2>Email ou senha incorretos</h2>}
    </div>
  );
}

function Welcome() {
  return <h1>Bem vindo ao magalu</h1>;
}

export default App;
