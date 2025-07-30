import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";


function EgovIntroChatbot() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><a className="home" href="#!">Home</a></li>
            <li><a href="#!">정보마당</a></li>
            <li>챗봇 소개</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNav />
          <div className="contents BUSINESS_INTRO" id="contents">
            <h1 className="tit_3">정보마당</h1>
            <p className="txt_1">AI 챗봇 기능에 대한 개요와 제공 기능을 안내합니다.</p>
            <h2 className="tit_4">챗봇 소개</h2>
            <h3 className="tit_5">개요</h3>
            <p className="msg_1">챗봇 서비스는 사용자의 질문을 자동으로 응답하며, 고객지원 및 시스템 내 정보 검색 기능을 제공합니다.</p>
            <h3 className="tit_5">주요 기능</h3>
            <p className="msg_1">- 자연어 질문에 대한 실시간 응답<br/>- 전자정부 프레임워크 기반 지식 응답<br/>- 사용자 피드백 반영 기능</p>
            <p className="img">
              <img className="w" src={chatbotIntroImg} alt="챗봇 서비스 소개" />
              <img className="m" src={chatbotIntroImgMobile} alt="챗봇 서비스 소개 모바일" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroChatbot;
