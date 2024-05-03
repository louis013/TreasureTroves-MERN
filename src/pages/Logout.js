import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {

    const { unsetUser, setUser} = useContext(UserContext);

    // Clears the localStorage
    unsetUser();

    useEffect(() => {

        setUser({
            id: null,
            isAdmin: null
        })
    }, [setUser])

    return (
        <Navigate to="/login"/>
    )
}