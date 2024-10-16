import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./AdminNewsletter.css";

function AdminNewsletter() {
  const { auth } = useAuth();
  const [emails, setEmails] = useState([]);
  const [newsletterContent, setNewsletterContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3310/api/newsletterUser"
        );
        setEmails(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des emails", error);
      }
    };

    fetchEmails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3310/api/newsletter/send",
        {
          emails: emails.map((email) => email.userEmail),
          subject: "Nouvelle Newsletter",
          content: newsletterContent,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setSuccessMessage("Newsletter envoyée avec succès !");
      setNewsletterContent("");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la newsletter", error);
    }
  };

  return (
    <div id="admin__newsletter__global">
      <h2>Inscrit à la newsletter</h2>

      <section className="admin__newsletter__listing">
        <ul>
          {emails.map((item) => (
            <li key={item.id}>{item.userEmail}</li>
          ))}
        </ul>
      </section>

      {successMessage && <p className="success-message">{successMessage}</p>}
      <h2>Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <section className="admin__newsletter__contenu">
          <label htmlFor="newsletter">{null}</label>
          <textarea
            id="newsletter"
            name="newsletter"
            className="admin__textNews"
            rows="20"
            cols="100"
            value={newsletterContent}
            onChange={(e) => setNewsletterContent(e.target.value)}
          />
        </section>

        <section className="admin__newsletter__button">
          <input type="submit" value="Soumettre" />
        </section>
      </form>
    </div>
  );
}

export default AdminNewsletter;
