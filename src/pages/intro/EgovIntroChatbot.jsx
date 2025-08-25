import { Link } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";


function EgovIntroChatbot() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/intro">정보마당</Link></li>
            <li>챗봇 소개</li>
          </ul>
        </div>

        <div className="layout">
          <EgovLeftNav /> {/* ✅ nav 감싸지 않음! */}

          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit">
              <h1 className="tit_1">정보마당</h1>
            </div>

            <h2 className="tit_2">챗봇 소개</h2>

            <div className="board_view2">
              <h3 className="tit_5">개요</h3>
              <p className="msg_1">
                챗봇 서비스는 사용자의 질문에 실시간으로 응답하며, 고객지원 및 전자정부 프레임워크 관련 정보를 제공합니다.
              </p>

              <h3 className="tit_5">주요 기능</h3>
              <p className="msg_1">
                - 자연어 질문에 대한 실시간 응답<br />
                - 전자정부 프레임워크 기반 지식 응답<br />
                - 사용자 피드백 반영 기능
              </p>

              <p className="img">
     
      
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroChatbot;
