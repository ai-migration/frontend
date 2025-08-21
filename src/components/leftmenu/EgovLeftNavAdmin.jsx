import { NavLink } from "react-router-dom";
import URL from "@/constants/url";
import "@/css/modern-styles.css";

function EgovLeftNavAdmin() {
  return (
    <>
      <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </div>
          <h2 className="nav-title">사이트관리</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">공지사항관리</span>
                <span className="link-desc">사이트 공지사항을 관리합니다</span>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={URL.ADMIN_FAQ} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">FAQ관리</span>
                <span className="link-desc">자주 묻는 질문을 관리합니다</span>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={URL.ADMIN_GALLERY} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21,15 16,10 5,21"></polyline>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">갤러리관리</span>
                <span className="link-desc">이미지 갤러리를 관리합니다</span>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={URL.ADMIN_MEMBERS} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">회원관리</span>
                <span className="link-desc">사이트 회원을 관리합니다</span>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={URL.ADMIN_MANAGER} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">관리자관리</span>
                <span className="link-desc">관리자 계정을 관리합니다</span>
              </div>
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
      
      .link-title {
        color: #000000 !important;
      }
      
      .link-desc {
        color: #000000 !important;
      }
    `}} />
    </>
  );
}

export default EgovLeftNavAdmin;
