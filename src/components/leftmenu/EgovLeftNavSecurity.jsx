import { NavLink } from "react-router-dom";
import "@/css/modern-styles.css";

function EgovLeftNavSecurity() {
  return (
    <>
      <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h2 className="nav-title">AI 보안기</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink to="/support/security/intro" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">기능 소개</span>
                <span className="link-desc">AI 보안기의 주요 기능을 확인합니다</span>
              </div>
      
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/security/scan" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">AI 보안 검사</span>
                <span className="link-desc">코드의 보안을 분석합니다</span>
              </div>
   
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/security/detect" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">보안 취약점탐지</span>
                <span className="link-desc">탐지된 취약점을 확인합니다</span>
              </div>
           
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/security/report" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">보안 점검결과</span>
                <span className="link-desc">보안 분석 결과를 확인합니다</span>
              </div>
   
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/security/download" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">다운로드</span>
                <span className="link-desc">보안 검사 결과를 다운로드합니다</span>
              </div>
              <div className="link-indicator"></div>
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

export default EgovLeftNavSecurity;
