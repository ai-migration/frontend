import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import jsonLang from "react-syntax-highlighter/dist/esm/languages/hljs/json";

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
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li><Link to="/" className="home">Home</Link></li>
            <li><Link to="/support">AI 변환기</Link></li>
            <li>변환 이력 조회</li>
          </ul>
        </div>

        <div className="layout">
          <EgovLeftNavTransform />
          <div className="contents SITE_GALLARY_VIEW" id="contents" style={{ width: "100%" }}>
            <div className="top_tit"><h1 className="tit_1">AI 변환기</h1></div>
            <h2 className="tit_2">작업 상세 (Job {detail?.jobId ?? location.state?.jobId})</h2>

            {/* 탭 */}
            <div style={{ display: "flex", gap: 6, borderBottom: "1px solid #eee", paddingBottom: 6, marginTop: 10 }}>
              {["overview","controller","service","serviceimpl","vo","reports","reports_json"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  disabled={!detail || !!err}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border: "1px solid transparent",
                    background: tab === t ? "#f5f7fb" : "transparent",
                    cursor: !detail || !!err ? "not-allowed" : "pointer"
                  }}
                >
                  {labelOf(t)}
                </button>
              ))}
            </div>

            {/* 내용 */}
            <div style={{ minHeight: 420, overflow: "auto", marginTop: 8 }}>
              {loading && <div style={{ padding: 12 }}>불러오는 중…</div>}
              {err && <div style={{ padding: 12, color: "crimson" }}>에러: {err}</div>}
              {!loading && !err && detail && (
                <>
                  {tab === "overview"     && <Overview data={detail} />}
                  {tab === "controller"   && <PathList title="Controller 변환본" list={detail?.s3ConvControllerPath} detail={detail} />}
                  {tab === "service"      && <PathList title="Service 변환본" list={detail?.s3ConvServicePath} detail={detail} />}
                  {tab === "serviceimpl"  && <PathList title="ServiceImpl 변환본" list={detail?.s3ConvServiceimplPath} detail={detail} />}
                  {tab === "vo"           && <PathList title="VO 변환본" list={detail?.s3ConvVoPath} detail={detail} />}

                  {tab === "reports"      && (
                    <div style={{ display: "grid", gap: 16 }}>
                      <ReportGroup title="Controller 리포트" items={detail?.convControllerReport} />
                      <ReportGroup title="Service 리포트" items={detail?.convServiceReport} />
                      <ReportGroup title="ServiceImpl 리포트" items={detail?.convServiceimplReport} />
                      <ReportGroup title="VO 리포트" items={detail?.convVoReport} />
                    </div>
                  )}

                  {tab === "reports_json" && (
                    <>
                      <h4 style={{ margin: "8px 0" }}>리포트 (원본 JSON)</h4>
                      <SyntaxHighlighter language="json" style={github} wrapLongLines>
                        {reportText}
                      </SyntaxHighlighter>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Helper Components ───────────────────────── */

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
    ["Job ID", data.jobId],
    ["User ID", data.userId],
    ["입력 언어", data.inputLanguage ?? "-"],
    ["원본 ZIP", data.s3OriginPath ?? "-"],
    ["저장 시각", data.savedAt ?? "-"],
  ];
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}>
            <th style={overTh}>{k}</th>
            <td style={overTd}>{String(v)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * S3 경로 목록을 표시하고, 각 항목에 대해
 *  - 다운로드(새 탭)
 *  - 미리보기(텍스트 로드 → 코드 하이라이트)
 */
function PathList({ title, list, detail }) {
  const arr = Array.isArray(list) ? list : [];
  if (!arr.length) return <div style={{ padding: 8 }}>{title}가 없습니다.</div>;
  return (
    <div>
      <h4 style={{ margin: "8px 0" }}>{title}</h4>
      <div style={{ display: "grid", gap: 12 }}>
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
    <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <div style={{ fontWeight: 600, wordBreak: "break-all" }}>{fileName}</div>
        <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handlePreview} style={btnSm} disabled={loading}>
              {loading ? "불러오는 중…" : preview != null ? "미리보기 닫기" : "미리보기"}
            </button>
            <button onClick={handleDownload} style={btnSm} disabled={loading}>
              다운로드
            </button>
        </div>
      </div>

      {preview != null && (
        <div style={{ marginTop: 10 }}>
          <SyntaxHighlighter language={guessLang(fileName)} style={github} wrapLongLines showLineNumbers>
            {preview}
          </SyntaxHighlighter>
        </div>
      )}

      <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6, wordBreak: "break-all" }}>{s3Path}</div>
    </div>
  );
}

/**
 * 리포트 그룹: [{ "ClassName": { ... } }, ... ] 형태를 카드로 정리
 */
function ReportGroup({ title, items }) {
  const arr = Array.isArray(items) ? items : [];
  return (
    <div>
      <h4 style={{ margin: "8px 0" }}>{title}</h4>
      {arr.length === 0 && <div style={{ padding: 8, color: "#666" }}>리포트가 없습니다.</div>}
      <div style={{ display: "grid", gap: 10 }}>
        {arr.map((obj, i) => {
          const [name, content] = firstEntry(obj);
          // content가 {변경 사항, 추가 사항, 요약} 또는 nested 구조일 수 있으므로 방어적으로 처리
          const conv = content?.conversion ?? content;
          const gen  = content?.generation;

          return (
            <div key={i} style={{ border: "1px solid #eee", borderRadius: 10, padding: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{name}</div>

              {conv && (
                <div style={{ marginBottom: 8 }}>
                  {"변경 사항" in conv && <Line label="변경 사항" value={conv["변경 사항"]} />}
                  {"추가 사항" in conv && <Line label="추가 사항" value={conv["추가 사항"]} />}
                  {"요약" in conv && <Line label="요약" value={conv["요약"]} />}
                </div>
              )}

              {gen && (
                <div>
                  <div style={{ fontWeight: 600, marginTop: 6, marginBottom: 4 }}>생성</div>
                  {"변경 사항" in gen && <Line label="변경 사항" value={gen["변경 사항"]} />}
                  {"추가 사항" in gen && <Line label="추가 사항" value={gen["추가 사항"]} />}
                  {"요약" in gen && <Line label="요약" value={gen["요약"]} />}
                </div>
              )}

              {!conv && !gen && typeof content === "object" && (
                <SyntaxHighlighter language="json" style={github} wrapLongLines>
                  {JSON.stringify(content, null, 2)}
                </SyntaxHighlighter>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div style={{ margin: "4px 0" }}>
      <span style={{ fontWeight: 600 }}>{label}:</span>{" "}
      <span style={{ whiteSpace: "pre-wrap" }}>{String(value)}</span>
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
