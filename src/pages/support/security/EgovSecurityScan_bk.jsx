import { useState } from "react";
import { Link } from "react-router-dom";
import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";


function EgovSecurityScan() {
  const [file, setFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setScanResult(null);
  };

  const handleScan = async () => {
    if (!file) {
      alert("분석할 파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await EgovNet.requestFileUpload("/security/scan", formData);
      if (response?.resultCode === "SUCCESS") {
        setScanResult(response.resultData);
      } else {
        alert("분석 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("보안 분석 오류:", error);
      alert("분석 요청 실패");
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
            <li>취약점 스캔</li>
          </ul>
        </div>

        <div className="layout">
          {/* 왼쪽 메뉴 */}
          <EgovLeftNavSecurity />

          {/* 콘텐츠 */}
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 보안기</h1></div>
            <h2 className="tit_2">취약점 스캔</h2>

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
                <button className="btn" onClick={handleScan} disabled={loading} style={{ marginLeft: "10px" }}>
                  {loading ? "분석 중..." : "보안 분석 시작"}
                </button>
              </div>

              {scanResult && (
                <div className="result-box" style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px"
                }}>
                  <h3 style={{ marginBottom: "12px" }}>분석 결과</h3>
                  <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {JSON.stringify(scanResult, null, 2)}
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

export default EgovSecurityScan;
