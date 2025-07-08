import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function Header() {
  const navigate=useNavigate();
  const {logout}=useContext(AuthContext);

  // TEMP: Delay logout slightly to avoid ProtectedRoute redirecting to /login
  const handleLogout = () => {
    navigate('/'); // Step 1: Go to home
    setTimeout(() => {
      logout();    // Step 2: THEN clear auth
    }, 50); // Give it a tiny delay
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 bg-white shadow z-10">
      <h1 className="text-2xl font-bold text-green-700">Finance Planner</h1>
      <nav className="space-x-6 text-blue-700 font-medium text-base">
        {/* <span className="hover:underline cursor-pointer" onClick={()=>{navigate('/dashboard')}}>Transactions</span> */}
        {/* <span className="hover:underline cursor-pointer" onClick={()=>{navigate('/forecast-dashboard')}}>Forecasting</span> */}
        <span className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</span>
      </nav>
    </header>
  );
}

export default Header;