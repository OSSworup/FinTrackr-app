import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate=useNavigate();

  return (
    <footer className="bg-gray-100 py-4 mt-12 text-center text-sm text-gray-600">
      <div className="space-x-4">
        <a onClick={()=>navigate('/about')} className="hover:underline cursor-pointer">About</a>
        <a onClick={()=>navigate('/contact')} className="hover:underline cursor-pointer">Contact</a>
        <a onClick={()=>navigate('/privacy')} className="hover:underline cursor-pointer">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;