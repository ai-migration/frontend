import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsLang from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import mdLang from "react-syntax-highlighter/dist/esm/languages/hljs/markdown";
import EgovPaging from "@/components/EgovPaging";
import { getSessionItem } from "@/utils/storage";
import "@/css/modern-styles.css";

/**
 * Base URLs
 */
const RAW_GET_BASE = import.meta.env.VITE_API_BASE || "http://3.39.231.225:8088";
const RAW_POST_BASE =
  import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://3.39.231.225:8088";
const GET_BASE = (RAW_GET_BASE || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

SyntaxHighlighter.registerLanguage("javascript", jsLang);
SyntaxHighlighter.registerLanguage("markdown", mdLang);

// const preview = 
// `
// # Servlet

// > **Servlet 이란**
// >
// > 클라이언트의 요청을 처리하고, 그 결과를 반환하는 
// > Servlet 클래스의 구현 규칙을 지킨 자바 웹 프로그래밍 기술

// 자바를 사용하여 웹을 만들기 위해 필요한 기술. 클라이언트가 어떠한 요청을 하면 그에 대한 결과를 다시 전송하기 위한 프로그램. 자바로 구현된 CGI .

// > **CGI(Common Gateway Interface)란?**
// >
// > 웹 서버와 프로그램간의 교환방식. (특별한 라이브러리나 도구를 의미하는 것 X)
// > 어떠한 프로그래밍언어로도 구현이가능.
// > 클라이언트의 HTTP요청에 대해 특정 기능을 수행하고, HTML 문서등 프로그램의 표준 출력 결과를 클라이언트에게 전송하는 것입니다.
// > 즉, 자바 어플리케이션 코딩을 하듯 웹 브라우저용 출력 화면을 만드는 방법입니다.

// ##  Servlet Container 역할

// > **Servlet Container**
// >
// > Servlet을 관리해주는 Container.
// >
// > 서버에 Servlet을 만들었다고 해서 스스로 작동하는 것이 아님. Servlet의 동작을 관리해주는 역할을 하는 것이 바로 Servlet Container. Servlet Container는 클라이언트의 요청(Request)을 받아주고 응답(Response)할 수 있게, 웹서버와 소켓으로 통신. 
// >
// > ex) 톰캣(Tomcat)
// >
// > 톰캣은 실제로 웹 서버와 통신하여 JSP와 Servlet이 작동하는 환경을 제공해줍니다.

// ### 웹 서버와의 통신 지원

// 일반적인 통신은 소켓을 만들고, 특정 port를 Listening 하고, 연결 요청이 들어오면 스트림을 생성해서 요청을 받는다. Servlet Container는 이런 통신 과정을 API 로 제공하고 있기 때문에 우리가 쉽게 사용할 수 있다.

// ### 생명주기(Life Cycle) 관리
// Servlet Container가 기동 시 Servlet Class를 로딩해서 인스턴스화하고, 초기화 메서드를 호출.
// 요청이 들어오면 적절한 Servlet 메소드를 찾아서 호출한다. 
// 만약 서블릿의 생명이 다하는 순간 가비지 컬렉션을 진행한다.

// ### 멀티스레드 지원 및 관리
// Servlet Container는 해당 Servlet의 요청이 들어오면 스레드를 생성해서 작업을 수행한다. 즉 동시의 여러 요청이 들어온다면 멀티스레딩 환경으로 동시다발적인 작업을 관리한다.

// ### 선언적 보안관리
// Servlet Container는 보안 관련된 기능을 지원한다. 따라서 서블릿 코드 안에 보안 관련된 메소드를 구현하지 않아도 된다.
// `




/**
 * 유틸: 안전한 날짜 포맷 (UTC 문자열 -> 로컬 시간)
 */
const formatKST = (isoLike) => {
  if (!isoLike) return "-";
  try {
    const d = new Date(isoLike);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch (e) {
    return isoLike;
  }
};

/**
 * 유틸: s3 경로에서 파일명만 추출
 */
const basename = (path) => (path ? path.split("/").pop() : "-");

/**
 * 개선된 변환 이력 조회 컴포넌트
 * - 검색(키워드)
 * - 날짜 범위 필터
 * - 정렬(저장일자 desc 기본)
 * - 페이지 크기 선택
 * - 다운로드 / 상세 / JobId 복사 액션
 * - 로딩 스켈레톤, 에러 배너, 빈 상태 UI
 */
export default function EgovSecurityDetectDetail() {
  const [all, setAll] = useState([]); // 원본
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(
`
# Servlet

> **Servlet 이란**
>
> 클라이언트의 요청을 처리하고, 그 결과를 반환하는 
> Servlet 클래스의 구현 규칙을 지킨 자바 웹 프로그래밍 기술

자바를 사용하여 웹을 만들기 위해 필요한 기술. 클라이언트가 어떠한 요청을 하면 그에 대한 결과를 다시 전송하기 위한 프로그램. 자바로 구현된 CGI .

> **CGI(Common Gateway Interface)란?**
>
> 웹 서버와 프로그램간의 교환방식. (특별한 라이브러리나 도구를 의미하는 것 X)
> 어떠한 프로그래밍언어로도 구현이가능.
> 클라이언트의 HTTP요청에 대해 특정 기능을 수행하고, HTML 문서등 프로그램의 표준 출력 결과를 클라이언트에게 전송하는 것입니다.
> 즉, 자바 어플리케이션 코딩을 하듯 웹 브라우저용 출력 화면을 만드는 방법입니다.

##  Servlet Container 역할

> **Servlet Container**
>
> Servlet을 관리해주는 Container.
>
> 서버에 Servlet을 만들었다고 해서 스스로 작동하는 것이 아님. Servlet의 동작을 관리해주는 역할을 하는 것이 바로 Servlet Container. Servlet Container는 클라이언트의 요청(Request)을 받아주고 응답(Response)할 수 있게, 웹서버와 소켓으로 통신. 
>
> ex) 톰캣(Tomcat)
>
> 톰캣은 실제로 웹 서버와 통신하여 JSP와 Servlet이 작동하는 환경을 제공해줍니다.

### 웹 서버와의 통신 지원

일반적인 통신은 소켓을 만들고, 특정 port를 Listening 하고, 연결 요청이 들어오면 스트림을 생성해서 요청을 받는다. Servlet Container는 이런 통신 과정을 API 로 제공하고 있기 때문에 우리가 쉽게 사용할 수 있다.

### 생명주기(Life Cycle) 관리
Servlet Container가 기동 시 Servlet Class를 로딩해서 인스턴스화하고, 초기화 메서드를 호출.
요청이 들어오면 적절한 Servlet 메소드를 찾아서 호출한다. 
만약 서블릿의 생명이 다하는 순간 가비지 컬렉션을 진행한다.

### 멀티스레드 지원 및 관리
Servlet Container는 해당 Servlet의 요청이 들어오면 스레드를 생성해서 작업을 수행한다. 즉 동시의 여러 요청이 들어온다면 멀티스레딩 환경으로 동시다발적인 작업을 관리한다.

### 선언적 보안관리
Servlet Container는 보안 관련된 기능을 지원한다. 따라서 서블릿 코드 안에 보안 관련된 메소드를 구현하지 않아도 된다.
`

  );

  // 필터/정렬 상태
  const [query, setQuery] = useState(""); // jobId, 파일명, 경로에 대해 포함 검색
  const [fromDate, setFromDate] = useState(""); // yyyy-mm-dd
  const [toDate, setToDate] = useState(""); // yyyy-mm-dd
  const [sortKey, setSortKey] = useState("savedAt");
  const [sortDir, setSortDir] = useState("desc");

  // 페이징 상태
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sessionUser = getSessionItem("loginUser");
  let jobId = location.state?.jobId;

  const fetchList = useCallback(async () => {
    if (!sessionUser?.id) return;
    setLoading(true);
    setError("");
    try {
      const retrieveListURL = `/agents/view/${sessionUser.id}/${jobId}/security/security_reports/report.json`;
      const requestOptions = { method: "GET", headers: { "Content-Type": "application/json" } };
      const data = await new Promise((resolve, reject) => {
        EgovNet.requestFetch(
          retrieveListURL,
          requestOptions,
          (resp) => resolve(resp),
          (err) => reject(err)
        );
      });

      
      const fileList = JSON.parse(data.resultMessage);
      console.log(fileList);

      const list = Array.isArray(fileList.files) ? fileList.files : [];
      // 저장일자 내림차순 기본 정렬
      // list.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
      setAll(list);
      setPage(1);
    } catch (e) {
      console.error(e);
      setError("이력을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [sessionUser?.id]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // 필터링 + 정렬된 목록
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate + "T23:59:59") : null;

    return all
      .filter((it) => {
        const hitQuery = !q
          ? true
          : (
              String(it.jobId || "").toLowerCase().includes(q) ||
              String(it.s3OriginPath || "").toLowerCase().includes(q) ||
              basename(it.s3OriginPath || "").toLowerCase().includes(q)
            );
        if (!hitQuery) return false;
        if (from || to) {
          const t = new Date(it.savedAt);
          if (from && t < from) return false;
          if (to && t > to) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        if (sortKey === "jobId") {
          return (a.jobId - b.jobId) * dir;
        }
        // savedAt 기본
        return (new Date(a.savedAt) - new Date(b.savedAt)) * dir;
      });
  }, [all, query, fromDate, toDate, sortKey, sortDir]);

  // 현재 페이지 슬라이싱
  const { pageItems, total } = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return { pageItems: filtered.slice(start, end), total: filtered.length };
  }, [filtered, page, pageSize]);

  // EgovPaging에 맞춘 정보
  const paginationInfo = useMemo(
    () => ({ currentPageNo: page, pageSize, recordCountPerPage: pageSize, totalRecordCount: total }),
    [page, pageSize, total]
  );

  const loadMarkdown = useCallback(async (fileName) => {
    if (!sessionUser?.id) return;
    try {
      const url = `${GET_BASE}/agents/view/${sessionUser.id}/${jobId}/security/security_reports/${fileName}`;
      const res = await fetch(url, { method: "GET" });
      
      const text = await res.text();
      setPreview(text);
      // if (presigned) {
      //   window.location.href = presigned;
      // } else {
      //   alert("다운로드 URL을 받지 못했습니다.");
      // }
    } catch (e) {
      console.error(e);
      alert("다운로드 중 오류가 발생했습니다.");
    }
  }, [sessionUser?.id]);

  // 액션: 프리사인 URL 받아 다운로드
  const handleDownload = useCallback(async (jobId) => {
    if (!sessionUser?.id) return;
    try {
      const url = `${GET_BASE}/download/${sessionUser.id}/${jobId}`;
      const res = await fetch(url, { method: "GET" });
      // 백엔드가 { url: "presigned" } 형태로 응답한다고 가정
      const data = await res.json();
      const presigned = data?.url || data?.presignedUrl || data?.location || data?.Location;
      if (presigned) {
        window.location.href = presigned;
      } else {
        alert("다운로드 URL을 받지 못했습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("다운로드 중 오류가 발생했습니다.");
    }
  }, [sessionUser?.id]);

  const copyJobId = (jobId) => navigator.clipboard.writeText(String(jobId));

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

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
            <Link to="/support" className="breadcrumb-link">AI 보안기</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">보안 취약점탐지</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNavSecurity />

          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                </div>
                <h1 className="hero-title">취약점 상세보기</h1>
                <p className="hero-description">
                  AI가 분석한 <strong>보안 취약점</strong>을 확인할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Data Section */}
            <section className="content-section modern-card">
              <div className="card-content">

                {error && (
                  <div className="error-alert">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    {error}
                  </div>
                )}

                {/* Data Table */}
                <div className="table-wrapper two-pane">
                  <section className="content-section modern-card">
                    {/* 좌측: Markdown 미리보기 (4) */}
                    <div className="pane-md markdown-body">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ inline, className, children }) {
                            const m = /language-(\w+)/.exec(className || "");
                            return !inline && m ? (
                              <SyntaxHighlighter
                                style={github}
                                language={m[1]}
                                PreTag="div"
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className}>{children}</code>
                            );
                          },
                        }}
                      >
                        {preview}
                      </ReactMarkdown>
                    </div>
                  </section>


                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th className="table-header">파일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Loading State */}
                      {loading ? (
                        Array.from({ length: pageSize }).map((_, i) => (
                          <tr key={i} className="skeleton-row">
                            <td><div className="skeleton-item"></div></td>
                            <td><div className="skeleton-item"></div></td>
                            <td><div className="skeleton-item"></div></td>
                            <td><div className="skeleton-item"></div></td>
                            <td><div className="skeleton-item"></div></td>
                          </tr>
                        ))
                      ) : pageItems.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="empty-state">
                            <div className="empty-content">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                              </svg>
                              <p>검색된 결과가 없습니다.</p>
                              <span>다른 검색 조건을 시도해보세요.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        /* Data Rows */
                        pageItems.map((item, idx) => (
                          <tr key={idx} className="table-row">
                            <td>
                              <button 
                              onClick={() => loadMarkdown(item)}
                              className="table-cell w_full" 
                              style={{background:"#ffffff"}}>{item}</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="pagination-container">
                <EgovPaging
                  pagination={paginationInfo}
                  moveToPage={(pageNum) => {
                    setPage(pageNum);
                  }}
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`

        /* 부모 컨테이너: 가로 배치 */
        .two-pane {
          display: flex;
          gap: 16px;
          align-items: flex-start; /* 위쪽 정렬 */
        }

        /* 좌측: 넓게 (예: 4) */
        .two-pane .pane-md {
          flex: 4 1 0;
          min-width: 0; /* 긴 텍스트 잘림 방지 */
        }

        /* 우측: 좁게 (예: 1) */
        .two-pane .pane-table {
          flex: 1 1 0;
          min-width: 280px; /* 최소 폭 보장 */
          overflow-x: auto; /* 테이블이 넘칠 때 스크롤 */
        }

        /* 반응형: 화면 좁아지면 세로 배치 */
        @media (max-width: 1024px) {
          .two-pane {
            flex-direction: column;
          }
        }
          
        .markdown-body {
          padding:0.5em;
        }

        .markdown-body p {
          margin: 0.5em 0;
          line-height: 1.6;
        }

        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3 {
          margin: 1.2em 0 0.6em;
          font-weight: bold;
        }

        .markdown-body ul,
        .markdown-body ol {
          margin: 0.8em 0;
          padding-left: 1.5em;
        }

        .markdown-body code {
          background: #f5f5f5;
          padding: 2px 4px;
          border-radius: 4px;
        }

        /* Modern Page Styles */
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

        .card-content {
          padding: 0rem;
        }

        /* Filter Controls */
        .filter-controls {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
        }

        .search-input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          width: 20px;
          height: 20px;
          color: var(--gray-400);
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-lg);
          font-size: 0.95rem;
          background: white;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
        }

        .filter-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .date-input,
        .select-input {
          padding: 0.75rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-lg);
          font-size: 0.95rem;
          background: white;
          transition: all 0.2s ease;
        }

        .date-input:focus,
        .select-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: var(--border-radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .refresh-btn:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .refresh-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Error Alert */
        .error-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: var(--border-radius-lg);
          color: #DC2626;
          margin-bottom: 1.5rem;
        }

        .error-alert svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* Modern Table */
        .modern-table-container {
          border-radius: var(--border-radius-xl);
          overflow: hidden;
          border: 1px solid var(--gray-200);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .modern-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .table-header {
          background: linear-gradient(135deg, 
            rgba(0, 0, 255, 0.05) 0%, 
            rgba(255, 255, 255, 1) 100%);
          padding: 1rem 1.5rem;
          text-align: left;
          font-weight: 600;
          color: var(--gray-900);
          border-bottom: 1px solid var(--gray-200);
          position: relative;
        }

        .table-header.sortable {
          cursor: pointer;
          user-select: none;
          transition: background 0.2s ease;
        }

        .table-header.sortable:hover {
          background: rgba(0, 0, 255, 0.08);
        }

        .table-header.sortable {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sort-icon {
          width: 16px;
          height: 16px;
          color: var(--primary-blue);
          transition: transform 0.2s ease;
        }

        .sort-icon.asc {
          transform: rotate(180deg);
        }

        .table-row {
          transition: all 0.2s ease;
        }

        .table-row:hover {
          background: var(--light-blue);
        }

        .table-cell {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--gray-100);
          vertical-align: middle;
        }

        /* Job ID Cell */
        .job-id-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .job-id {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          color: var(--primary-blue);
          font-weight: 600;
        }

        .copy-btn {
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

        .copy-btn:hover {
          background: var(--gray-50);
          color: var(--primary-blue);
          border-color: var(--primary-blue);
        }

        .copy-btn svg {
          width: 14px;
          height: 14px;
        }

        /* File Name Cell */
        .file-name {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-name svg {
          width: 20px;
          height: 20px;
          color: var(--gray-400);
          flex-shrink: 0;
        }

        .file-name span {
          font-weight: 500;
          color: var(--gray-700);
        }

        /* Date Cell */
        .date-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .date-cell svg {
          width: 18px;
          height: 18px;
          color: var(--gray-400);
          flex-shrink: 0;
        }

        .date-cell span {
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        /* Action Cell */
        .action-cell {
          display: flex;
          justify-content: center;
        }

        .detail-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--primary-blue);
          color: white;
          text-decoration: none;
          border-radius: var(--border-radius-md);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .detail-btn:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .detail-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Loading States */
        .skeleton-row td {
          padding: 1rem 1.5rem;
        }

        .skeleton-item {
          height: 20px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Empty State */
        .empty-state {
          padding: 3rem 1.5rem;
          text-align: center;
        }

        .empty-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--gray-500);
        }

        .empty-content svg {
          width: 48px;
          height: 48px;
          color: var(--gray-300);
        }

        .empty-content p {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-600);
        }

        .empty-content span {
          font-size: 0.875rem;
        }

        /* Pagination */
        .pagination-container {
          display: flex;
          justify-content: center;
          padding-top: 2rem;
          border-top: 1px solid var(--gray-200);
          margin-top: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .filter-controls {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .filter-group {
            flex-wrap: wrap;
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

          .filter-controls {
            padding: 1rem;
          }

          .table-cell {
            padding: 0.75rem 1rem;
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

          .filter-controls {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

