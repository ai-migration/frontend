import { NavLink } from "react-router-dom";

function EgovLeftNavGuide() {
  return (
    <div className="nav">
      <div className="inner">
        <h2>가이드</h2>
        <ul className="menu4">
          <li>
            <NavLink
              to="/support/guide/egovframework"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              전자정부프레임워크
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support/guide/chatbot"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              챗봇
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavGuide;
