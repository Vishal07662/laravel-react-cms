import { Navigate } from "react-router-dom";

export default function AuthAdmin({ children }) {
    let user = localStorage.getItem("admin");
    if (!user || user == 'undefined') {
        return <Navigate to="/" />;
    }

    user = JSON.parse(user);

    return children;
}
