import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children}){
    const {Auth}=useContext(AuthContext);
    return Auth ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute;