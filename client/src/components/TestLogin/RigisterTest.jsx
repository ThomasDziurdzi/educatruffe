import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterTest() {
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.value,
          password,
          firstname,
          lastname,
          address,
          phone,
        }),
      });

      if (response.status === 201) {
        navigate("/login");
      } else {
        const data = await response.json();
        console.info("Erreur:", data);
      }
    } catch (err) {
      console.error("Erreur de requête :", err);
    }
  };

  return (
    <div className="register modal">
      <form className="register__left" onSubmit={handleSubmit}>
        <div className="left__mail">
          <label htmlFor="email" className="visually__hidden">
            Adresse e-mail
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            size="30"
            placeholder="Adresse e-mail*"
            required
          />
        </div>

        <div className="left__mail">
          <label htmlFor="password" className="visually__hidden">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            size="30"
            placeholder="Mot de passe*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="left__mail">
          <label htmlFor="confirm-password" className="visually__hidden">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirm-password"
            size="30"
            placeholder="Confirmer le mot de passe*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password === confirmPassword ? "✅" : "❌"}
        </div>

        <div className="left__mail--dual">
          <input
            type="text"
            id="firstName"
            size="30"
            placeholder="Nom*"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            id="lastName"
            size="30"
            placeholder="Prénom*"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="left__mail">
          <input
            type="text"
            id="address"
            size="30"
            placeholder="Adresse*"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="left__mail">
          <input
            type="text"
            id="phone"
            size="30"
            placeholder="Numéro de téléphone*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register__button--mobile">
          Continuer
        </button>
      </form>
    </div>
  );
}

export default RegisterTest;
