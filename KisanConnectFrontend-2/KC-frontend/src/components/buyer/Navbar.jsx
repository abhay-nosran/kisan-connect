import { NavLink } from 'react-router-dom';

const KisanConnectLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="#338833" strokeWidth="2"/>
    <path d="M10 18 C12 14, 18 12, 22 18" stroke="#338833" strokeWidth="2" fill="none"/>
  </svg>
);

const navLinkClasses =
  'px-0 py-0 font-medium text-neutral-900 transition-all duration-200 rounded-[12px]';

const activeClasses =
  'bg-green-600 text-white px-4 py-1';

const Navbar = () => (
  <nav className="flex items-center justify-between bg-white px-8 shadow-md h-14">
    {/* Left: Logo and title */}
    <div className="flex items-center gap-2">
      <KisanConnectLogo />
      <span className="text-green-700 font-bold text-lg tracking-wide">
        Kisan Connect
      </span>
    </div>

    {/* Center: Navigation */}
    <div className="flex gap-8 items-center">
      <NavLink
        to=""
        end
        className={({ isActive }) =>
          `${navLinkClasses} ${isActive ? activeClasses : ''}`
        }
      >
        Auctions
      </NavLink>
      <NavLink
        to="my-auctions"
        end
        className={({ isActive }) =>
          `${navLinkClasses} ${isActive ? activeClasses : ''}`
        }
      >
        My Auctions
      </NavLink>
      <NavLink
        to="history"
        end
        className={({ isActive }) =>
          `${navLinkClasses} ${isActive ? activeClasses : ''}`
        }
      >
        History
      </NavLink>
    </div>

    {/* Right: Notification and profile */}
    <div className="flex items-center gap-6">
      <span>
        <svg height="24" width="24" fill="#60976b" viewBox="0 0 24 24">
          <path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm7-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C6.63 5.36 5 7.92 5 11v5l-1.29 1.29A1 1 0 005 20h14a1 1 0 00.71-1.71L19 16z"/>
        </svg>
      </span>
      <span className="w-8 h-8 rounded-full overflow-hidden flex">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User"
          className="w-full h-full object-cover"
        />
      </span>
    </div>
  </nav>
);

export default Navbar;
