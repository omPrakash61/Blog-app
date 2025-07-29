import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import LogoutBtn from "../LogoutBtn";
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    // {
    //   name: "My-Posts",
    //   slug: "/my-posts",
    //   active: authStatus,
    // },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo width="60px" />
          </Link>

          <ul className="hidden md:flex items-center space-x-5 font-medium">
            {navItems.map(
  (item) =>
    item.active && (
      <li key={item.name}>
        <button
          onClick={() => navigate(item.slug)}
          className={`
            relative px-10 py-2.5  rounded-t-md text-black overflow-hidden 
            transition-all duration-300 ease-in-out group
            ${location.pathname === item.slug ? "shadow-[0_0_12px_2px_rgba(59,130,246,0.7)]" : "shadow-blue shadow-lg"}
          `}
        >
          {/* Bottom animated border */}
          <span
            className={`
              absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              transition-all duration-500 ease-out 
              ${location.pathname === item.slug ? "" : "w-0 group-hover:w-full group-hover:left-0"}
            `}
          ></span>

          {/* Content */}
          <span className="relative z-10">{item.name}</span>
        </button>
      </li>
    )
)}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <ul className="flex flex-col md:hidden items-start space-y-3 px-4 pb-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="w-full">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
