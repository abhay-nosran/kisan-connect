import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App'
import Auctions from './components/Auctions'
import "./index.css"
import ActiveAuctions from './components/ActiveAuctions';
import Admin from './components/Admin';
import Farmer from './components/Farmer';
import PaymentHistory from './components/PaymentHIstory';
import Profile from './components/Profile';
import Login from './components/Login';
import Buyer from './components/Buyer';
import Representative from './components/represntative';
import KisanConnectLanding from './components/KisanConnectLanding';
import Signup from './components/Signup';
import { Framer } from 'lucide-react';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App/>}>
//       <Route path="" element={<Auctions/>} />
//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<KisanConnectLanding />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/representative" element={<Representative />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/farmer" element={<Farmer />} />
      <Route path="/buyer" element={<Buyer />} >
        <Route index element = {<Auctions />}/>
        <Route path="activeauctions" element = {<ActiveAuctions />} />
        <Route path="paymenthistory" element = {<PaymentHistory />} />
        <Route path="profile" element = {<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>
)