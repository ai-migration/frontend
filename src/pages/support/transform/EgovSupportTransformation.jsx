import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import { useState, useRef } from "react";

function EgovSupportTransformation() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const MAX_FILES = 10;
  const MAX_SIZE_MB = 20;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = files.length + newFiles.length;

    if (totalFiles > MAX_FILES) {
      setErrorMsg(`❌ 최대 ${MAX_FILES}개까지 업로드할 수 있습니다.`);
      return;
    }

    const validated = newFiles.map((file) => {
      if (!file.name.toLowerCase().endsWith(".zip")) {
        setErrorMsg("❌ .zip 파일만 업로드할 수 있습니다.");
        return null;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`❌ 파일당 최대 ${MAX_SIZE_MB}MB까지 업로드 가능합니다.`);
        return null;
      }
      return {
        id: crypto.randomUUID(),
        file,
        status: "uploading",
        progress: 0,
      };
    }).filter(Boolean);

    if (validated.length > 0) {
      setErrorMsg("");
      setFiles((prev) => [...prev, ...validated]);

      validated.forEach((f) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles((prev) =>
            prev.map((item) =>
              item.id === f.id ? { ...item, progress } : item
            )
          );
          if (progress >= 100) {
            clearInterval(interval);
            setFiles((prev) =>
              prev.map((item) =>
                item.id === f.id ? { ...item, status: "done" } : item
              )
            );
          }
        }, 200);
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleDeleteAll = () => {
    setFiles([]);
  };

  return (
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 변환기</Link></li>
            <li>프레임워크 변환</li>
          </ul>
        </div>

        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit"><h1 className="tit_1">AI 변환기</h1></div>
            <h2 className="tit_2">프레임워크 변환</h2>

            <div className="board_view2">
              <p className="msg_1">
                업로드된 코드를 전자정부프레임워크 구조에 맞춰 자동으로 변환합니다.
              </p>

              {/* ✅ 업로드 박스 */}
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
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>파일 업로드</h3>
                <ul style={{ fontSize: "14px", marginBottom: "16px", color: "#333" }}>
                  <li><strong>.zip</strong> 파일만 등록할 수 있습니다.</li>
                  <li>파일당 <strong>20MB</strong> 이하, 최대 <strong>10개</strong>까지 등록 가능</li>
                </ul>

                <div
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
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    첨부할 파일을 끌어다 놓거나 <br />
                    파일 선택 버튼을 눌러 주세요
                  </p>
                  <button
                    type="button"
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
                  <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>{errorMsg}</p>
                )}

                {files.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}>
                      <span style={{ color: "#246BEB", fontWeight: "bold" }}>{files.length}개</span> / {MAX_FILES}개
                      <button onClick={handleDeleteAll} style={{ border: "none", background: "transparent", color: "#666", cursor: "pointer" }}>
                        ❌ 전체 파일 삭제
                      </button>
                    </div>

                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {files.map((item) => (
                        <li key={item.id} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          padding: "10px 16px",
                          marginBottom: "8px",
                          fontSize: "14px"
                        }}>
                          <div style={{ flex: 1 }}>
                            {item.file.name} [{Math.round(item.file.size / 1024)}KB]
                          </div>
                          <div style={{ marginLeft: "10px", minWidth: "120px" }}>
                            {item.status === "uploading" ? (
                              <>
                                <span style={{ color: "#888" }}>🔄 업로드 중</span>
                                <div style={{
                                  height: "6px",
                                  backgroundColor: "#e0e0e0",
                                  borderRadius: "3px",
                                  marginTop: "6px",
                                  overflow: "hidden"
                                }}>
                                  <div style={{
                                    width: `${item.progress}%`,
                                    backgroundColor: "#4caf50",
                                    height: "100%",
                                    transition: "width 0.2s ease"
                                  }} />
                                </div>
                              </>
                            ) : (
                              <span style={{ color: "green" }}>✅ 완료</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleDelete(item.id)}
                            style={{ marginLeft: "12px", background: "none", border: "none", color: "#cc0000", cursor: "pointer" }}
                          >
                            × 삭제
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* ✅ 업로드 UI 끝 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportTransformation;
