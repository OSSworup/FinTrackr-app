import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import Home from './pages/Home';
import '@fontsource/roboto';
import ProtectedRoute from './components/components/ProtectedRoute';
import AboutPage from './components/HomeUIComponents/AboutPage';
import ContactPage from './components/HomeUIComponents/Contact';
import PrivacyPolicy from './components/HomeUIComponents/PrivacyPolicy';
import ScrollToTop from './components/components/ScrollToTop';

function App() {

  return <>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/privacy" element={<PrivacyPolicy/>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      {/* <Route path="/forecast-dashboard" element={<ProtectedRoute><Forecast/></ProtectedRoute>} /> */}
    </Routes>
  </>
}

export default App;
