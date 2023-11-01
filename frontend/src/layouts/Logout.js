import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Logout.css";

function Logout() {
  const history = useHistory();
  const { setAuthState } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    setOpen(false);
    history.push("/login");
  };

  return (
    <div className="logout-container">
      <button onClick={handleOpen}>Logout</button>

      {open && (
        <div className="dialog">
          <div className="dialog-content">
            <p>Are you sure you want to sign out?</p>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button className="confirm-button" onClick={logout}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
