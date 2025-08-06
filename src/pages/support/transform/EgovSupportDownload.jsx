import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";

function EgovSupportDownload() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 변환기</Link></li>
            <li>다운로드</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 변환기</h1></div>
            <h2 className="tit_2">변환 결과 다운로드</h2>
            <div className="board_view2">
              <p className="msg_1">코드 변환 산출물을 다운로드할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSupportDownload;