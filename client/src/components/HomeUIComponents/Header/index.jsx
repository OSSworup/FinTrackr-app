import { useNavigate } from "react-router-dom";

function Header() {
  const navigate=useNavigate();

  return (
    <header className="flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 bg-white shadow z-10">
      <h1 className="text-2xl font-bold text-green-700">Finance Planner</h1>
      <div className="space-x-4">
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800" onClick={()=>{navigate('/login')}}>Login</button>
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800" onClick={()=>{navigate('/signup')}}>Sign Up</button>
      </div>
    </header>
  );
}

export default Header;