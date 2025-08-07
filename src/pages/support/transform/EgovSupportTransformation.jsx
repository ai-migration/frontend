import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";

function EgovSupportTransformation() {
  const MAX_FILES = 10;
  const MAX_SIZE_MB = 20;

  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  const [loadingType, setLoadingType] = useState(null);
  const [progress, setProgress] = useState(0);
  const [successType, setSuccessType] = useState(null);

  const handleFileChange = (e, setFiles, files) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = files.length + newFiles.length;

    if (totalFiles > MAX_FILES) return;

    const validated = newFiles.map((file) => {
      if (!file.name.toLowerCase().endsWith(".zip") || file.size > MAX_SIZE_MB * 1024 * 1024) return null;
      return { id: crypto.randomUUID(), file, status: "uploading", progress: 0 };
    }).filter(Boolean);

    if (validated.length > 0) {
      setFiles((prev) => [...prev, ...validated]);
      validated.forEach((f) => simulateUpload(f, setFiles));
    }
  };

  const simulateUpload = (f, setFiles) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) => prev.map((item) => item.id === f.id ? { ...item, progress } : item));
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) => prev.map((item) => item.id === f.id ? { ...item, status: "done" } : item));
      }
    }, 100);
  };

  const handleTransform = (type) => {
    setLoadingType(type);
    setSuccessType(null);
    setProgress(0);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setLoadingType(null);
        setSuccessType(type);
      }
    }, 200);
  };

  const renderSelect = (label, options) => (
    <div>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>{label}</label>
      <div style={{ position: "relative", width: "180px" }}>
        <select
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#fff url('data:image/svg+xml;utf8,<svg fill=\"gray\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>') no-repeat right 12px center",
            backgroundSize: "16px 16px",
            appearance: "none",
            fontSize: "14px"
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const UploadBox = ({ title, note1, note2, fileInputRef, files, setFiles, transformType }) => (
    <div className="upload-box-wrapper" style={{ backgroundColor: "#F0F8F0", padding: "24px", borderRadius: "8px", border: "1px solid #D1E7DD", marginTop: "20px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>{title}</h3>
      <ul style={{ fontSize: "14px", marginBottom: "16px", color: "#333" }}>
        <li>{note1}</li>
        <li>{note2}</li>
      </ul>
      <div
        onDrop={(e) => { e.preventDefault(); handleFileChange({ target: { files: e.dataTransfer.files } }, setFiles, files); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        style={{ border: "2px dashed #CCCCCC", borderRadius: "6px", padding: "40px 20px", textAlign: "center", backgroundColor: "#fff", cursor: "pointer" }}
      >
        <p style={{ fontSize: "14px", color: "#555" }}>
          첨부할 파일을 끌어다 놓거나 <br /> 파일 선택 버튼을 눌러 주세요
        </p>
        <button type="button" style={{ backgroundColor: "#246BEB", color: "#fff", border: "none", padding: "10px 20px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px" }}>⬆ 파일 선택</button>
        <input ref={fileInputRef} type="file" accept=".zip" multiple onChange={(e) => handleFileChange(e, setFiles, files)} style={{ display: "none" }} />
      </div>

      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {transformType === "프레임워크 변환" ? (
          <>
            {renderSelect("언어 선택", ["Python", "Java"])}
            
          </>
        ) : (
          <>
            {renderSelect("현재 버전", ["4.1", "4.3"])}
            {renderSelect("타겟 버전", ["4.3", "4.1"])}
          </>
        )}
        <button
          onClick={() => handleTransform(transformType)}
          style={{
            background: loadingType === transformType ? "#ccc" : "linear-gradient(to right, #4facfe, #00f2fe)",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "30px",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: loadingType !== null ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(36, 107, 235, 0.3)"
          }}
          disabled={loadingType !== null}
        >
          {loadingType === transformType
            ? `변환중... (${progress}%)`
            : successType === transformType
              ? "✅ 변환 완료!"
              : "🚀 변환 하기"}
        </button>
        {loadingType === transformType && (
          <div style={{ marginTop: "8px", height: "8px", background: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, background: "#4caf50", height: "100%", transition: "width 0.3s ease" }} />
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}>
            <span style={{ color: "#246BEB", fontWeight: "bold" }}>{files.length}개</span> / {MAX_FILES}개
            <button onClick={() => setFiles([])} style={{ border: "none", background: "transparent", color: "#666", cursor: "pointer" }}>❌ 전체 파일 삭제</button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((item) => (
              <li key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "6px", padding: "10px 16px", marginBottom: "8px", fontSize: "14px" }}>
                <div style={{ flex: 1 }}>{item.file.name} [{Math.round(item.file.size / 1024)}KB]</div>
                <div style={{ marginLeft: "10px", minWidth: "120px" }}>
                  {item.status === "uploading" ? (
                    <>
                      <span style={{ color: "#888" }}>🔄 업로드 중</span>
                      <div style={{ height: "6px", backgroundColor: "#e0e0e0", borderRadius: "3px", marginTop: "6px", overflow: "hidden" }}>
                        <div style={{ width: `${item.progress}%`, backgroundColor: "#4caf50", height: "100%", transition: "width 0.2s ease" }} />
                      </div>
                    </>
                  ) : <span style={{ color: "green" }}>✅ 완료</span>}
                </div>
                <button onClick={() => setFiles((prev) => prev.filter((f) => f.id !== item.id))} style={{ marginLeft: "12px", background: "none", border: "none", color: "#cc0000", cursor: "pointer" }}>× 삭제</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

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

            {UploadBox({
              title: "전자정부프레임워크 변환",
              note1: ".zip 파일만 등록할 수 있습니다.",
              note2: "파일당 20MB 이하, 최대 10개까지 등록 가능",
              fileInputRef: fileInputRef1,
              files: files1,
              setFiles: setFiles1,
              transformType: "프레임워크 변환"
            })}

            {UploadBox({
              title: "전자정부프레임워크 버전 변환",
              note1: ".zip 파일만 등록할 수 있습니다.",
              note2: "파일당 20MB 이하, 최대 10개까지 등록 가능",
              fileInputRef: fileInputRef2,
              files: files2,
              setFiles: setFiles2,
              transformType: "버전 변환"
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportTransformation;