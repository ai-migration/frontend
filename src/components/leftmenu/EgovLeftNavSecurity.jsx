import { NavLink } from "react-router-dom";

function EgovLeftNavSecurity() {
  return (
    <div className="nav">
      <div className="inner">
        <h2>보안</h2>
        <ul className="menu4">
          <li>
            <NavLink
              to="/support/security/scan"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              보안 분석하기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support/security/download"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              보안 다운로드
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support/security/report"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              분석 결과
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavSecurity;
