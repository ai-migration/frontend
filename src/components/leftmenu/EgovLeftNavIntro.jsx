import { NavLink } from "react-router-dom";
import URL from "@/constants/url";
import "@/css/modern-styles.css";

function EgovLeftNavIntro() {
  return (
    <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="nav-title">정보마당</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink
              to={URL.INTRO_TRANSFORM}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"></polyline>
                  <polyline points="8,6 2,12 8,18"></polyline>
                </svg>
              </div>
              <span className="link-text">변환 소개</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={URL.INTRO_SECURITY}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="link-text">보안 소개</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default EgovLeftNavIntro;
