import { NavLink } from "react-router-dom";
import "@/css/modern-styles.css";

function EgovLeftNavTransform() {
  return (
    <nav className="modern-left-nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
              <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
              <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
            </svg>
          </div>
          <h2 className="nav-title">AI 변환기</h2>
        </div>
        <ul className="modern-nav-menu">
          <li className="nav-item">
            <NavLink to="/support/transform/intro" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">기능 소개</span>
                <span className="link-desc">AI 변환기의 주요 기능을 확인합니다</span>
              </div>
           
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/transform/transformation" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"></polyline>
                  <polyline points="8,6 2,12 8,18"></polyline>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">변환 하기</span>
                <span className="link-desc">전자정부표준프레임워크로 변환합니다</span>
              </div>
      
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/transform/view_transform" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">변환 이력 조회</span>
                <span className="link-desc">변환 이력을 확인합니다</span>
              </div>
          
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/transform/view_test" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">테스트 이력 조회</span>
                <span className="link-desc">테스트 이력을 확인합니다</span>
              </div>
        
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support/transform/download" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <div className="link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <div className="link-content">
                <span className="link-title">다운로드</span>
                <span className="link-desc">변환된 코드 파일을 다운로드합니다</span>
              </div>
        
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default EgovLeftNavTransform;
