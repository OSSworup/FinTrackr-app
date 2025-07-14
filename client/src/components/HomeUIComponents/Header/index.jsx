import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BarChart2 } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";


function Header() {
  const navigate = useNavigate();
  const { Auth, logout } = useContext(AuthContext);
  const isLoggedIn = !!Auth?.token;

  return (
    <header className="flex justify-between items-center px-4 py-3 fixed top-0 left-0 right-0 bg-white shadow z-10 h-16">
      <div className="flex items-center gap-2">
        <BarChart2 className="text-[#2E7D32] w-5 h-5" />
        <h1
          className="text-lg md:text-xl font-extrabold tracking-wide text-[#2E7D32] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Fin<span className="text-green-900">Trackr</span>
        </h1>
      </div>

      <div className="flex flex-row gap-2">
        {isLoggedIn ? (
          <>
            <button
              className="bg-[#2E7D32] text-white px-4 py-1.5 rounded hover:bg-green-800 text-sm md:text-base"
              onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button
              className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 text-sm md:text-base"
              onClick={() => {
                logout();
                navigate("/");
              }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-[#2E7D32] text-white px-4 py-1.5 rounded hover:bg-green-800 text-sm md:text-base"
              onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="bg-[#2E7D32] text-white px-4 py-1.5 rounded hover:bg-green-800 text-sm md:text-base"
              onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;





