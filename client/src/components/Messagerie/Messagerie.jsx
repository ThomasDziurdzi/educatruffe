// Hook
import { useState, useEffect, useRef } from "react";

// Components
import MessageAxios from "./MessageAxios";

// CSS
import "./Messagerie.css";

function Messagerie() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const containerRef = useRef(null);

  const handleMessagesFetched = (data) => {
    setMessages(data);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="messagerie">
      <h2 className="messagerie__title">Messagerie</h2>
      <input
        type="text"
        className="messagerie__search-input"
        placeholder="Rechercher prénom ou nom"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MessageAxios onMessagesFetched={handleMessagesFetched} />
      <div className="messagerie__messages-list" ref={containerRef}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <button
              type="button"
              key={message.id}
              className={`messagerie__message-item ${
                selectedMessage?.id === message.id
                  ? "messagerie__message-item--selected"
                  : ""
              }`}
              onClick={() => handleMessageClick(message)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessageClick(message);
                }
              }}
              tabIndex={0}
            >
              <p className="messagerie__info">
                <strong>
                  {message.firstName} {message.lastName}
                </strong>
              </p>
              <p className="messagerie__info">{message.message}</p>
              <p className="messagerie__info"> </p>
              <p className="messagerie__info">
                {" "}
                {new Date(message.date).toLocaleDateString()}
              </p>
            </button>
          ))
        ) : (
          <p>Aucun message trouvé.</p>
        )}
      </div>

      <h3 className="messagerie__message-detail-title">Détails du message</h3>

      {selectedMessage && (
        <div className="messagerie__message-detail">
          <p className="messagerie__message-detailInfo">
            <strong>
              {selectedMessage.firstName} {selectedMessage.lastName}
            </strong>
          </p>

          <p className="messagerie__message-detailInfo">
            {selectedMessage.message}
          </p>

          <p className="messagerie__message-detailInfo">
            {" "}
            {new Date(selectedMessage.date).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default Messagerie;
