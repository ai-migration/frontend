import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";

function EgovSecurityDownload() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 보안기</Link></li>
            <li>보안 다운로드</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavSecurity />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 보안기</h1></div>
            <h2 className="tit_2">보안 결과 다운로드</h2>
            <div className="board_view2">
              <p className="msg_1">보안 분석 리포트를 다운로드합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSecurityDownload;