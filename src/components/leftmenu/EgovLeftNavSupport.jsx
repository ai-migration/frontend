import { NavLink } from "react-router-dom";
import URL from "@/constants/url";
import "@/css/modern-styles.css";

function EgovLeftNavSupport() {
  return (
    <>
      <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <h2 className="nav-title">고객지원</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink
              to={URL.SUPPORT_TRANSFORM}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"></polyline>
                  <polyline points="8,6 2,12 8,18"></polyline>
                </svg>
              </div>
              <span className="link-text">변환</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={URL.SUPPORT_SECURITY}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="link-text">보안</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={URL.SUPPORT_GUIDE}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <span className="link-text">가이드</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>

    <style dangerouslySetInnerHTML={{ __html: `
      .modern-left-nav {
        color: #000000 !important;
      }
      
      .nav-title {
        color: #000000 !important;
      }
      
      .link-text {
        color: #000000 !important;
      }
      
      .nav-link {
        color: #000000 !important;
      }
      
      .nav-link:hover {
        color: #000000 !important;
      }
      
      .nav-link.active {
        color: #000000 !important;
      }
    `}} />
    </>
  );
}

export default EgovLeftNavSupport;
