import { Link } from "react-router-dom";
import EgovLeftNavGuide from "@/components/leftmenu/EgovLeftNavGuide";
import ChatbotWidget from "@/pages/support/guide/ChatbotWidget"; 

function EgovGuideChatbot() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>챗봇</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavGuide />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">챗봇 가이드</h2>
            <div className="board_view2">
              <p className="msg_1">챗봇 서비스 연동 및 훈련 방법을 안내합니다.</p>

              {/* ✅ 챗봇 위젯 삽입 */}
              <ChatbotWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovGuideChatbot;
