import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";

function EgovSecurityIntro() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 보안기</Link></li>
            <li>기능 소개</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavSecurity />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 보안기</h1></div>
            <h2 className="tit_2">기능 소개</h2>
            <div className="board_view2">
              <p className="msg_1">
                AI 보안기는 업로드된 코드에 대해 자동으로 <strong>보안 분석</strong>을 수행하고, <strong>취약점 탐지</strong> 및 <strong>해결 제안</strong>을 제공합니다.
              </p>
              <div style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "24px",
                marginTop: "20px",
                fontSize: "15px",
                lineHeight: "1.8"
              }}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li><strong>보안 취약점 탐지</strong>: 정적 분석을 통해 코드 내의 위험 요소를 자동 감지합니다.</li>
                  <li><strong>AI 기반 보안 제안</strong>: 탐지된 취약점에 따라 자동으로 보완 가이드를 생성합니다.</li>
                  <li><strong>결과 리포트 제공</strong>: 전체 분석 결과를 시각화된 리포트로 제공합니다.</li>
                  <li><strong>분석 이력 저장 및 다운로드</strong>: 분석 결과를 ZIP으로 압축하여 다운로드할 수 있습니다.</li>
                </ul>
              </div>
              <p style={{ marginTop: "16px", color: "#666", fontSize: "14px" }}>
                ※ 보안 분석은 업로드된 .zip 파일 기반으로 수행되며, 최대 20MB, 10개까지 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSecurityIntro;
