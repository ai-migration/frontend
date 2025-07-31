import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";

function EgovSupportTransformation() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>변환</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">코드 변환</h2>
            <div className="board_view2">
              <p className="msg_1">업로드된 코드를 전자정부프레임워크 구조에 맞춰 자동으로 변환합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSupportTransformation;