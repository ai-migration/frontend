import { Link } from "react-router-dom";
import EgovLeftNavGuide from "@/components/leftmenu/EgovLeftNavGuide";

function EgovGuideEgovframework() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>전자정부 프레임워크</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavGuide />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">전자정부프레임워크 가이드</h2>
            <div className="board_view2">
              <p className="msg_1">전자정부프레임워크에 대한 사용 가이드를 안내합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovGuideEgovframework;