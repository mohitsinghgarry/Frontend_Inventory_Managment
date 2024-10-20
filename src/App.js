import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import VerifyOTP from './VerifyOTP';
import LandingPage from './LandingPage'; // Import your landing page component
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signup" element={<SignUp />} /> {/* Define landing page route */}
      </Routes>
    </Router>
  );
};

export default App;
