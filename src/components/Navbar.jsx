import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Bell } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          'https://freelancer-backend-qu3g.onrender.com/api/notifications',
          { withCredentials: true }
        );
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    if (user?.role === 'freelancer') fetchNotifications();
  }, [user]);

  const markAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleNotificationClick = (n) => {
    if (n.link) navigate(n.link);
    markAsRead(n._id);
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Jobs', path: '/jobs' },
   
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between py-4">

        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
          <span className="font-extrabold text-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            FreelancePro
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 font-medium text-gray-700 items-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="hover:text-emerald-500 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

         {user && user.role === "freelancer" && (
  <>
    <Link
      to="/my-bids"
      className="hover:text-emerald-500 transition-colors duration-200"
    >
      Bids & Tasks
    </Link>

    <Link
      to="/profile"
      className="hover:text-emerald-500 transition-colors duration-200"
    >
      Profile
    </Link>
  </>
)}
          {user && user.role === 'admin' && (
           
           <>
            <Link
      to="/clientprofile"
      className="hover:text-emerald-500 transition-colors duration-200"
    >
      Profile
    </Link>
        <Link
      to="/hirefreelancer"
      className="hover:text-emerald-500 transition-colors duration-200"
    >
      Hire Freelancer
    </Link>
 <Link
              to="/admin/dashboard"
              className="hover:text-emerald-500 transition-colors duration-200"
            >
              Dashboard
            </Link>
           </> 
          
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user?.role === 'freelancer' && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <Bell className="w-6 h-6 text-gray-700" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <div className="p-3 font-semibold border-b">Notifications</div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <li className="p-3 text-gray-500">No new notifications</li>
                    ) : (
                      notifications.map((n) => (
                        <li
                          key={n._id}
                          className="p-3 border-b last:border-0 text-sm hover:bg-gray-50 flex justify-between items-center"
                        >
                          <span
                            className="cursor-pointer text-gray-700"
                            onClick={() => handleNotificationClick(n)}
                          >
                            {n.message || "New notification"}
                          </span>
                          <button
                            className="text-xs text-blue-500 hover:underline"
                            onClick={() => markAsRead(n._id)}
                          >
                            Mark as read
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!user ? (
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-full text-white font-semibold
                         bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg 
                         hover:shadow-xl hover:scale-105 active:scale-95 
                         transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full text-white font-semibold
                         bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg 
                         hover:shadow-xl hover:scale-105 active:scale-95 
                         transition-all duration-300 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

      
        <div className="md:hidden flex items-center gap-3">
          {user?.role === 'freelancer' && (
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="relative p-1"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
          )}
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {showDropdown && user?.role === 'freelancer' && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="p-3 font-semibold border-b">Notifications</div>
          <ul>
            {notifications.length === 0 ? (
              <li className="p-3 text-gray-500">No new notifications</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n._id}
                  className="p-3 border-b last:border-0 text-sm hover:bg-gray-50 flex justify-between items-center"
                >
                  <span
                    className="cursor-pointer text-gray-700"
                    onClick={() => handleNotificationClick(n)}
                  >
                    {n.message || "New notification"}
                  </span>
                  <button
                    className="text-xs text-blue-500 hover:underline"
                    onClick={() => markAsRead(n._id)}
                  >
                    Mark as read
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4 shadow-inner">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-emerald-500 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

          {user && user.role === 'freelancer' && (
            <Link
              to="/my-bids"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-emerald-500 transition-colors duration-200"
            >
              Bids&Tasks
            </Link>
          )}
          {user && user.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-emerald-500 transition-colors duration-200"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <button
              onClick={() => {
                navigate('/login');
                setIsMenuOpen(false);
              }}
              className="w-full px-6 py-2 rounded-full text-white font-semibold
                         bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg 
                         hover:shadow-xl hover:scale-[1.02] active:scale-95 
                         transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full px-6 py-2 rounded-full text-white font-semibold
                         bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg 
                         hover:shadow-xl hover:scale-[1.02] active:scale-95 
                         transition-all duration-300 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
