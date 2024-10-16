import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginTest() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        setAuth({ userId: user.id, token, isAdmin: user.isAdmin });
        navigate(user.isAdmin ? "/admin" : "/user");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Champ pour l'email */}
        <label htmlFor="email">email</label>
        <input ref={emailRef} type="email" id="email" required />
      </div>
      <div>
        {/* Champ pour le mot de passe */}
        <label htmlFor="password">password</label>
        <input type="password" id="password" ref={passwordRef} required />
      </div>
      {/* Bouton de soumission du formulaire */}
      <button type="submit">Send</button>
    </form>
  );
}

export default LoginTest;
