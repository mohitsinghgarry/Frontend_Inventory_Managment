import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Login _signup_pages/SignUp';
import VerifyOTP from './Login _signup_pages/VerifyOTP';
import LandingPage from './Login _signup_pages/LandingPage'; // Import your landing page component
import Login from './Login _signup_pages/Login';
import {Customer} from './Login _signup_pages/Customer';
import ForgotPassword from './Login _signup_pages/ForgotPassword';
import ResetPassword from './Login _signup_pages/PasswordReset';
import Admin from './Login _signup_pages/Admin'
 import { UserProvider } from './Login _signup_pages/UserContext';
import DashBoard from './AdminPages/DashBoard';
import Product from './AdminPages/Product';
import Order from './AdminPages/Order';
import Stock from './AdminPages/Stock';
import Sales from './AdminPages/Sales';


const App = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* normal login routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer/:userId" element={<Customer />} /> {/* Route for Customer */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/admin/:userId/*" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="stock" element={<Stock />} />
          <Route path="sales" element={<Sales />} />
        </Route>
        
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;