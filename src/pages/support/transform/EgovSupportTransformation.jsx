import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import { useState, useRef } from "react";

function EgovSupportTransformation() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const MAX_SIZE_MB = 20;
  const MAX_FILES = 10;

  const handleFiles = (files) => {
    const validFiles = [];
    let error = "";

    if (files.length > MAX_FILES) {
      error = `❌ 최대 ${MAX_FILES}개까지 업로드할 수 있습니다.`;
    }

    [...files].forEach((file) => {
      const isZip = file.name.toLowerCase().endsWith(".zip");
      if (!isZip) {
        error = "❌ .zip 파일만 업로드할 수 있습니다.";
      } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        error = `❌ 파일당 최대 ${MAX_SIZE_MB}MB까지만 업로드 가능합니다.`;
      } else {
        validFiles.push(file);
      }
    });

    if (error) {
      setErrorMsg(error);
      setSelectedFiles([]);
    } else {
      setSelectedFiles(validFiles);
      setErrorMsg("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            <li>변환</li>
          </ul>
        </div>
        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">고객지원</h1></div>
            <h2 className="tit_2">코드 변환</h2>
            <div className="board_view2">
              <p className="msg_1">
                업로드된 코드를 전자정부프레임워크 구조에 맞춰 자동으로 변환합니다.
              </p>

              {/* --- 파일 업로드 박스 추가 (기존 UI 유지) --- */}
              <div
                className="upload-box-wrapper"
                style={{
                  backgroundColor: "#F0F8F0",
                  padding: "24px",
                  borderRadius: "8px",
                  border: "1px solid #D1E7DD",
                  marginTop: "20px"
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
                  파일 업로드
                </h3>
                <ul style={{ fontSize: "14px", marginBottom: "16px", color: "#333" }}>
                  <li>압축 형식(<strong>.zip</strong>) 파일만 등록할 수 있습니다.</li>
                  <li>
                    파일 1개 당 크기는 <strong>{MAX_SIZE_MB}MB</strong>를 초과할 수 없으며,
                    최대 <strong>{MAX_FILES}개</strong>까지 등록할 수 있습니다.
                  </li>
                </ul>

                <div
                  className="upload-dropzone"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    border: "2px dashed #CCCCCC",
                    borderRadius: "6px",
                    padding: "40px 20px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}
                >
                  <p style={{ marginBottom: "12px", fontSize: "14px", color: "#555" }}>
                    첨부할 파일을 여기에 끌어다 놓거나,<br />
                    파일 선택 버튼을 눌러 파일을 직접 선택해 주세요.
                  </p>
                  <button
                    type="button"
                    className="btn-file"
                    style={{
                      backgroundColor: "#246BEB",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      borderRadius: "4px"
                    }}
                  >
                    ⬆ 파일 선택
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".zip"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>

                {errorMsg && (
                  <div style={{ color: "red", marginTop: "12px", fontSize: "13px" }}>
                    {errorMsg}
                  </div>
                )}
                {selectedFiles.length > 0 && (
                  <ul style={{ marginTop: "12px", fontSize: "13px", color: "#333" }}>
                    {selectedFiles.map((file, index) => (
                      <li key={index}>✅ {file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              {/* --- 업로드 박스 끝 --- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportTransformation;
