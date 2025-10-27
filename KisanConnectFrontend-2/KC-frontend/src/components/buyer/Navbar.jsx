import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const KisanConnectLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="#338833" strokeWidth="2" />
    <path d="M10 18 C12 14, 18 12, 22 18" stroke="#338833" strokeWidth="2" fill="none" />
  </svg>
);

const navLinkClasses =
  "px-0 py-0 font-medium text-neutral-900 transition-all duration-200 rounded-[12px]";
const activeClasses = "bg-green-600 text-white px-4 py-1";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate() ;
  // Handlers
  const handleProfileClick = () => {
    console.log("Profile clicked");
    setIsDropdownOpen(false);
    navigate("profile")
  };
  const handleSettingsClick = () => {
    console.log("Settings clicked");
    setIsDropdownOpen(false);
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token") ;
    localStorage.removeItem("user")
    console.log("Logout clicked");
    navigate("/login");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between bg-white px-8 shadow-md h-14 relative">
      {/* Left: Logo */}
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
            `${navLinkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          Auctions
        </NavLink>
        <NavLink
          to="my-auctions"
          end
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          My Auctions
        </NavLink>
        <NavLink
          to="history"
          end
          className={({ isActive }) =>
            `${navLinkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          History
        </NavLink>
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <span>
          <svg height="24" width="24" fill="#60976b" viewBox="0 0 24 24">
            <path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm7-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C6.63 5.36 5 7.92 5 11v5l-1.29 1.29A1 1 0 005 20h14a1 1 0 00.71-1.71L19 16z" />
          </svg>
        </span>

        {/* Profile picture and dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown}>
            <span className="w-8 h-8 rounded-full overflow-hidden flex">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleProfileClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
              >
                Profile
              </button>
              <button
                onClick={handleSettingsClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
              >
                Settings
              </button>
              <button
                onClick={handleLogoutClick}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
