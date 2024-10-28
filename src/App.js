import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Login _signup_pages/SignUp';
import VerifyOTP from './Login _signup_pages/VerifyOTP';
import LandingPage from './Login _signup_pages/LandingPage'; // Import your landing page component
import Login from './Login _signup_pages/Login';
import {Customer} from './Login _signup_pages/Customer';
import ForgotPassword from './Login _signup_pages/ForgotPassword';
import ResetPassword from './Login _signup_pages/PasswordReset';
import HomePage from './Login _signup_pages/HomePage';
import Admin from './Login _signup_pages/Admin'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signup" element={<SignUp />} /> {/* Define landing page route */}
        <Route path="/login" element = { <Login />} />
        <Route path="/customer/:userId" element={<Customer />} /> {/* Route for User */}
        <Route path="/admin/:userId" element={<Admin />} /> {/* Route for User */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/home" element = {<HomePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
