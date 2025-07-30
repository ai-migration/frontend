import { Link } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";



function EgovIntroTransform() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/intro">정보마당</Link></li>
            <li>변환 소개</li>
          </ul>
        </div>

        <div className="layout">
          <div className="nav">
            <EgovLeftNav />
          </div>

          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit">
              <h1 className="tit_1">정보마당</h1>
            </div>

            <h2 className="tit_2">변환 소개</h2>

            <div className="board_view2">
              <h3 className="tit_5">개요</h3>
              <p className="msg_1">
                변환 서비스는 Python, Java 등 다양한 언어 간의 변환을 지원하며,
                코드 품질 향상과 유지보수를 쉽게 할 수 있도록 AI 기반 모델을 활용합니다.
              </p>

              <h3 className="tit_5">주요 기능</h3>
              <p className="msg_1">
                - 코드 자동 변환<br />
                - 변환 결과 다운로드<br />
                - 이력 조회 및 테스트 결과 확인
              </p>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroTransform;
