import { useState } from "react";
import { Link } from "react-router-dom";
import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";

function EgovSecurityDetect() {
  const [file, setFile] = useState(null);
  const [detectResult, setDetectResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDetectResult(null);
  };

  const handleDetect = async () => {
    if (!file) {
      alert("분석할 파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await EgovNet.requestFileUpload("/security/detect", formData);
      if (response?.resultCode === "SUCCESS") {
        setDetectResult(response.resultData);
      } else {
        alert("탐지에 실패했습니다.");
      }
    } catch (error) {
      console.error("보안 탐지 오류:", error);
      alert("탐지 요청 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="c_wrap">
        {/* Breadcrumb */}
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 보안기</Link></li>
            <li>취약점 확인</li>
          </ul>
        </div>

        <div className="layout">
          {/* 왼쪽 네비게이션 */}
          <EgovLeftNavSecurity />

          {/* 콘텐츠 영역 */}
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 보안기</h1></div>
            <h2 className="tit_2">취약점 확인</h2>

            <div className="board_view2">
              <p className="msg_1">
                코드 파일을 업로드하면 AI가 자동으로 <strong>보안 취약점</strong>을 분석합니다.
              </p>

              <div className="upload-box" style={{ margin: "24px 0" }}>
                <input
                  type="file"
                  accept=".zip,.java,.js,.py"
                  onChange={handleFileChange}
                />
                <button className="btn" onClick={handleDetect} disabled={loading} style={{ marginLeft: "10px" }}>
                  {loading ? "탐지 중..." : "보안 탐지 시작"}
                </button>
              </div>

              {detectResult && (
                <div className="result-box" style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px"
                }}>
                  <h3 style={{ marginBottom: "12px" }}>탐지 결과</h3>
                  <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                    {JSON.stringify(detectResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSecurityDetect;
