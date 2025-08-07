import { Link, useNavigate } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";

function EgovIntroSecurity() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/support/security/scan"); // 원하는 보안 진단 페이지 경로로 수정
  };

  return (
    <div className="container">
      <div className="c_wrap">
        {/* Location */}
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/intro">정보마당</Link></li>
            <li>보안 소개</li>
          </ul>
        </div>

        {/* Layout: 좌측 메뉴 + 본문 */}
        <div className="layout">
          {/* 좌측 메뉴 */}
          <div className="nav">
            <EgovLeftNav />
          </div>

          {/* 본문 영역 */}
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit">
              <h1 className="tit_1">정보마당</h1>
            </div>

            {/* ✅ 보안 소개 + 버튼 */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <h2 className="tit_2" style={{ margin: 0 }}>보안 소개</h2>
              <button
                onClick={handleNavigate}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #000",
                  color: "#000",
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateX(2px)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                보안 진단받기 <span style={{ fontSize: "14px" }}>→</span>
              </button>
            </div>

            <div className="board_view2">
              <h3 className="tit_5">개요</h3>
              <p className="msg_1">
                보안 서비스는 코드의 취약점을 분석하고 보안 이슈를 진단하여 안전한 소프트웨어를 개발할 수 있도록 지원합니다.
              </p>

              <h3 className="tit_5">주요 기능</h3>
              <p className="msg_1">
                - 정적 분석 도구를 통한 보안 점검<br />
                - 보안 보고서 자동 생성<br />
                - 진단 결과 이력 관리
              </p>

              <p className="img">
                {/* 이미지 영역이 필요하면 여기에 추가 */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroSecurity;
