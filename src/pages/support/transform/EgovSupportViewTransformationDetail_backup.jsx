import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import jsonLang from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import "@/css/modern-styles.css";

// ── Base URLs ────────────────────────────────────────────────────────────────
const RAW_GET_BASE  = import.meta.env.VITE_API_BASE      || "http://localhost:8088";
const RAW_POST_BASE = import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://localhost:8088";
const GET_BASE  = (RAW_GET_BASE  || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("json", jsonLang);

export default function EgovSupportViewTransformationDetail() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ── 데이터 로드: jobId만으로 상세 조회 (백엔드에 맞춤) ────────────────
  useEffect(() => {
    const jobId = location.state?.jobId;
    if (!jobId) return;
    setLoading(true);
    setErr("");

    fetch(`${GET_BASE}/agents/records/detail/${jobId}`)
      .then((r) => r.json())
      .then((d) => setDetail(d))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [location.state?.jobId]);

  // 리포트 탭에서 JSON 보기용 (필요시)
  const reportText = useMemo(() => {
    const whole = {
      controllers: detail?.convControllerReport ?? [],
      services: detail?.convServiceReport ?? [],
      serviceimpls: detail?.convServiceimplReport ?? [],
      vos: detail?.convVoReport ?? [],
    };
    return JSON.stringify(whole, null, 2);
  }, [detail]);

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
            <span className="breadcrumb-current">작업 상세</span>
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h1 className="hero-title">작업 상세</h1>
                <p className="hero-description">
                  Job {detail?.jobId ?? location.state?.jobId} 변환 작업의 상세 정보와 결과를 확인할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section className="content-section modern-card">
              <div className="card-content">
                {/* Tab Navigation */}
                <div className="tab-navigation">
                  {["overview","controller","service","serviceimpl","vo","reports","reports_json"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      disabled={!detail || !!err}
                      className={`tab-button ${tab === t ? "active" : ""} ${!detail || !!err ? "disabled" : ""}`}
                    >
                      <span className="tab-icon">
                        {getTabIcon(t)}
                      </span>
                      {labelOf(t)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {loading && (
                    <div className="loading-state">
                      <div className="loading-spinner"></div>
                      <span>불러오는 중...</span>
                    </div>
                  )}
                  
                  {err && (
                    <div className="error-state">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <span>에러: {err}</span>
                    </div>
                  )}
                  
                  {!loading && !err && detail && (
                    <>
                      {tab === "overview" && <Overview data={detail} />}
                      {tab === "controller" && <PathList title="Controller 변환본" list={detail?.s3ConvControllerPath} detail={detail} />}
                      {tab === "service" && <PathList title="Service 변환본" list={detail?.s3ConvServicePath} detail={detail} />}
                      {tab === "serviceimpl" && <PathList title="ServiceImpl 변환본" list={detail?.s3ConvServiceimplPath} detail={detail} />}
                      {tab === "vo" && <PathList title="VO 변환본" list={detail?.s3ConvVoPath} detail={detail} />}

                      {tab === "reports" && (
                        <div className="reports-container">
                          <ReportGroup title="Controller 리포트" items={detail?.convControllerReport} />
                          <ReportGroup title="Service 리포트" items={detail?.convServiceReport} />
                          <ReportGroup title="ServiceImpl 리포트" items={detail?.convServiceimplReport} />
                          <ReportGroup title="VO 리포트" items={detail?.convVoReport} />
                        </div>
                      )}

                      {tab === "reports_json" && (
                        <div className="json-report-container">
                          <div className="json-header">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                            <h4>리포트 (원본 JSON)</h4>
                          </div>
                          <div className="json-content">
                            <SyntaxHighlighter language="json" style={github} wrapLongLines>
                              {reportText}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Helper Components ───────────────────────── */

function getTabIcon(key) {
  switch (key) {
    case "overview":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3zM9 9h6v6H9z"></path>
        </svg>
      );
    case "controller":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <circle cx="12" cy="16" r="1"></circle>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      );
    case "service":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M1 12h6m6 0h6"></path>
        </svg>
      );
    case "serviceimpl":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
        </svg>
      );
    case "vo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      );
    case "reports":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      );
    case "reports_json":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <path d="M10 12a2 2 0 0 0 2 2c1 0 2-1 2-2s-1-2-2-2-2 1-2 2z"></path>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      );
  }
}

function labelOf(key) {
  switch (key) {
    case "overview": return "개요";
    case "controller": return "Controller";
    case "service": return "Service";
    case "serviceimpl": return "ServiceImpl";
    case "vo": return "VO";
    case "reports": return "변환 리포트";
    case "reports_json": return "리포트(JSON)";
    default: return key;
  }
}

function Overview({ data }) {
  const rows = [
    ["Job ID", data.jobId, "briefcase"],
    ["User ID", data.userId, "user"],
    ["입력 언어", data.inputLanguage ?? "-", "code"],
    ["원본 ZIP", data.s3OriginPath ?? "-", "archive"],
    ["저장 시각", data.savedAt ?? "-", "clock"],
  ];
  
  return (
    <div className="overview-container">
      <div className="overview-grid">
        {rows.map(([label, value, iconType]) => (
          <div key={label} className="overview-item">
            <div className="overview-icon">
              {getOverviewIcon(iconType)}
            </div>
            <div className="overview-content">
              <div className="overview-label">{label}</div>
              <div className="overview-value">{String(value)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getOverviewIcon(type) {
  switch (type) {
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16,18 22,12 16,6"></polyline>
          <polyline points="8,6 2,12 8,18"></polyline>
        </svg>
      );
    case "archive":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="21,8 21,21 3,21 3,8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12,6 12,12 16,14"></polyline>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      );
  }
}

/**
 * S3 경로 목록을 표시하고, 각 항목에 대해
 *  - 다운로드(새 탭)
 *  - 미리보기(텍스트 로드 → 코드 하이라이트)
 */
function PathList({ title, list, detail }) {
  const arr = Array.isArray(list) ? list : [];
  if (!arr.length) {
    return (
      <div className="empty-path-list">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <span>{title}가 없습니다.</span>
      </div>
    );
  }
  
  return (
    <div className="path-list-container">
      <div className="path-list-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <h4>{title}</h4>
      </div>
      <div className="path-list-grid">
        {arr.map((s3Path, idx) => (
          <FileItem key={idx} s3Path={s3Path} detail={detail} />
        ))}
      </div>
    </div>
  );
}

function FileItem({ s3Path, detail }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileName = s3Path.split("/").pop() || s3Path;

  // 미리보기
  const handlePreview = useCallback(async () => {
    if (preview != null) {
      setPreview(null);
      return;
    }
    setLoading(true);
    try {
      const url = `${GET_BASE}/agents/view/${s3Path}`;
      const resp = await fetch(url, { headers: { Accept: "text/plain" } });
      if (!resp.ok) throw new Error(`미리보기 실패 (${resp.status})`);
      const text = await resp.text();
      setPreview(text);
    } catch (e) {
      alert(String(e));
    } finally {
      setLoading(false);
    }
  }, [detail?.jobId, detail?.userId, s3Path, preview]);

  const handleDownload = useCallback(async () => {
    try {
      console.log(s3Path);
      const res = await fetch(`${GET_BASE}/agents/download/${s3Path}`, { method: "GET" });
      if (!res.ok) throw new Error(`다운로드 URL 요청 실패 (${res.status})`);
      const data = await res.json();             // { path: "https://..." }
      const presigned = data?.path || data?.url || data?.presignedUrl;
      if (!presigned) throw new Error("다운로드 URL이 비어 있습니다.");

      // a[download]로 즉시 다운로드 트리거 (파일명은 서버 Content-Disposition 헤더에 따름)
      const a = document.createElement("a");
      a.href = presigned;
      a.download = ""; // same-origin일 때만 이름 반영, cross-origin은 서버 헤더 적용
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert(String(e));
    }
  }, [s3Path]);

  return (
    <div className="file-item-card">
      <div className="file-item-header">
        <div className="file-info">
          <div className="file-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div className="file-name">{fileName}</div>
        </div>
        <div className="file-actions">
          <button 
            onClick={handlePreview} 
            className="action-btn preview-btn" 
            disabled={loading}
          >
            {loading ? (
              <div className="btn-spinner"></div>
            ) : preview != null ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
            {loading ? "불러오는 중..." : preview != null ? "닫기" : "미리보기"}
          </button>
          <button 
            onClick={handleDownload} 
            className="action-btn download-btn" 
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            다운로드
          </button>
        </div>
      </div>

      {preview != null && (
        <div className="file-preview">
          <div className="preview-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16,18 22,12 16,6"></polyline>
              <polyline points="8,6 2,12 8,18"></polyline>
            </svg>
            <span>코드 미리보기</span>
          </div>
          <div className="preview-content">
            <SyntaxHighlighter language={guessLang(fileName)} style={github} wrapLongLines showLineNumbers>
              {preview}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      <div className="file-path">{s3Path}</div>
    </div>
  );
}

/**
 * 리포트 그룹: [{ "ClassName": { ... } }, ... ] 형태를 카드로 정리
 */
function ReportGroup({ title, items }) {
  const arr = Array.isArray(items) ? items : [];
  
  return (
    <div className="report-group">
      <div className="report-group-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <h4>{title}</h4>
      </div>
      
      {arr.length === 0 ? (
        <div className="empty-report">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <span>리포트가 없습니다.</span>
        </div>
      ) : (
        <div className="report-items">
          {arr.map((obj, i) => {
            const [name, content] = firstEntry(obj);
            // content가 {변경 사항, 추가 사항, 요약} 또는 nested 구조일 수 있으므로 방어적으로 처리
            const conv = content?.conversion ?? content;
            const gen  = content?.generation;

            return (
              <div key={i} className="report-item">
                <div className="report-item-header">
                  <div className="report-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16,18 22,12 16,6"></polyline>
                      <polyline points="8,6 2,12 8,18"></polyline>
                    </svg>
                  </div>
                  <div className="report-name">{name}</div>
                </div>

                {conv && (
                  <div className="report-section">
                    <div className="section-title">변환</div>
                    {"변경 사항" in conv && <Line label="변경 사항" value={conv["변경 사항"]} />}
                    {"추가 사항" in conv && <Line label="추가 사항" value={conv["추가 사항"]} />}
                    {"요약" in conv && <Line label="요약" value={conv["요약"]} />}
                  </div>
                )}

                {gen && (
                  <div className="report-section">
                    <div className="section-title">생성</div>
                    {"변경 사항" in gen && <Line label="변경 사항" value={gen["변경 사항"]} />}
                    {"추가 사항" in gen && <Line label="추가 사항" value={gen["추가 사항"]} />}
                    {"요약" in gen && <Line label="요약" value={gen["요약"]} />}
                  </div>
                )}

                {!conv && !gen && typeof content === "object" && (
                  <div className="report-json">
                    <SyntaxHighlighter language="json" style={github} wrapLongLines>
                      {JSON.stringify(content, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div className="report-line">
      <span className="line-label">{label}:</span>
      <span className="line-value">{String(value)}</span>
    </div>
  );
}

function firstEntry(obj) {
  if (!obj || typeof obj !== "object") return [("-", obj)];
  const k = Object.keys(obj)[0];
  return [k ?? "-", obj?.[k]];
}

// 파일 확장자로 언어 유추
function guessLang(file) {
  const lower = file.toLowerCase();
  if (lower.endsWith(".java")) return "java";
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".xml")) return "xml";
  if (lower.endsWith(".yml") || lower.endsWith(".yaml")) return "yaml";
  if (lower.endsWith(".md")) return "markdown";
  return "java"; // 기본: 자바
}

// 파일 상단(컴포넌트 밖)에 유틸 추가
function detectGroupByPath(p) {
  const lower = (p || "").toLowerCase();
  if (lower.includes("/controller/"))    return "controller";
  if (lower.includes("/serviceimpl/") || lower.includes("/serviceimpl/")) return "serviceimpl";
  if (lower.includes("/service/"))       return "service";
  if (lower.includes("/vo/"))            return "vo";
  // 못 찾으면 기본값
  return "controller";
}

/* ───────────────────────── Styles ───────────────────────── */
const btnSm = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#f6f8fa",
  cursor: "pointer",
};
const btnSmOutline = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  background: "transparent",
  cursor: "pointer",
};
const overTh = { textAlign: "left", width: 160, background: "#f7f7f9", padding: 8, border: "1px solid #eee" };
const overTd = { padding: 8, border: "1px solid #eee" };
