import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import EgovPaging from "@/components/EgovPaging";
import { getSessionItem } from "@/utils/storage";
import "@/css/modern-styles.css";

/**
 * Base URLs
 */
const RAW_GET_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8088";
const RAW_POST_BASE =
  import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://localhost:8088";
const GET_BASE = (RAW_GET_BASE || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

/** 날짜 포맷 (로컬) */
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
  } catch {
    return isoLike;
  }
};

/** s3 경로 -> 파일명 */
const basename = (path) => (path ? path.split("/").pop() : "-");

/** convVoReport에서 evaluation.S들을 추출해 평균 정확도(0~1) 반환 */
function getAccuracy(item) {
  // 1) 상위에 직접 evaluation.S가 있을 수도 있음
  const direct = item?.evaluation?.S;
  if (typeof direct === "number" && isFinite(direct)) return direct;

  // 2) convVoReport 배열 내부 탐색
  const reports = item?.convVoReport;
  if (!Array.isArray(reports)) return null;

  const scores = [];
  for (const entry of reports) {
    if (entry && typeof entry === "object") {
      // 각 엔트리는 {"ClassName": { evaluation: {...} }} 형태
      const key = Object.keys(entry)[0];
      const ev = key && entry[key]?.evaluation;
      const s = ev?.S;
      if (typeof s === "number" && isFinite(s)) scores.push(s);
    }
  }
  if (scores.length === 0) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

const formatPercent = (v) =>
  typeof v === "number" && isFinite(v) ? `${Math.round(v * 100)}%` : "-";

/** 정확도 브레이크다운(툴팁용) */
function getAccuracyBreakdown(item) {
  const reports = item?.convVoReport;
  if (!Array.isArray(reports) || reports.length === 0) return "";
  const parts = [];
  for (const entry of reports) {
    const key = Object.keys(entry || {})[0];
    if (!key) continue;
    const s = entry[key]?.evaluation?.S;
    if (typeof s === "number" && isFinite(s)) {
      parts.push(`${key}: ${Math.round(s * 100)}%`);
    }
  }
  return parts.join(", ");
}

/**
 * 변환 이력 조회
 */
export default function EgovSupportViewTransformation() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 필터/정렬
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortKey, setSortKey] = useState("savedAt");
  const [sortDir, setSortDir] = useState("desc");

  // 페이징
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sessionUser = getSessionItem("loginUser");

  const fetchList = useCallback(async () => {
    if (!sessionUser?.id) return;
    setLoading(true);
    setError("");
    try {
      const retrieveListURL = `/agents/records/${sessionUser.id}`;
      const requestOptions = { method: "GET", headers: { "Content-Type": "application/json" } };
      const data = await new Promise((resolve, reject) => {
        EgovNet.requestFetch(
          retrieveListURL,
          requestOptions,
          (resp) => resolve(resp),
          (err) => reject(err)
        );
      });

      const list = Array.isArray(data) ? data : [];
      // 저장일자 내림차순 기본
      list.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
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

  // 필터 + 정렬
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate + "T23:59:59") : null;

    return all
      .filter((it) => {
        const hitQuery = !q
          ? true
          : String(it.jobId || "").toLowerCase().includes(q) ||
            String(it.s3OriginPath || "").toLowerCase().includes(q) ||
            basename(it.s3OriginPath || "").toLowerCase().includes(q);
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
        if (sortKey === "accuracy") {
          const av = getAccuracy(a);
          const bv = getAccuracy(b);
          const an = typeof av === "number" ? av : -1; // null은 맨뒤
          const bn = typeof bv === "number" ? bv : -1;
          return (an - bn) * dir;
        }
        // savedAt 기본
        return (new Date(a.savedAt) - new Date(b.savedAt)) * dir;
      });
  }, [all, query, fromDate, toDate, sortKey, sortDir]);

  // 페이지 슬라이스
  const { pageItems, total } = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return { pageItems: filtered.slice(start, end), total: filtered.length };
  }, [filtered, page, pageSize]);

  const paginationInfo = useMemo(
    () => ({ currentPageNo: page, pageSize, recordCountPerPage: pageSize, totalRecordCount: total }),
    [page, pageSize, total]
  );

  // 다운로드
  const handleDownload = useCallback(
    async (jobId) => {
      if (!sessionUser?.id) return;
      try {
        const url = `${GET_BASE}/download/${sessionUser.id}/${jobId}`;
        const res = await fetch(url, { method: "GET" });
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
    },
    [sessionUser?.id]
  );

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
        {/* Breadcrumb */}
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
            <span className="breadcrumb-current">변환 이력 조회</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNavTransform />

          <main className="modern-content" id="contents">
            {/* Hero */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <h1 className="hero-title">변환 이력 조회</h1>
                <p className="hero-description">
                  AI 변환기로 처리된 파일들의 변환 이력을 조회하고 상세 정보를 확인할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Data */}
            <section className="content-section modern-card">
              <div className="card-content">
                {/* Filters */}
                <div className="filter-controls">
                  <div className="search-input-group">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="JobId 또는 파일명으로 검색..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="filter-group">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="date-input"
                      placeholder="시작일"
                    />
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="date-input"
                      placeholder="종료일"
                    />
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="select-input"
                    >
                      <option value={10}>10개씩 보기</option>
                      <option value={20}>20개씩 보기</option>
                      <option value={50}>50개씩 보기</option>
                    </select>
                    <button className="refresh-btn" onClick={() => fetchList()}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23,4 23,10 17,10"></polyline>
                        <polyline points="1,20 1,14 7,14"></polyline>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                      </svg>
                      새로고침
                    </button>
                  </div>
                </div>

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

                {/* Table */}
                <div className="modern-table-container">
                  <div className="table-wrapper">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th className="table-header">번호</th>
                          <th className="table-header sortable" onClick={() => toggleSort("jobId")}>
                            <span>JobId</span>
                            {sortKey === "jobId" && (
                              <svg className={`sort-icon ${sortDir === "asc" ? "asc" : "desc"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6,9 12,15 18,9"></polyline>
                              </svg>
                            )}
                          </th>
                          <th className="table-header">원본 파일</th>
                          <th className="table-header sortable" onClick={() => toggleSort("savedAt")}>
                            <span>저장 일자</span>
                            {sortKey === "savedAt" && (
                              <svg className={`sort-icon ${sortDir === "asc" ? "asc" : "desc"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6,9 12,15 18,9"></polyline>
                              </svg>
                            )}
                          </th>

                          {/* ✅ 추가: 정확도 */}
                          <th className="table-header sortable" onClick={() => toggleSort("accuracy")}>
                            <span>정확도</span>
                            {sortKey === "accuracy" && (
                              <svg className={`sort-icon ${sortDir === "asc" ? "asc" : "desc"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6,9 12,15 18,9"></polyline>
                              </svg>
                            )}
                          </th>

                          <th className="table-header">동작</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Loading */}
                        {loading ? (
                          Array.from({ length: pageSize }).map((_, i) => (
                            <tr key={i} className="skeleton-row">
                              <td><div className="skeleton-item"></div></td>
                              <td><div className="skeleton-item"></div></td>
                              <td><div className="skeleton-item"></div></td>
                              <td><div className="skeleton-item"></div></td>
                              <td><div className="skeleton-item"></div></td>
                              <td><div className="skeleton-item"></div></td>
                            </tr>
                          ))
                        ) : pageItems.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="empty-state">
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
                          pageItems.map((item, idx) => {
                            const acc = getAccuracy(item);
                            const pct = typeof acc === "number" ? Math.round(acc * 100) : null;
                            const breakdown = getAccuracyBreakdown(item);
                            return (
                              <tr key={item.jobId} className="table-row">
                                <td className="table-cell">{(page - 1) * pageSize + idx + 1}</td>
                                <td className="table-cell">
                                  <div className="job-id-cell">
                                    <span className="job-id" title={String(item.jobId)}>{item.jobId}</span>
                                    <button
                                      className="copy-btn"
                                      onClick={() => copyJobId(item.jobId)}
                                      title="JobId 복사"
                                    >
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                                <td className="table-cell">
                                  <div className="file-name" title={item.s3OriginPath}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                      <polyline points="14,2 14,8 20,8"></polyline>
                                      <line x1="16" y1="13" x2="8" y2="13"></line>
                                      <line x1="16" y1="17" x2="8" y2="17"></line>
                                      <polyline points="10,9 9,9 8,9"></polyline>
                                    </svg>
                                    <span>{basename(item.s3OriginPath)}</span>
                                  </div>
                                </td>
                                <td className="table-cell">
                                  <div className="date-cell">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{formatKST(item.savedAt)}</span>
                                  </div>
                                </td>

                                {/* ✅ 정확도 셀 */}
                                <td className="table-cell">
                                  <div className="accuracy-cell" title={breakdown || ""}>
                                    <div className="accuracy-pill">{formatPercent(acc)}</div>
                                    <div className="accuracy-track" aria-label="accuracy">
                                      <div
                                        className="accuracy-fill"
                                        style={{ width: pct != null ? `${pct}%` : "0%" }}
                                      />
                                    </div>
                                  </div>
                                </td>

                                <td className="table-cell">
                                  <div className="action-cell">
                                    <Link
                                      to={{ pathname: URL.SUPPORT_TRANSFORM_VIEW_TRANSFORMAITON_DETAIL }}
                                      state={{ jobId: item.jobId }}
                                      className="detail-btn"
                                      title="상세 보기"
                                    >
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                      </svg>
                                      상세 보기
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
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
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* 기존 스타일 ... (생략 없음, 그대로 유지) */

        .modern-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(0, 0, 255, 0.02) 0%, rgba(255, 255, 255, 0.8) 100%);
        }
        .modern-page-wrapper { max-width: 1440px; margin: 0 auto; padding: 2rem; }
        .modern-breadcrumb { margin-bottom: 2rem; }
        .breadcrumb-container { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; }
        .breadcrumb-home, .breadcrumb-link { display: flex; align-items: center; gap: 0.5rem; color: var(--gray-600); text-decoration: none; padding: 0.5rem 0.75rem; border-radius: var(--border-radius-md); transition: all 0.2s ease; }
        .breadcrumb-home:hover, .breadcrumb-link:hover { background: var(--light-blue); color: var(--primary-blue); }
        .breadcrumb-home svg, .breadcrumb-separator { width: 16px; height: 16px; }
        .breadcrumb-current { color: var(--primary-blue); font-weight: 600; }

        .modern-layout { display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: start; }
        .modern-content { display: flex; flex-direction: column; gap: 2rem; }

        .content-hero { text-align: center; padding: 3rem 0; }
        .hero-content { max-width: 600px; margin: 0 auto; }
        .hero-icon { width: 80px; height: 80px; margin: 0 auto 1.5rem; background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue)); border-radius: var(--border-radius-2xl); display: flex; align-items: center; justify-content: center; color: white; box-shadow: var(--shadow-xl); }
        .hero-icon svg { width: 40px; height: 40px; }
        .hero-title { margin: 0 0 1rem; font-size: 2.5rem; font-weight: 700; color: var(--gray-900); background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-description { margin: 0; font-size: 1.125rem; color: var(--gray-600); line-height: 1.6; }

        .content-section { background: white; border-radius: var(--border-radius-2xl); border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm); overflow: hidden; }
        .card-content { padding: 2rem; }

        .filter-controls { display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; margin-bottom: 2rem; padding: 1.5rem; background: var(--gray-50); border-radius: var(--border-radius-xl); border: 1px solid var(--gray-200); }
        .search-input-group { position: relative; display: flex; align-items: center; }
        .search-icon { position: absolute; left: 1rem; width: 20px; height: 20px; color: var(--gray-400); z-index: 1; }
        .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border: 1px solid var(--gray-300); border-radius: var(--border-radius-lg); font-size: 0.95rem; background: white; transition: all 0.2s ease; }
        .search-input:focus { outline: none; border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1); }
        .filter-group { display: flex; gap: 0.75rem; align-items: center; }
        .date-input, .select-input { padding: 0.75rem 1rem; border: 1px solid var(--gray-300); border-radius: var(--border-radius-lg); font-size: 0.95rem; background: white; transition: all 0.2s ease; }
        .date-input:focus, .select-input:focus { outline: none; border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1); }
        .refresh-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: var(--primary-blue); color: white; border: none; border-radius: var(--border-radius-lg); font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
        .refresh-btn:hover { background: var(--dark-blue); transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .refresh-btn svg { width: 16px; height: 16px; }

        .error-alert { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--border-radius-lg); color: #DC2626; margin-bottom: 1.5rem; }
        .error-alert svg { width: 20px; height: 20px; flex-shrink: 0; }

        .modern-table-container { border-radius: var(--border-radius-xl); overflow: hidden; border: 1px solid var(--gray-200); }
        .table-wrapper { overflow-x: auto; }
        .modern-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
        .table-header { background: linear-gradient(135deg, rgba(0, 0, 255, 0.05) 0%, rgba(255, 255, 255, 1) 100%); padding: 1rem 1.5rem; text-align: left; font-weight: 600; color: var(--gray-900); border-bottom: 1px solid var(--gray-200); position: relative; }
        .table-header.sortable { cursor: pointer; user-select: none; transition: background 0.2s ease; display: flex; align-items: center; justify-content: space-between; }
        .table-header.sortable:hover { background: rgba(0, 0, 255, 0.08); }
        .sort-icon { width: 16px; height: 16px; color: var(--primary-blue); transition: transform 0.2s ease; }
        .sort-icon.asc { transform: rotate(180deg); }
        .table-row { transition: all 0.2s ease; }
        .table-row:hover { background: var(--light-blue); }
        .table-cell { padding: 1rem 1.5rem; border-bottom: 1px solid var(--gray-100); vertical-align: middle; }
        .job-id-cell { display: flex; align-items: center; gap: 0.75rem; }
        .job-id { font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 0.875rem; color: var(--primary-blue); font-weight: 600; }
        .copy-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--gray-300); border-radius: var(--border-radius-md); background: white; color: var(--gray-500); cursor: pointer; transition: all 0.2s ease; }
        .copy-btn:hover { background: var(--gray-50); color: var(--primary-blue); border-color: var(--primary-blue); }
        .copy-btn svg { width: 14px; height: 14px; }
        .file-name { display: flex; align-items: center; gap: 0.75rem; }
        .file-name svg { width: 20px; height: 20px; color: var(--gray-400); flex-shrink: 0; }
        .file-name span { font-weight: 500; color: var(--gray-700); }
        .date-cell { display: flex; align-items: center; gap: 0.75rem; }
        .date-cell svg { width: 18px; height: 18px; color: var(--gray-400); flex-shrink: 0; }
        .date-cell span { color: var(--gray-600); font-size: 0.875rem; }

        /* ✅ 정확도 UI */
        .accuracy-cell { display: flex; flex-direction: column; gap: 0.5rem; min-width: 140px; }
        .accuracy-pill { display: inline-flex; align-items: center; justify-content: center; padding: 0.25rem 0.5rem; font-weight: 600; border-radius: 999px; border: 1px solid var(--gray-200); background: #fff; width: max-content; }
        .accuracy-track { position: relative; width: 100%; height: 8px; background: var(--gray-100); border-radius: 999px; overflow: hidden; }
        .accuracy-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue)); transition: width 300ms ease; }

        .action-cell { display: flex; justify-content: center; }
        .detail-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--primary-blue); color: white; text-decoration: none; border-radius: var(--border-radius-md); font-weight: 500; transition: all 0.2s ease; }
        .detail-btn:hover { background: var(--dark-blue); transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .detail-btn svg { width: 16px; height: 16px; }

        .skeleton-row td { padding: 1rem 1.5rem; }
        .skeleton-item { height: 20px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; border-radius: 4px; animation: loading 1.5s infinite; }
        @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .empty-state { padding: 3rem 1.5rem; text-align: center; }
        .empty-content { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: var(--gray-500); }
        .empty-content svg { width: 48px; height: 48px; color: var(--gray-300); }
        .empty-content p { margin: 0; font-size: 1.125rem; font-weight: 600; color: var(--gray-600); }
        .empty-content span { font-size: 0.875rem; }

        .pagination-container { display: flex; justify-content: center; padding-top: 2rem; border-top: 1px solid var(--gray-200); margin-top: 2rem; }

        @media (max-width: 1024px) {
          .modern-layout { grid-template-columns: 1fr; gap: 1.5rem; }
          .filter-controls { grid-template-columns: 1fr; gap: 1rem; }
          .filter-group { flex-wrap: wrap; }
        }
        @media (max-width: 768px) {
          .modern-page-wrapper { padding: 1rem; }
          .hero-title { font-size: 2rem; }
          .card-content { padding: 1.5rem; }
          .filter-controls { padding: 1rem; }
          .table-cell { padding: 0.75rem 1rem; }
        }
        @media (max-width: 640px) {
          .hero-title { font-size: 1.75rem; }
          .hero-description { font-size: 1rem; }
          .card-content { padding: 1rem; }
          .filter-controls { padding: 0.75rem; }
        }
      `}</style>
    </div>
  );
}
