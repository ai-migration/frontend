import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";

function EgovSupportIntro() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 변환기</Link></li>
            <li>기능 소개</li>
          </ul>
        </div>

        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit">
              <h1 className="tit_1">AI 변환기</h1>
            </div>
            <h2 className="tit_2">기능 소개</h2>

            <div className="board_view2">
              <p className="msg_1">
                AI 변환기는 사용자가 업로드한 코드를 <strong>전자정부표준프레임워크(eGovFrame)</strong> 구조에 맞춰 자동으로 변환해주는 도구입니다.
              </p>

              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "24px",
                  marginTop: "20px",
                  lineHeight: "1.8",
                  fontSize: "15px",
                  color: "#333"
                }}
              >
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <strong>자동 프레임워크 전환</strong><br />
                    기존의 일반 Spring, FastAPI, Flask 등의 코드 구조를 전자정부프레임워크 구조에 맞춰 재구성합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>기능 인식 및 모듈 매핑</strong><br />
                    업로드된 코드에서 REST API, DB 연동, 서비스 로직 등을 인식하여 eGovFrame 모듈로 자동 매핑합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>보안 템플릿 적용</strong><br />
                    보안에 취약한 코드 패턴을 탐지하고, eGovFrame 보안 코딩 가이드를 기반으로 수정 제안을 반영합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>테스트 코드 변환 지원</strong><br />
                    단위 테스트 코드를 함께 변환하거나, JUnit 기반으로 변환된 테스트 코드를 제공합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>결과 다운로드</strong><br />
                    변환된 결과물은 .zip 파일로 압축되어 제공되며, 다운로드 및 이력 확인이 가능합니다.
                  </li>
                </ul>
              </div>

              <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
                ※ 변환 품질을 높이기 위해 정확한 코드 업로드와 기능 명세 입력을 권장합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportIntro;
