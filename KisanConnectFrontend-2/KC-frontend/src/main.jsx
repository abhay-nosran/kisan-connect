import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route ,Routes} from "react-router";
import Buyer from "./components/buyer/Buyer"
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Auctions from './components/buyer/Aucitons'
import MyAuctions from './components/buyer/MyAuctions';
import History from './components/buyer/History';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteBuyer from './components/buyer/ProtectedRouteBuyer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='login' element = {<Login/>} />
            <Route path = "buyer" element = {<ProtectedRoute><ProtectedRouteBuyer><Buyer/></ProtectedRouteBuyer></ProtectedRoute>} > 
              <Route index element = {<Auctions/>} />
              <Route path='my-auctions' element = {<MyAuctions/>} />
              <Route path='history' element = {<History/>}/>
            </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
