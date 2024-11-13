import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toast notifications
import SignUp from './Login _signup_pages/SignUp';
import VerifyOTP from './Login _signup_pages/VerifyOTP';
import LandingPage from './Login _signup_pages/LandingPage'; // Import your landing page component
import Login from './Login _signup_pages/Login';
import Customer from './Login _signup_pages/Customer';
import ForgotPassword from './Login _signup_pages/ForgotPassword';
import ResetPassword from './Login _signup_pages/PasswordReset';
import Admin from './Login _signup_pages/Admin';
import { UserProvider } from './Login _signup_pages/UserContext';
import DashBoard from './AdminPages/DashBoard';
import Product from './AdminPages/Product';
import Order from './AdminPages/Order';
import Stock from './AdminPages/Stock';
import Sales from './AdminPages/Sales';
import ProductPage from './CustomerPages/ProductPage';
import HomePage from './CustomerPages/HomePage';
import Cart from './CustomerPages/Cart';
import OrderForm from './CustomerPages/OrderForm';
import Account from './CustomerPages/Account';
import AddProduct from './AdminPages/AddProduct';
import { CustomerProvider } from './ContextApi/CustomerContext';
import UpdateProduct from './AdminPages/UpdateProduct';
import SinglePageProduct from './CustomerPages/SinglePageProduct';
import { CartProvider } from './ContextApi/CartContext'
import SingleProductCart from './CustomerPages/SingleProudctCart';

const App = () => {
  return (
    
    <CustomerProvider>
         <CartProvider>
      <UserProvider>
        <Router>
          <ToastContainer /> {/* Add ToastContainer here */}
          <Routes>
            {/* normal login routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* admin routes */}
            <Route path="/admin/:userId/*" element={<Admin />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="product" element={<Product />} />
              <Route path="order" element={<Order />} />
              <Route path="stock" element={<Stock />} />
              <Route path="sales" element={<Sales />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="updateproduct/:productId" element={<UpdateProduct />} /> {/* New route for updating products */}
            </Route>

            {/* customer routes */}
            <Route path="orderform" element={<OrderForm />} />
            <Route path="/customer/:userId/*" element={<Customer />}>
              <Route path="home" element={<HomePage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="account" element={<Account />} />
              <Route path="cart" element={<Cart />} />
              <Route path="singleproductcart" element={<SingleProductCart/>} />
              <Route path="singleproduct/:productId" element={<SinglePageProduct />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
      </CartProvider>

    </CustomerProvider>
  );
};

export default App;
