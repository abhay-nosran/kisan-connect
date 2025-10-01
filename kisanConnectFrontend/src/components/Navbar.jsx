import { NavLink } from 'react-router-dom';
import logoSmall from '../assets/logoSmall.svg';
import bellFrame from '../assets/bellFrame.svg';

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-[#ffff] text-[#458448] px-4 py-1 rounded-full"
      : "hover:underline";

  return (
    <div className="flex items-center justify-between px-12 py-2 bg-[#458448] rounded-3xl">
      {/* Clickable Logo */}
      <NavLink to="/">
        <img src={logoSmall} alt="Kisan Connect Logo" className="h-10" />
      </NavLink>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-6 text-white font-semibold">
        <NavLink to="/buyer" end className={navLinkClass}>
          Auctions
        </NavLink>
        <NavLink to="/buyer/activeauctions" className={navLinkClass}>
          Active Bids
        </NavLink>
        <NavLink to="/buyer/paymenthistory" className={navLinkClass}>
          Payment History
        </NavLink>
        <NavLink to="/buyer/profile" className={navLinkClass}>
          Profile
        </NavLink>
      </div>

      {/* Clickable Notification Icon */}
      <button onClick={() => console.log("Notifications clicked")}>
        <img src={bellFrame} alt="Notifications" className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Navbar;
