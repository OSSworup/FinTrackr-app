import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { BarChart2 } from "lucide-react";

function Header() {
  const navigate=useNavigate();
  const {logout}=useContext(AuthContext);

  const handleLogout = () => {
    logout(); // ✅ First, clear the token
    setTimeout(() => {
      navigate('/', { replace: true }); // ✅ Then navigate
    }, 0);
  };


  return (
    <header className="flex justify-between items-center px-8 py-3 fixed top-0 left-0 right-0 bg-white shadow z-10 font-['Roboto']">
      <div className="flex items-center gap-2">
        <BarChart2 className="text-[#2E7D32] w-5 h-5" />
        <h1 className="text-lg md:text-xl font-extrabold tracking-wide text-[#2E7D32] cursor-pointer" onClick={()=>navigate('/')}>
          Fin<span className="text-green-900">Trackr</span>
        </h1>
      </div>

      <nav className="space-x-6 text-blue-700 font-medium text-base">
        {/* <span className="hover:underline cursor-pointer" onClick={()=>{navigate('/dashboard')}}>Transactions</span> */}
        {/* <span className="hover:underline cursor-pointer" onClick={()=>{navigate('/forecast-dashboard')}}>Forecasting</span> */}
        <span className="hover:underline cursor-pointer" onClick={handleLogout}>
          Logout
        </span>
      </nav>
    </header>
  );
}

export default Header;