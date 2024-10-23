import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import VerifyOTP from './VerifyOTP';
import LandingPage from './LandingPage'; // Import your landing page component
import Login from './Login';
import User from './User';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './PasswordReset';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signup" element={<SignUp />} /> {/* Define landing page route */}
        <Route path="/login" element = { <Login />} />
        <Route path="/user/:userId" element={<User />} /> {/* Route for User */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
