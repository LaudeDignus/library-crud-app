import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSucessLogin, setSucessLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      setSucessLogin(true);
      setTimeout(() => setSucessLogin(false), 2000);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };

  return (
    <div className="auth-container">
      {showErrorPopup && (
        <div className="popup-error-login">
          ❌ Email ou mot de passe incorrect !
        </div>
      )}

      {showSucessLogin && (
        <div className="popup-success-login">
          ✅ Connecte avec Succes ! 
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Se connecter</h2>
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Connexion</button>

        <p className="auth-switch">
          Pas encore de compte ?{" "}
          <span onClick={() => navigate("/register")}>Créer un compte</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
