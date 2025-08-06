import { NavLink } from "react-router-dom";
import "@/components/leftmenu/LeftNav.css"; // CSS 파일 import

function EgovLeftNavSecurity() {
  return (
    <div className="nav">
      <div className="inner">
        <h2>AI 보안기</h2>
        <ul className="menu4">
          <li>
            <NavLink to="/support/security/intro" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">기능 소개</div>
              
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/security/scan" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">AI 보안 검사</div>
              <div className="menu-desc">코드의 보안 분석합니다.</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/security/detect" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">보안 취약점탐지</div>
              <div className="menu-desc">탐지된 취약점을 확인합니다.</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/security/report" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">보안 점검결과</div>
              <div className="menu-desc">보안 분석 결과를 확인 합니다.</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/security/download" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">다운로드</div>
              <div className="menu-desc">변환된 코드 파일을 다운로드합니다.</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavSecurity;
