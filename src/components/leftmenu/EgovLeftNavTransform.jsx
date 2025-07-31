import { NavLink } from "react-router-dom";

function EgovLeftNavTransform() {
  return (
    <div className="nav">
      <div className="inner">
        <h2>변환</h2>
        <ul className="menu4">
          <li>
            <NavLink
              to="/support/transform/transformation"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              변환
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support/transform/view_transform"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              변환 이력 조회
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support/trasnform/view_test"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              테스트 이력 조회
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support/transform/download"
              className={({ isActive }) => (isActive ? "cur" : "")}
            >
              다운로드
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavTransform;
