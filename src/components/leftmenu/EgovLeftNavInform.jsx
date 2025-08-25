import { NavLink } from "react-router-dom";
import URL from "@/constants/url";
import "@/css/modern-styles.css";

function EgovLeftNavInform() {
  return (
    <>
      <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17,8 12,3 7,8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <h2 className="nav-title">알림마당</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink
              to={URL.INFORM_NOTICE}
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
              <span className="link-text">공지사항</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={URL.INFORM_FAQ}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <span className="link-text">FAQ</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={URL.INFORM_QNA}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <span className="link-text">Q&A</span>
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

export default EgovLeftNavInform;
