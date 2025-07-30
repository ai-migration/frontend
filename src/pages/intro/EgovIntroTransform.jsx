import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";


function EgovIntroTransform() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><a className="home" href="#!">Home</a></li>
            <li><a href="#!">정보마당</a></li>
            <li>변환 소개</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNav />
          <div className="contents BUSINESS_INTRO" id="contents">
            <h1 className="tit_3">정보마당</h1>
            <p className="txt_1">본 페이지는 변환 기능에 대한 전반적인 개요와 제공 서비스를 설명합니다.</p>
            <h2 className="tit_4">변환 소개</h2>
            <h3 className="tit_5">개요</h3>
            <p className="msg_1">변환 서비스는 Python, Java 등 다양한 언어 간의 변환을 지원하며, 코드 품질 향상과 유지보수를 쉽게 할 수 있도록 AI 기반 모델을 활용합니다.</p>
            <h3 className="tit_5">주요 기능</h3>
            <p className="msg_1">- 코드 자동 변환<br/>- 변환 결과 다운로드<br/>- 이력 조회 및 테스트 결과 확인</p>
            <p className="img">
              <img className="w" src={transformIntroImg} alt="변환 서비스 소개" />
              <img className="m" src={transformIntroImgMobile} alt="변환 서비스 소개 모바일" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroTransform;