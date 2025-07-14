import { useNavigate } from 'react-router-dom';
import img from '../../../assets/img.svg'


function Hero() {
  const navigate=useNavigate();

  return (
    <section className="min-h-[60vh] flex flex-col items-center pt-24 px-4 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Take Control of Your Finances</h2>
      <p className="text-lg text-gray-600 mb-6 text-center">Track transactions, plan ahead, and achieve financial freedom</p>
      <button onClick={()=>navigate('/dashboard')} className="bg-green-700 text-white px-6 py-3 rounded text-lg hover:bg-green-900">Get Started</button>

    <img 
    src={img} 
    alt="Finance Illustration" 
    className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto max-h-64 md:max-h-72 lg:max-h-80"
  />
    </section>
  );
}

export default Hero;