import { NavLink } from "react-router-dom";
import "@/css/modern-styles.css";

function EgovLeftNavGuide() {
  return (
    <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <h2 className="nav-title">가이드</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink
              to="/support/guide/egovframework"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <span className="link-text">전자정부프레임워크 가이드</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/intro"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <span className="link-text">정보마당</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/inform"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span className="link-text">알림마당</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default EgovLeftNavGuide;
