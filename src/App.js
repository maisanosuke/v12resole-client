import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Shop from './pages/Shop/Shop';
import CartSummary from './pages/CartSummary';
import Contact from './pages/Contact';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import {ShoppingCartProvider} from './context/ShoppingCartContext';
import ShoppingCart from './components/ShoppingCart';
import OrderComplete from './pages/OrderComplete';
import OrderCancelled from './pages/OrderCancelled';
import Login from './components/account/Login';
import Profile from './components/account/Profile';
import Register from './components/account/Register';
import ForgotPassword from './components/account/ForgotPassword';
import UpdateAccount from './components/account/UpdateAccount';
import Account from './pages/Account';
import {UserProvider} from './context/UserContext';
import PrivateRoute from './components/account/PrivateRoute';
import PurchaseHistory from './pages/PurchaseHistory';
import NotFound from './pages/NotFound';
import PurchaseDetails from './pages/PurchaseDetails';


function App() {
  return (
    <UserProvider>
    <ShoppingCartProvider>
    <ShoppingCart/>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/how-it-works' element={<HowItWorks />}/>
        <Route path='/about' element={<About />}/>
        <Route exact path='/shop' element={<Shop />}/>
        <Route path='/shop/:id' element={<ItemDetail/>} />
        <Route path='/cart' element={<CartSummary />} />
        <Route path='/order-complete' element={<OrderComplete/>} />
        <Route path='/order-canceled' element={<OrderCancelled/>} />

        <Route path='/account' element={<Account/>} >
            <Route element={<PrivateRoute/>}>
              <Route index element={<Profile />} />
              <Route index path='profile' element={<Profile />} />
              <Route path='update' element={<UpdateAccount />} />
              <Route path='purchase-history' element={<PurchaseHistory /> } />
              <Route path='purchase-details' element={<PurchaseDetails />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='create' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>

        <Route path='/contact' element={<Contact />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <Footer /> 
    </ShoppingCartProvider>
    </UserProvider>
  );
}

export default App;
