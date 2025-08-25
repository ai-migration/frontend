import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import EgovProgressBar from "@/components/EgovProgressBar";
import DinoGame from "@/components/DinoGame";
import { getSessionItem } from "@/utils/storage";
import { randomUUID } from "crypto";
import "@/css/modern-styles.css";

/**
 * Base URLs
 */
const RAW_GET_BASE  = import.meta.env.VITE_API_BASE      || "http://3.39.231.225:8088";
const RAW_POST_BASE = import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://3.39.231.225:8088";
const GET_BASE  = (RAW_GET_BASE  || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

console.log("GET_BASE =", GET_BASE);
console.log("POST_BASE =", POST_BASE);

function EgovSupportTransformation() {
  const MAX_SIZE_MB = 20;

  // ✅ 단일 파일 상태로 변경
  const [file1, setFile1] = useState(null); // 프레임워크 변환용 (단일)
  const [file2, setFile2] = useState(null); // 버전 변환용 (단일)
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  // 변환 UI (업로드와 분리)
  const [loadingType, setLoadingType] = useState(null);
  const [progress, setProgress] = useState(0);
  const [successType, setSuccessType] = useState(null);
  const esRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]); // 수신 메시지 기록
  const [status, setStatus] = useState("IDLE"); // IDLE | RUNNING | DONE | ERROR
  const [showDinoGame, setShowDinoGame] = useState(false);

  // 옵션 (변환 시 사용)
  const [lang, setLang] = useState("Python");
  const [conversionType, setConversionType] = useState("CODE");
  const [fromVer, setFromVer] = useState("4.1");
  const [toVer, setToVer] = useState("4.3");

  const sessionUser = getSessionItem("loginUser");

  // ✅ 숫자 userId만 뽑아 쓰도록 단일 함수로 정리
  const getNumericUserId = () => {
    const candidates = [
      sessionUser?.id,
      sessionUser?.userId,
      sessionUser?.userNo,
      sessionUser?.memberId,
    ];
    for (const c of candidates) {
      const n = Number.parseInt(c, 10);
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  };

  const USE_CREDENTIALS = true;
    // ✅ 업로드를 호출하면 jobId를 resolve 해주는 Promise 기반 함수
  const uploadOne = async (item, setFile) => {
    const uid = getNumericUserId();
    if (!uid) {
      alert("로그인 정보의 userId가 숫자가 아닙니다. (id/userId/userNo 중 숫자 필드 필요)");
      throw new Error("invalid user id");
    }

    // 클라이언트 기준 가채(jobId)
    const clientJobId = Date.now() + Math.floor(Math.random() * 1000);

    const form = new FormData();
    const agentPayload = { jobId: clientJobId, userId: uid , filePath: item.file.name, inputeGovFrameVer: fromVer, outputeGovFrameVer: toVer, isTestCode: false, conversionType: conversionType}; // 필요 데이터 추가
    const agentBlob = new Blob([JSON.stringify(agentPayload)], { type: "application/json" });
    form.append("agent", agentBlob, "agent.json");
    form.append("file", item.file, item.file.name);

    // 업로드 시작
    setFile(prev => ({ ...prev, status: "uploading", jobId: clientJobId }));
    
    const res = await axios.post(`${POST_BASE}/agents/conversion`, form, {
      onUploadProgress: (evt) => {
        if (!evt.total) return;
        const pct = Math.round((evt.loaded * 100) / evt.total);
        setFile(prev => ({ ...prev, progress: pct }));
      },
      withCredentials: USE_CREDENTIALS,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    const srvJobId = res?.data?.jobId ?? clientJobId;
    const srvUserId = res?.data?.userId ?? uid;

    setFile(prev => ({
        ...prev,
        status: "done",
        progress: 100,
        jobId: srvJobId,
        __srvUserId: srvUserId,
        __s3Key: res?.data?.s3Key,
    }));

    // ✅ 업로드 완료 후 서버의 jobId를 반환
    return { jobId: srvJobId, userId: srvUserId };
    };

  // ✅ 단일 파일 선택 즉시 업로드
  const handleFileChangeSingle = (e, setFile) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isZip = file.name.toLowerCase().endsWith(".zip");
    const okSize = file.size <= MAX_SIZE_MB * 1024 * 1024;
    if (!isZip || !okSize) {
      alert(`.zip 파일만 업로드 가능하며, ${MAX_SIZE_MB}MB 이하만 허용됩니다.`);
      return;
    }

    const item = {
      id: randomUUID(),
      file,
      status: "ready",
      progress: 0,
      jobId: null,
    };

    setFile(item);
    // 선택 즉시 업로드 (원치 않으면 이 줄을 주석 처리)
    // uploadOne(item, setFile);
  };

  const appendLog = (line) =>
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}  ${line}`]);

  // 변환 버튼: 업로드와 분리되었지만, "클릭 시 업로드를 실행"하고 "그 다음 SSE"
  const handleTransform = async (type) => {
    // const conversionType = type === "프레임워크 변환" ? "CODE" : "EGOV";
    setConversionType(type === "프레임워크 변환" ? "CODE" : "EGOV");
    const target = type === "프레임워크 변환" ? file1 : file2;
    const setFile = type === "프레임워크 변환" ? setFile1 : setFile2;

    if (!target) {
        alert("파일을 먼저 선택하세요.");
        return;
    }
    if (target.status === "uploading") {
        alert("이미 업로드 중입니다. 잠시만 기다려주세요.");
        return;
    }

    setLoadingType(type);
    setProgress(0);
    setLogs([]);
    setRunning(true);
    setStatus("RUNNING");
    setShowDinoGame(true);

    try {
      // ✅ 여기서 업로드 실행 (파일이 ready 상태였더라도 클릭 시 업로드)
      const { jobId, userId } = await uploadOne(target, setFile);

      // ✅ 업로드 완료 후에야 SSE 시작
      const es = new EventSource(
        `${GET_BASE}/response/${userId}/${jobId}`
      );
      esRef.current = es;

      es.addEventListener("agent-message", (e) => {
        const payload = JSON.parse(e.data);  // ← JSON 파싱
        console.log(payload);
        appendLog(`STEP: ${payload.description}`);
        if(payload.language != null)
          appendLog(`LANGUAGE: ${payload.language}`);
        setProgress((prev) => {
          const v = Math.min(prev + 12.5, 100);
          if (v >= 100) {
            setLoadingType(null);
            setSuccessType(type);
          }
          return v;
        });
      });

      es.addEventListener("step", (e) => {
        appendLog(`STEP: ${e.data}`);
        setProgress((prev) => {
          const v = Math.min(prev + 10, 100);
          if (v >= 100) {
            setLoadingType(null);
            setSuccessType(type);
          }
          return v;
        });
      });

      es.addEventListener("done", (e) => {
        appendLog(`DONE: ${e.data}`);
        setStatus("DONE");
        setRunning(false);
        es.close();
        esRef.current = null;
      });

      es.addEventListener("error", (e) => {
        try {
          const data = e?.data ? JSON.parse(e.data) : null;
          appendLog(`ERROR: ${data?.message ?? "connection error"}`);
        } catch {
          appendLog("ERROR: connection error");
        }
        setStatus("ERROR");
        setRunning(false);
        es.close();
        esRef.current = null;
      });
    } catch (err) {
      console.error(err);
      setStatus("ERROR");
      setRunning(false);
      setLoadingType(null);
    }
  };

  // ✅ 다운로드: 업로드와 동일 규칙의 userId 사용
  const handleDownload = async (jobId) => {
    try {
      const uid = getNumericUserId();
      if (!uid) {
        alert("로그인 정보의 userId가 숫자가 아닙니다. (id/userId/userNo 중 숫자 필드 필요)");
        return;
      }

      const res = await axios.get(`${GET_BASE}/agents/download/${uid}/${jobId}`, {
        withCredentials: USE_CREDENTIALS,
      });
      const url = res.data?.path;
      if (url) window.open(url, "_blank");
      else alert("다운로드 URL을 받지 못했습니다.");
    } catch (e) {
      console.error(e);
      alert("다운로드 요청 중 오류가 발생했습니다.");
    }
  };

  const renderSelect = (label, options, value, onChange) => (
    <div>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>{label}</label>
      <div style={{ position: "relative", width: "180px" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background:
              '#fff url("data:image/svg+xml;utf8,<svg fill=\\"gray\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" width=\\"24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M7 10l5 5 5-5z\\"/></svg>") no-repeat right 12px center',
            backgroundSize: "16px 16px",
            appearance: "none",
            fontSize: "14px",
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );

  // ✅ 단일 파일용 업로드 박스
  const UploadBox = ({ title, note1, note2, fileInputRef, file, setFile, transformType }) => (
    <div className="upload-box-wrapper" style={{ backgroundColor: "#F0F8F0", padding: "24px", borderRadius: "8px", border: "1px solid #D1E7DD", marginTop: "20px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>{title}</h3>
      <ul style={{ fontSize: "14px", marginBottom: "16px", color: "#333" }}>
        <li>{note1}</li>
        <li>{note2}</li>
      </ul>

      <div
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (!f) return;
          handleFileChangeSingle({ target: { files: [f] } }, setFile);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        style={{ border: "2px dashed #CCCCCC", borderRadius: "6px", padding: "40px 20px", textAlign: "center", backgroundColor: "#fff", cursor: "pointer" }}
      >
        <p style={{ fontSize: "14px", color: "#555" }}>
          첨부할 파일을 끌어다 놓거나 <br /> 파일 선택 버튼을 눌러 주세요
        </p>
        <button type="button" style={{ backgroundColor: "#246BEB", color: "#fff", border: "none", padding: "10px 20px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px" }}>
          ⬆ 파일 선택
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,application/zip"
          multiple={false}  // ✅ 단일 파일
          onChange={(e) => handleFileChangeSingle(e, setFile)}
          style={{ display: "none" }}
        />
      </div>

      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {transformType === "프레임워크 변환" ? (
          <></>
        ) : (
          <>
            {renderSelect("현재 버전", ["4.1", "4.3"], fromVer, setFromVer)}
            {renderSelect("타겟 버전", ["4.3", "4.1"], toVer, setToVer)}
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
            cursor: loadingType ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(36, 107, 235, 0.3)",
          }}
          disabled={!!loadingType}
        >
          {loadingType === transformType
            ? `변환중... (${progress}%)`
            : successType === transformType
            ? "✅ 변환 완료!"
            : "🚀 변환 하기"}
        </button>
        
        {loadingType === transformType && (
          <EgovProgressBar progress={progress} />
        )}

        {(loadingType === transformType || successType === transformType) && (
          <div
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              height: 400,
              overflow: "auto",
              background: "#fafafa",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 13,
            }}
          >
            {logs.length === 0 ? (
              <div style={{ color: "#888" }}>로그 없음 (시작을 눌러 테스트하세요)</div>
            ) : (
              logs.map((l, i) => <div key={i}>{l}</div>)
            )}
          </div>
        )}
      </div>

      {file && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}>
            <span style={{ color: "#246BEB", fontWeight: "bold" }}>1개</span>
            <button onClick={() => setFile(null)} style={{ border: "none", background: "transparent", color: "#666", cursor: "pointer" }}>
              ❌ 파일 삭제
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "6px", padding: "10px 16px", marginBottom: "8px", fontSize: "14px" }}>
              <div style={{ flex: 1 }}>
                {file.file.name} [{Math.round(file.file.size / 1024)}KB]
                {file.jobId ? <span style={{ marginLeft: 8, color: "#246BEB" }}>(jobId: {file.jobId})</span> : null}
              </div>

              <div style={{ minWidth: 160 }}>
                {file.status === "uploading" ? (
                  <>
                    <span style={{ color: "#888" }}>🔄 업로드 중</span>
                    <div style={{ height: 6, backgroundColor: "#e0e0e0", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                      <div style={{ width: `${file.progress || 0}%`, height: "100%", transition: "width 0.1s ease", backgroundColor: "#4caf50" }} />
                    </div>
                  </>
                ) : file.status === "done" ? (
                  <span style={{ color: "green" }}>✅ 완료</span>
                ) : file.status === "error" ? (
                  <span style={{ color: "#cc0000" }}>⚠ 실패</span>
                ) : (
                  <span style={{ color: "#888" }}>대기</span>
                )}
              </div>

              {file.status === "done" && file.jobId && (
                <button
                  onClick={() => handleDownload(file.jobId)}
                  style={{ background: "none", border: "1px solid #246BEB", color: "#246BEB", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
                >
                  ⬇ 다운로드
                </button>
              )}

              <button
                onClick={() => setFile(null)}
                style={{ background: "none", border: "none", color: "#cc0000", cursor: "pointer" }}
              >
                × 삭제
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="modern-page-container">
      <div className="modern-page-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb">
          <div className="breadcrumb-container">
            <Link to="/" className="breadcrumb-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              Home
            </Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <Link to="/support" className="breadcrumb-link">AI 변환기</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">프레임워크 변환</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNavTransform />
          
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16,18 22,12 16,6"></polyline>
                    <polyline points="8,6 2,12 8,18"></polyline>
                  </svg>
                </div>
                <h1 className="hero-title">프레임워크 변환</h1>
                <p className="hero-description">
                  기존 코드를 전자정부표준프레임워크로 자동 변환하거나 버전을 업그레이드할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Framework Conversion Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16,18 22,12 16,6"></polyline>
                    <polyline points="8,6 2,12 8,18"></polyline>
                  </svg>
                  <h2>전자정부프레임워크 변환</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="upload-section">
                  <div className="upload-info">
                    <ul className="info-list">
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14,2 14,8 20,8"></polyline>
                        </svg>
                        .zip 파일만 등록할 수 있습니다.
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v6l4 2"></path>
                        </svg>
                        1개 파일, {MAX_SIZE_MB}MB 이하 등록 가능
                      </li>
                    </ul>
                  </div>
                  
                  <div
                    className="upload-dropzone"
                    onDrop={(e) => {
                      e.preventDefault();
                      const f = e.dataTransfer.files?.[0];
                      if (!f) return;
                      handleFileChangeSingle({ target: { files: [f] } }, setFile1);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef1.current.click()}
                  >
                    <div className="dropzone-content">
                      <div className="dropzone-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17,8 12,3 7,8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <h3>파일을 드래그하여 업로드</h3>
                      <p>또는 클릭하여 파일을 선택하세요</p>
                      <button type="button" className="upload-btn">
                        파일 선택
                      </button>
                    </div>
                    <input
                      ref={fileInputRef1}
                      type="file"
                      accept=".zip,application/zip"
                      multiple={false}
                      onChange={(e) => handleFileChangeSingle(e, setFile1)}
                      style={{ display: "none" }}
                    />
                  </div>

                  {file1 && (
                    <div className="file-preview">
                      <div className="file-item">
                        <div className="file-info">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                          </svg>
                          <div className="file-details">
                            <span className="file-name">{file1.file.name}</span>
                            <span className="file-size">{Math.round(file1.file.size / 1024)}KB</span>
                            {file1.jobId && <span className="job-id">JobId: {file1.jobId}</span>}
                          </div>
                        </div>
                        <div className="file-status">
                          {file1.status === "uploading" ? (
                            <div className="status-uploading">
                              <div className="spinner"></div>
                              <span>업로드 중... {file1.progress || 0}%</span>
                            </div>
                          ) : file1.status === "done" ? (
                            <div className="status-done">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12"></polyline>
                              </svg>
                              <span>완료</span>
                            </div>
                          ) : file1.status === "error" ? (
                            <div className="status-error">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                              </svg>
                              <span>실패</span>
                            </div>
                          ) : (
                            <div className="status-ready">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                              </svg>
                              <span>대기</span>
                            </div>
                          )}
                        </div>
                        <button
                          className="remove-file-btn"
                          onClick={() => setFile1(null)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="action-section">
                    <button
                      onClick={() => handleTransform("프레임워크 변환")}
                      className={`transform-btn ${loadingType === "프레임워크 변환" ? "loading" : ""} ${successType === "프레임워크 변환" ? "success" : ""}`}
                      disabled={!!loadingType}
                    >
                      {loadingType === "프레임워크 변환" ? (
                        <>
                          <div className="btn-spinner"></div>
                          변환중... ({progress}%)
                        </>
                      ) : successType === "프레임워크 변환" ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                          변환 완료!
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16,18 22,12 16,6"></polyline>
                            <polyline points="8,6 2,12 8,18"></polyline>
                          </svg>
                          변환 시작
                        </>
                      )}
                    </button>
                  </div>

                  {loadingType === "프레임워크 변환" && (
                    <div className="progress-section">
                      <EgovProgressBar progress={progress} />
                    </div>
                  )}

                  {(loadingType === "프레임워크 변환" || successType === "프레임워크 변환") && (
                    <div className="logs-section">
                      <div className="logs-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14,2 14,8 20,8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        <h4>변환 로그</h4>
                      </div>
                      <div className="logs-content">
                        {logs.length === 0 ? (
                          <div className="logs-empty">
                            <span>로그가 없습니다</span>
                          </div>
                        ) : (
                          logs.map((log, i) => (
                            <div key={i} className="log-entry">
                              {log}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {file1 && file1.status === "done" && file1.jobId && (
                    <div className="download-section">
                      <button
                        onClick={() => handleDownload(file1.jobId)}
                        className="download-btn-action"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7,10 12,15 17,10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        결과 다운로드
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Version Conversion Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                    <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                    <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                  </svg>
                  <h2>전자정부프레임워크 버전 변환</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="upload-section">
                  <div className="upload-info">
                    <ul className="info-list">
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14,2 14,8 20,8"></polyline>
                        </svg>
                        .zip 파일만 등록할 수 있습니다.
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v6l4 2"></path>
                        </svg>
                        1개 파일, {MAX_SIZE_MB}MB 이하 등록 가능
                      </li>
                    </ul>
                  </div>

                  <div className="version-selectors">
                    <div className="version-selector">
                      <label>현재 버전</label>
                      <select
                        value={fromVer}
                        onChange={(e) => setFromVer(e.target.value)}
                        className="version-select"
                      >
                        <option value="4.1">4.1</option>
                        <option value="4.3">4.3</option>
                      </select>
                    </div>
                    <div className="version-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                    <div className="version-selector">
                      <label>타겟 버전</label>
                      <select
                        value={toVer}
                        onChange={(e) => setToVer(e.target.value)}
                        className="version-select"
                      >
                        <option value="4.3">4.3</option>
                        <option value="4.1">4.1</option>
                      </select>
                    </div>
                  </div>
                  
                  <div
                    className="upload-dropzone"
                    onDrop={(e) => {
                      e.preventDefault();
                      const f = e.dataTransfer.files?.[0];
                      if (!f) return;
                      handleFileChangeSingle({ target: { files: [f] } }, setFile2);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef2.current.click()}
                  >
                    <div className="dropzone-content">
                      <div className="dropzone-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17,8 12,3 7,8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <h3>파일을 드래그하여 업로드</h3>
                      <p>또는 클릭하여 파일을 선택하세요</p>
                      <button type="button" className="upload-btn">
                        파일 선택
                      </button>
                    </div>
                    <input
                      ref={fileInputRef2}
                      type="file"
                      accept=".zip,application/zip"
                      multiple={false}
                      onChange={(e) => handleFileChangeSingle(e, setFile2)}
                      style={{ display: "none" }}
                    />
                  </div>

                  {file2 && (
                    <div className="file-preview">
                      <div className="file-item">
                        <div className="file-info">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                          </svg>
                          <div className="file-details">
                            <span className="file-name">{file2.file.name}</span>
                            <span className="file-size">{Math.round(file2.file.size / 1024)}KB</span>
                            {file2.jobId && <span className="job-id">JobId: {file2.jobId}</span>}
                          </div>
                        </div>
                        <div className="file-status">
                          {file2.status === "uploading" ? (
                            <div className="status-uploading">
                              <div className="spinner"></div>
                              <span>업로드 중... {file2.progress || 0}%</span>
                            </div>
                          ) : file2.status === "done" ? (
                            <div className="status-done">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12"></polyline>
                              </svg>
                              <span>완료</span>
                            </div>
                          ) : file2.status === "error" ? (
                            <div className="status-error">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                              </svg>
                              <span>실패</span>
                            </div>
                          ) : (
                            <div className="status-ready">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                              </svg>
                              <span>대기</span>
                            </div>
                          )}
                        </div>
                        <button
                          className="remove-file-btn"
                          onClick={() => setFile2(null)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="action-section">
                    <button
                      onClick={() => handleTransform("버전 변환")}
                      className={`transform-btn ${loadingType === "버전 변환" ? "loading" : ""} ${successType === "버전 변환" ? "success" : ""}`}
                      disabled={!!loadingType}
                    >
                      {loadingType === "버전 변환" ? (
                        <>
                          <div className="btn-spinner"></div>
                          변환중... ({progress}%)
                        </>
                      ) : successType === "버전 변환" ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                          변환 완료!
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                            <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                            <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                          </svg>
                          버전 변환 시작
                        </>
                      )}
                    </button>
                  </div>

                  {loadingType === "버전 변환" && (
                    <div className="progress-section">
                      <EgovProgressBar progress={progress} />
                    </div>
                  )}

                  {(loadingType === "버전 변환" || successType === "버전 변환") && (
                    <div className="logs-section">
                      <div className="logs-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14,2 14,8 20,8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        <h4>변환 로그</h4>
                      </div>
                      <div className="logs-content">
                        {logs.length === 0 ? (
                          <div className="logs-empty">
                            <span>로그가 없습니다</span>
                          </div>
                        ) : (
                          logs.map((log, i) => (
                            <div key={i} className="log-entry">
                              {log}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {file2 && file2.status === "done" && file2.jobId && (
                    <div className="download-section">
                      <button
                        onClick={() => handleDownload(file2.jobId)}
                        className="download-btn-action"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7,10 12,15 17,10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        결과 다운로드
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Transformation Page Styles */
        .modern-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(0, 0, 255, 0.02) 0%, rgba(255, 255, 255, 0.8) 100%);
        }

        .modern-page-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 2rem;
        }

        .modern-breadcrumb {
          margin-bottom: 2rem;
        }

        .breadcrumb-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .breadcrumb-home,
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-md);
          transition: all 0.2s ease;
        }

        .breadcrumb-home:hover,
        .breadcrumb-link:hover {
          background: var(--light-blue);
          color: var(--primary-blue);
        }

        .breadcrumb-home svg,
        .breadcrumb-separator {
          width: 16px;
          height: 16px;
        }

        .breadcrumb-current {
          color: var(--primary-blue);
          font-weight: 600;
        }

        .modern-layout {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2rem;
          align-items: start;
        }

        .modern-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .content-hero {
          text-align: center;
          padding: 3rem 0;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-xl);
        }

        .hero-icon svg {
          width: 40px;
          height: 40px;
        }

        .hero-title {
          margin: 0 0 1rem;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          margin: 0;
          font-size: 1.125rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        .content-section {
          background: white;
          border-radius: var(--border-radius-2xl);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, 
            rgba(0, 0, 255, 0.05) 0%, 
            rgba(255, 255, 255, 1) 100%);
          border-bottom: 1px solid var(--gray-200);
        }

        .header-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-icon svg {
          width: 24px;
          height: 24px;
          color: var(--primary-blue);
        }

        .header-icon h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .card-content {
          padding: 2rem;
        }

        /* Upload Section */
        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .upload-info {
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          padding: 1.5rem;
          border: 1px solid var(--gray-200);
        }

        .info-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .info-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--gray-700);
          font-size: 0.95rem;
        }

        .info-list li svg {
          width: 18px;
          height: 18px;
          color: var(--primary-blue);
          flex-shrink: 0;
        }

        /* Version Selectors */
        .version-selectors {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
        }

        .version-selector {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .version-selector label {
          font-weight: 600;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .version-select {
          padding: 0.75rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-lg);
          font-size: 0.95rem;
          background: white;
          color: var(--gray-900);
          min-width: 120px;
          text-align: center;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .version-select:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
        }

        .version-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--primary-blue);
          border-radius: 50%;
          color: white;
        }

        .version-arrow svg {
          width: 20px;
          height: 20px;
        }

        /* Upload Dropzone */
        .upload-dropzone {
          border: 2px dashed var(--gray-300);
          border-radius: var(--border-radius-xl);
          padding: 3rem 2rem;
          text-align: center;
          background: var(--gray-50);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .upload-dropzone:hover {
          border-color: var(--primary-blue);
          background: rgba(0, 0, 255, 0.02);
        }

        .dropzone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .dropzone-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-lg);
        }

        .dropzone-icon svg {
          width: 32px;
          height: 32px;
        }

        .dropzone-content h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .dropzone-content p {
          margin: 0;
          color: var(--gray-600);
          font-size: 0.95rem;
        }

        .upload-btn {
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: var(--border-radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upload-btn:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* File Preview */
        .file-preview {
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          padding: 1.5rem;
          border: 1px solid var(--gray-200);
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          padding: 1rem;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .file-info svg {
          width: 24px;
          height: 24px;
          color: var(--primary-blue);
          flex-shrink: 0;
        }

        .file-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .file-name {
          font-weight: 600;
          color: var(--gray-900);
          font-size: 0.95rem;
        }

        .file-size {
          font-size: 0.8rem;
          color: var(--gray-500);
        }

        .job-id {
          font-size: 0.8rem;
          color: var(--primary-blue);
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .file-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-right: 1rem;
        }

        .status-uploading,
        .status-done,
        .status-error,
        .status-ready {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-uploading {
          color: var(--primary-blue);
        }

        .status-done {
          color: #10B981;
        }

        .status-error {
          color: #EF4444;
        }

        .status-ready {
          color: var(--gray-600);
        }

        .status-uploading svg,
        .status-done svg,
        .status-error svg,
        .status-ready svg {
          width: 16px;
          height: 16px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--gray-200);
          border-top: 2px solid var(--primary-blue);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .remove-file-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md);
          background: white;
          color: var(--gray-500);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-file-btn:hover {
          background: #FEF2F2;
          color: #EF4444;
          border-color: #FECACA;
        }

        .remove-file-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Action Section */
        .action-section {
          display: flex;
          justify-content: center;
        }

        .transform-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: white;
          border: none;
          border-radius: var(--border-radius-xl);
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-lg);
          min-width: 200px;
          justify-content: center;
        }

        .transform-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .transform-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .transform-btn.loading {
          background: var(--gray-400);
        }

        .transform-btn.success {
          background: linear-gradient(135deg, #10B981, #059669);
        }

        .transform-btn svg {
          width: 20px;
          height: 20px;
        }

        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Progress Section */
        .progress-section {
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          padding: 1.5rem;
          border: 1px solid var(--gray-200);
        }

        /* Logs Section */
        .logs-section {
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          overflow: hidden;
        }

        .logs-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: white;
          border-bottom: 1px solid var(--gray-200);
        }

        .logs-header svg {
          width: 20px;
          height: 20px;
          color: var(--primary-blue);
        }

        .logs-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .logs-content {
          max-height: 300px;
          overflow-y: auto;
          padding: 1rem 1.5rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.8rem;
          line-height: 1.5;
        }

        .logs-empty {
          text-align: center;
          color: var(--gray-500);
          padding: 2rem;
        }

        .log-entry {
          margin-bottom: 0.5rem;
          color: var(--gray-700);
          padding: 0.25rem 0;
          border-bottom: 1px solid var(--gray-100);
        }

        .log-entry:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        /* Download Section */
        .download-section {
          display: flex;
          justify-content: center;
        }

        .download-btn-action {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: #10B981;
          color: white;
          border: none;
          border-radius: var(--border-radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .download-btn-action:hover {
          background: #059669;
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .download-btn-action svg {
          width: 18px;
          height: 18px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .version-selectors {
            flex-direction: column;
            gap: 1rem;
          }

          .version-arrow {
            transform: rotate(90deg);
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .card-content {
            padding: 1.5rem;
          }

          .card-header {
            padding: 1rem 1.5rem;
          }

          .dropzone-content {
            padding: 2rem 1rem;
          }

          .transform-btn {
            padding: 0.875rem 1.5rem;
            font-size: 0.95rem;
            min-width: 180px;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .card-content {
            padding: 1rem;
          }

          .card-header {
            padding: 0.875rem 1rem;
          }

          .header-icon h2 {
            font-size: 1.125rem;
          }

          .dropzone-content {
            padding: 1.5rem 0.5rem;
          }

          .file-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .file-status {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovSupportTransformation;
