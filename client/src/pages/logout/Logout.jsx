import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/apiCalls";

export default function Logout() {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    logout(dispatch);
    window.location.replace("/register"); // redirect to Register page
  };

  return (
    <div className="logout">
      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
