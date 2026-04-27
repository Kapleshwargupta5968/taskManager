import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { logoutUser } from "../../services/api/authService";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const navItems = {
    public: [
      { id: 1, name: "Home", path: "/" },
      { id: 2, name: "Features", path: "/features" },
      { id: 3, name: "About", path: "/about" },
    ],
    private: [
      { id: 1, name: "Dashboard", path: "/dashboard" }
    ]
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      dispatch(logout());
      navigate("/signin");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] px-6 py-4">
      <nav className="max-w-7xl mx-auto h-16 flex justify-between items-center px-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[20px] shadow-2xl">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
             <span className="text-white font-black text-xl">T</span>
          </div>
          <h1 className="text-white font-bold text-xl tracking-tight hidden sm:block">TaskManager<span className="text-purple-400">.</span></h1>
        </div>

        <div className="flex items-center gap-8">
          {!user ? (
            <>
              <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
                {navItems.public.map((item) => (
                  <li key={item.id}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => 
                        `hover:text-white transition-colors duration-300 ${isActive && item.path === '/' ? "text-white" : ""}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/signin')}
                  className="text-white font-medium px-5 py-2 hover:text-purple-400 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-white text-black font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all shadow-lg"
                >
                  Join Free
                </button>
              </div>
            </>
          ) : (
            <ul className="flex items-center gap-6 text-gray-300 font-medium">
              {navItems.private.map((item) => (
                <li key={item.id}>
                  <NavLink to={item.path} className="hover:text-white transition-colors">
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <button 
                  onClick={handleLogout} 
                  className="bg-white/10 text-white px-5 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/10"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;