import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getSessionItem } from '@/utils/storage';

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  const sessionUser = getSessionItem('loginUser');
  const isLoggedIn = !!sessionUser;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: '소개', path: '/about' },
    { name: '정보마당', path: '/inform' },
    { name: '고객지원', path: '/support' },
    { name: '관리자', path: '/admin' }
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">React App</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-700 hover:text-primary'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link to="/mypage" className="text-gray-700 hover:text-primary transition-colors">
                    {sessionUser.name}님
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
                    로그인
                  </Link>
                  <Link to="/signup" className="btn-primary text-sm px-4 py-2">
                    회원가입
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="mt-8 space-y-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-lg font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-gray-700'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200">
            {isLoggedIn ? (
              <>
                <Link
                  to="/mypage"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700"
                >
                  {sessionUser.name}님
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 w-full btn-secondary"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full btn-secondary text-center mb-3"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full btn-primary text-center"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}