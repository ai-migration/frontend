import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";

function EgovSupportViewTransformation() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>변환 이력</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">변환 이력 조회</h2>
            <div className="board_view2">
              <p className="msg_1">코드 변환 기록을 조회할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSupportViewTransformation;