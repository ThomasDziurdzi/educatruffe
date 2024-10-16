import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function MessageAxios({ onMessagesFetched }) {
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3310/api/appointmentRequest"
        );
        onMessagesFetched(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      }
    };

    fetchMessages();
  }, [onMessagesFetched]);

  return null;
}

MessageAxios.propTypes = {
  onMessagesFetched: PropTypes.func.isRequired,
};

export default MessageAxios;
