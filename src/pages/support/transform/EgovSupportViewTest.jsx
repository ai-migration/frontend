import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";

function EgovSupportViewTest() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>테스트 이력</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">테스트 이력 조회</h2>
            <div className="board_view2">
              <p className="msg_1">변환된 코드의 자동 테스트 실행 결과를 조회합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSupportViewTest;