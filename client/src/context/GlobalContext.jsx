import {
  createContext,
  // useState,
  // useEffect,
} from "react";
// import axios from "axios";
import PropTypes from "prop-types";

const defaultGlobalContext = {
  user: [],
  setUser: () => {},
};

const GlobalContext = createContext(defaultGlobalContext);

function GlobalContextProvider({ children }) {
  // const [user, setUser] = useState(defaultGlobalContext.user);

  // useEffect(() => {
  //   // Fetch data from the API
  //   axios
  //     .get("http://localhost:3310/api/user")
  //     .then((response) => {
  //       // setUser(response.data);
  //       // console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la récupération des services :", error);
  //     });
  // }, []);

  return (
    <GlobalContext.Provider
    // value={{ user }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContext, GlobalContextProvider };
