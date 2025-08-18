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
      id: crypto.randomUUID(),
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
              note2: `1개 파일, ${MAX_SIZE_MB}MB 이하 등록 가능`,
              fileInputRef: fileInputRef1,
              file: file1,
              setFile: setFile1,
              transformType: "프레임워크 변환",
            })}

            {UploadBox({
              title: "전자정부프레임워크 버전 변환",
              note1: ".zip 파일만 등록할 수 있습니다.",
              note2: `1개 파일, ${MAX_SIZE_MB}MB 이하 등록 가능`,
              fileInputRef: fileInputRef2,
              file: file2,
              setFile: setFile2,
              transformType: "버전 변환",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportTransformation;
