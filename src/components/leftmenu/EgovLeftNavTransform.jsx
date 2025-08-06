import { NavLink } from "react-router-dom";
import "@/components/leftmenu/LeftNav.css";

function EgovLeftNavTransform() {
  return (
    <div className="nav">
      <div className="inner">
        <h2>AI 변환기</h2>
        <ul className="menu4">
          <li>
            <NavLink to="/support/transform/intro" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">기능 소개</div>
          
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/transform/transformation" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">변환 하기</div>
              <div className="menu-desc">전자정부표준프레임워크로 변환합니다.</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/transform/view_transform" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">변환 이력 조회</div>
              <div className="menu-desc">변환 이력을 확인 합니다.</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/transform/view_test" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">테스트 이력 조회</div>
              <div className="menu-desc">테스트 이력을 확인 합니다.</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support/transform/download" className={({ isActive }) => (isActive ? "cur" : "")}>
              <div className="menu-title">다운로드</div>
              <div className="menu-desc">변환된 코드 파일을 다운로드합니다.</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavTransform;
