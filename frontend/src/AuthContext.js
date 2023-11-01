import { createContext } from "react";

// Define an initial value for your context
const initialAuthState = {
  username: "",
  id: 0,
  status: false,
  setAuthState: () => {}, // This can be an empty function for now
};

export const AuthContext = createContext(initialAuthState);
