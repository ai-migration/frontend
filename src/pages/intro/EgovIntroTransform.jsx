import { Link, useNavigate } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";

function EgovIntroTransform() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/support/transform/transformation");
  };

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

            {/* ✅ 왼쪽 정렬로 타이틀 + 버튼 */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <h2 className="tit_2" style={{ margin: 0 }}>변환 소개</h2>
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
                변환하러 가기 <span style={{ fontSize: "14px" }}>→</span>
              </button>


            </div>

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
