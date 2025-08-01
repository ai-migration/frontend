import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";

function EgovSecurityReport() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>분석 결과</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavSecurity />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">보안 분석 결과</h2>
            <div className="board_view2">
              <p className="msg_1">취약점 목록 및 해결 방안을 제공합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSecurityReport;
