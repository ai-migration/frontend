import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import EgovProgressBar from "@/components/EgovProgressBar";

import { getSessionItem } from "@/utils/storage";

/**
 * Base URLs
 */
const RAW_GET_BASE  = import.meta.env.VITE_API_BASE      || "http://localhost:8088";
const RAW_POST_BASE = import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://localhost:8088";
const GET_BASE  = (RAW_GET_BASE  || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

console.log("GET_BASE =", GET_BASE);
console.log("POST_BASE =", POST_BASE);

function EgovSupportTransformation() {
  const MAX_FILES = 10;
  const MAX_SIZE_MB = 200;

  const [files1, setFiles1] = useState([]); // 프레임워크 변환용
  const [files2, setFiles2] = useState([]); // 버전 변환용
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

  // 옵션 (변환 시 사용)
  const [lang, setLang] = useState("Python");
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

  // ✅ 단일 파일 업로드: @RequestPart("agent")와 @RequestPart("file")에 맞춰 전송
  const uploadOne = async (item, setFiles) => {
    try {
      const uid = getNumericUserId();
      console.log("sessionUser =", sessionUser);
      if (!uid) {
        alert("로그인 정보의 userId가 숫자가 아닙니다. (id/userId/userNo 중 숫자 필드 필요)");
        return;
      }

      // 백엔드에서 agent.getId() = jobId 로 사용
      const clientJobId = Date.now() + Math.floor(Math.random() * 1000);

      const form = new FormData();

      // ✅ 변경 1) agent 파트를 JSON Blob으로 추가 (Content-Type: application/json)
      const agentPayload = {
        id: clientJobId,     // Agent.id (jobId)
        userId: uid,         // Agent.userId
        // 필요 시 추가 가능: inputLanguage: lang
      };
      const agentBlob = new Blob([JSON.stringify(agentPayload)], { type: "application/json" });
      form.append("agent", agentBlob, "agent.json");

      // ✅ 변경 2) 파일 파트 이름은 백엔드의 @RequestPart("file")와 동일해야 함
      form.append("file", item.file, item.file.name);

      // 업로드 시작 표시
      setFiles(prev => prev.map(it => it.id === item.id ? { ...it, status: "uploading", jobId: clientJobId } : it));

      const res = await axios.post(`${POST_BASE}/agents/conversion`, form, {
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          const pct = Math.round((evt.loaded * 100) / evt.total);
          setFiles(prev => prev.map(it => it.id === item.id ? { ...it, progress: pct } : it));
        },
        withCredentials: USE_CREDENTIALS,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      // 현재 백엔드는 body 없이 200 OK만 반환하므로 clientJobId 유지
      const srvJobId = res?.data?.jobId;
      const srvUserId = res?.data?.userId;

      setFiles(prev => prev.map(it => {
        if (it.id !== item.id) return it;
        return {
          ...it,
          status: "done",
          progress: 100,
          jobId: srvJobId ?? clientJobId,
          __srvUserId: srvUserId ?? uid,
          __s3Key: res?.data?.s3Key, // (있다면 표시)
        };
      }));
    } catch (e) {
      console.error(e);
      setFiles(prev => prev.map(it => it.id === item.id ? { ...it, status: "error" } : it));
    }
  };

  // 파일 선택 즉시 업로드
  const handleFileChange = (e, setFiles, files) => {
    const newFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + newFiles.length;
    if (totalFiles > MAX_FILES) return;

    const validated = newFiles
      .map((file) => {
        const isZip = file.name.toLowerCase().endsWith(".zip");
        const okSize = file.size <= MAX_SIZE_MB * 1024 * 1024;
        if (!isZip || !okSize) return null;
        return {
          id: crypto.randomUUID(),
          file,
          status: "ready",
          progress: 0,
          jobId: null,
        };
      })
      .filter(Boolean);

    if (validated.length > 0) {
      setFiles(prev => [...prev, ...validated]);
      validated.forEach(f => uploadOne(f, setFiles)); // 즉시 업로드
    }
  };

  const appendLog = (line) =>
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}  ${line}`]);

  // 변환 버튼: 업로드와 분리
  const handleTransform = (type) => {
    const target = type === "프레임워크 변환" ? files1 : files2;
    const done = target.filter(f => f.status === "done");
    const jobIds = done.map(f => f.jobId);

    // TODO: 변환 API 호출 (type/lang/fromVer/toVer/jobIds)
    console.log("변환 준비:", { type, lang, fromVer, toVer, jobIds });
    setProgress(0);




    const es = new EventSource("http://localhost:8088/agents/test");
    esRef.current = es;

    es.addEventListener("step", (e) => {
      appendLog(`STEP: ${e.data}`);
      setProgress(prev => {
        const newValue = prev + 10;
        console.log('progress:', newValue);

        if (newValue >= 100) {
          setLoadingType(null);
          setSuccessType(type);
        }
        return newValue;
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
      // 서버에서 보낸 error 이벤트 또는 네트워크 오류
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












    setLoadingType(type);
    // setProgress(100);
    // setTimeout(() => {
    //   setLoadingType(null);
    //   setSuccessType(type);
    //   setProgress(0);
    // }, 500);
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
        <button type="button" style={{ backgroundColor: "#246BEB", color: "#fff", border: "none", padding: "10px 20px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px" }}>
          ⬆ 파일 선택
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,application/zip"
          multiple
          onChange={(e) => handleFileChange(e, setFiles, files)}
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
          <EgovProgressBar
            progress={progress}
          />
        )}

        
        {(loadingType === transformType ||
          successType === transformType) && (
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

        {/* {loadingType === transformType && (
          <div style={{ marginTop: "8px", height: "8px", background: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", transition: "width 0.3s ease" }} />
          </div>
        )} */}
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}>
            <span style={{ color: "#246BEB", fontWeight: "bold" }}>{files.length}개</span> / {MAX_FILES}개
            <button onClick={() => setFiles([])} style={{ border: "none", background: "transparent", color: "#666", cursor: "pointer" }}>
              ❌ 전체 파일 삭제
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((item) => (
              <li key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "6px", padding: "10px 16px", marginBottom: "8px", fontSize: "14px" }}>
                <div style={{ flex: 1 }}>
                  {item.file.name} [{Math.round(item.file.size / 1024)}KB]
                  {item.jobId ? <span style={{ marginLeft: 8, color: "#246BEB" }}>(jobId: {item.jobId})</span> : null}
                </div>

                <div style={{ minWidth: 160 }}>
                  {item.status === "uploading" ? (
                    <>
                      <span style={{ color: "#888" }}>🔄 업로드 중</span>
                      <div style={{ height: 6, backgroundColor: "#e0e0e0", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                        <div style={{ width: `${item.progress || 0}%`, height: "100%", transition: "width 0.1s ease", backgroundColor: "#4caf50" }} />
                      </div>
                    </>
                  ) : item.status === "done" ? (
                    <span style={{ color: "green" }}>✅ 완료</span>
                  ) : item.status === "error" ? (
                    <span style={{ color: "#cc0000" }}>⚠ 실패</span>
                  ) : (
                    <span style={{ color: "#888" }}>대기</span>
                  )}
                </div>

                {item.status === "done" && item.jobId && (
                  <button
                    onClick={() => handleDownload(item.jobId)}
                    style={{ background: "none", border: "1px solid #246BEB", color: "#246BEB", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
                  >
                    ⬇ 다운로드
                  </button>
                )}

                <button
                  onClick={() => setFiles((prev) => prev.filter((f) => f.id !== item.id))}
                  style={{ background: "none", border: "none", color: "#cc0000", cursor: "pointer" }}
                >
                  × 삭제
                </button>
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
              note2: `파일당 ${MAX_SIZE_MB}MB 이하, 최대 ${MAX_FILES}개까지 등록 가능`,
              fileInputRef: fileInputRef1,
              files: files1,
              setFiles: setFiles1,
              transformType: "프레임워크 변환",
            })}

            {UploadBox({
              title: "전자정부프레임워크 버전 변환",
              note1: ".zip 파일만 등록할 수 있습니다.",
              note2: `파일당 ${MAX_SIZE_MB}MB 이하, 최대 ${MAX_FILES}개까지 등록 가능`,
              fileInputRef: fileInputRef2,
              files: files2,
              setFiles: setFiles2,
              transformType: "버전 변환",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportTransformation;
