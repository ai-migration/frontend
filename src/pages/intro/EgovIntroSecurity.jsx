import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";



function EgovIntroSecurity() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><a className="home" href="#!">Home</a></li>
            <li><a href="#!">정보마당</a></li>
            <li>보안 소개</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNav />
          <div className="contents BUSINESS_INTRO" id="contents">
            <h1 className="tit_3">정보마당</h1>
            <p className="txt_1">보안 진단 기능과 분석 결과에 대한 안내 페이지입니다.</p>
            <h2 className="tit_4">보안 소개</h2>
            <h3 className="tit_5">개요</h3>
            <p className="msg_1">보안 서비스는 코드의 취약점을 분석하고 보안 이슈를 진단하여 안전한 소프트웨어를 개발할 수 있도록 지원합니다.</p>
            <h3 className="tit_5">주요 기능</h3>
            <p className="msg_1">- 정적 분석 도구를 통한 보안 점검<br/>- 보안 보고서 자동 생성<br/>- 진단 결과 이력 관리</p>
            <p className="img">
              <img className="w" src={securityIntroImg} alt="보안 서비스 소개" />
              <img className="m" src={securityIntroImgMobile} alt="보안 서비스 소개 모바일" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroSecurity;