import { createContext } from "react";

export const TokenContext = createContext({
    token: JSON.parse(localStorage.getItem('token')),
    setToken: () => {}
})