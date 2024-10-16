import { Outlet } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
