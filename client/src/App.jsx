import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import Home from './pages/Home';
import '@fontsource/roboto';
import ProtectedRoute from './components/components/ProtectedRoute';

function App() {

  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    {/* <Route path="/forecast-dashboard" element={<ProtectedRoute><Forecast/></ProtectedRoute>} /> */}
  </Routes>
}

export default App;
