import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";

function EgovSecurityCheck() {
  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 보안기</Link></li>
            <li>취약점 확인</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavSecurity />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 보안기</h1></div>
            <h2 className="tit_2">취약점 확인</h2>
            <div className="board_view2">
              <p className="msg_1">
                AI가 탐지한 코드 내 보안 취약점 목록을 확인할 수 있습니다.
              </p>
              <ul style={{ marginTop: "16px", fontSize: "14px", color: "#555", lineHeight: "1.7" }}>
                <li>⚠️ SQL Injection 가능성이 있는 DB 쿼리</li>
                <li>⚠️ 인증되지 않은 외부 요청 처리</li>
                <li>⚠️ 민감 정보 로그 출력</li>
                <li>⚠️ 하드코딩된 비밀번호</li>
              </ul>
              <p style={{ marginTop: "20px", fontSize: "13px", color: "#888" }}>
                ※ 각 취약점 항목을 클릭하여 상세 코드와 제안 수정을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EgovSecurityCheck;
