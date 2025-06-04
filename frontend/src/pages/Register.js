import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };
  return (
    <div className="auth-container">
      {showErrorPopup && (
        <div className="popup-error-register">
          ❌ Inscription Refuse !
        </div>
      )},
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Créer un compte</h2>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">S'inscrire</button>

        <p className="auth-switch">
          Déjà inscrit ?{" "}
          <span onClick={() => navigate("/login")}>Se connecter</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
