import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";

function EgovSecurityScan() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>보안 분석하기</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavSecurity />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">보안 분석하기</h2>
            <div className="board_view2">
              <p className="msg_1">OWASP 기준의 정적 보안 분석을 수행합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSecurityScan;