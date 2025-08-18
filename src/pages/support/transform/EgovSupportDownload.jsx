import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import EgovPaging from "@/components/EgovPaging";
import { getSessionItem } from "@/utils/storage";

/**
 * Base URLs
 */
const RAW_GET_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8088";
const RAW_POST_BASE =
  import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://localhost:8088";
const GET_BASE = (RAW_GET_BASE || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

// 그룹 라벨 ↔ API path 매핑
const DL_GROUPS = [
  // { key: "origin",      label: "원본" },
  // { key: "all",         label: "변환된 모든 파일" },
  { key: "controller",  label: "Controller" },
  { key: "service",     label: "Service" },
  { key: "serviceimpl", label: "ServiceImpl" },
  { key: "vo",          label: "VO" },
];

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
export default function EgovSupportDownload() {
  const [all, setAll] = useState([]); // 원본
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  
  // presigned 응답에서 URL 꺼내기
  const pickUrl = (data) => data?.url || data?.presignedUrl || data?.location || data?.Location;

  // 그룹별로 시도할 엔드포인트들 (백엔드 상황에 맞춰 폴백)
  const buildCandidateUrls = (userId, jobId, group) => {
    const base = `${GET_BASE}/agents/download/${userId}/${jobId}`;
    switch (group) {
      // case "origin":
      //   return [base, `${base}/origin`]; // 원본 ZIP
      // case "all":
      //   return [base, `${base}/all`]; // 전체 ZIP (기존 호환)
      case "controller":
        return [base, `${base}/conversion/controller`]; // Controller
      case "service":
        return [base, `${base}/conversion/service`]; // Service
      case "serviceimpl":
        return [base, `${base}/conversion/serviceImpl`]; // ServiceImpl
      case "vo":
        return [base, `${base}/conversion/vo`]; // vo
      default:
        return [base];
    }
  };


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
      // 저장일자 내림차순 기본 정렬
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

  // 액션: 프리사인 URL 받아 다운로드
  const handleDownload = useCallback(
    async (jobId, group = "all") => {
      if (!sessionUser?.id) return;
      const candidates = buildCandidateUrls(sessionUser.id, jobId, group);

      let presigned = null;
      let lastErr = null;

      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: "GET" });
          if (!res.ok) {
            lastErr = `HTTP ${res.status}`;
            continue;
          }
          const data = await res.json();
          // 서버 응답이 { path: "..." } 형태라고 가정
          presigned = data?.path || data?.url || data?.presignedUrl;
          if (presigned) break;
        } catch (e) {
          lastErr = String(e);
        }
      }

      if (!presigned) {
        alert(`다운로드 URL을 받지 못했습니다. (group=${group})\n${lastErr ?? ""}`);
        return;
      }

      // 다운로드 트리거: <a download> 속성 활용
      const a = document.createElement("a");
      a.href = presigned;
      a.download = ""; // 파일명은 presigned 응답 헤더(Content-Disposition) 따라감
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
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
    <div className="container">
      <div className="c_wrap">
        <div className="location">
          <ul>
            <li>
              <Link to="/" className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/support">AI 변환기</Link>
            </li>
            <li>변환 이력 조회</li>
          </ul>
        </div>

        <div className="layout">
          <EgovLeftNavTransform />

          <div className="contents SITE_GALLARY_VIEW" id="contents">
            <div className="top_tit">
              <h1 className="tit_1">AI 변환기</h1>
            </div>
            <h2 className="tit_2">변환 결과 다운로드</h2>

            <div className="board_view2">
            </div>
            {/* 필터 바 */}
            {/* <div className="board_view2" style={{ marginBottom: 12 }}>
              <div className="filter_bar" style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr auto auto auto auto" }}>
                <input
                  type="text"
                  placeholder="JobId/파일명 검색"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="f_input"
                />
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="f_input" />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="f_input" />
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="f_select">
                  <option value={10}>10개씩</option>
                  <option value={20}>20개씩</option>
                  <option value={50}>50개씩</option>
                </select>
                <button className="btn btn_skyblue_h46" onClick={() => fetchList()}>새로고침</button>
              </div>
              {error && (
                <div className="alert alert_danger" style={{ marginTop: 8 }}>
                  {error}
                </div>
              )}
            </div> */}
            <div className="board_list BRD002 long_date">
              {/* 헤더 */}
              <div className="row">
                <div className="col-no">번호</div>
                <button className="col-job th-sort" onClick={() => toggleSort("jobId")}>
                  JobId {sortKey === "jobId" && (sortDir === "asc" ? "▲" : "▼")}
                </button>
                <div className="col-file">원본 파일</div>
                <button className="col-date th-sort" onClick={() => toggleSort("savedAt")}>
                  저장 일자 {sortKey === "savedAt" && (sortDir === "asc" ? "▲" : "▼")}
                </button>
                <div className="col-actions">동작</div>
              </div>

              {/* 로딩/빈결과/리스트 */}
              {loading ? (
                <div className="result">
                  {Array.from({ length: pageSize }).map((_, i) => (
                    <div className="row skeleton-row" key={i}>
                      <div className="sk" /><div className="sk" /><div className="sk" />
                      <div className="sk" /><div className="sk" />
                    </div>
                  ))}
                </div>
              ) : pageItems.length === 0 ? (
                <div className="result"><p className="no_data">검색된 결과가 없습니다.</p></div>
              ) : (
                <div className="result">
                  {pageItems.map((item, idx) => (
                    <div className="row" key={item.jobId}>
                      <div className="col-no">{(page - 1) * pageSize + idx + 1}</div>

                      <div className="col-job mono" title={String(item.jobId)}>
                        <span className="text-clip">{item.jobId}</span>
                        {/* <button className="chip" onClick={() => copyJobId(item.jobId)} title="JobId 복사">
                          복사
                        </button> */}
                      </div>

                      <div className="col-file" title={item.s3OriginPath}>
                        <span className="text-clip">{basename(item.s3OriginPath)}</span>
                      </div>

                      <div className="col-date">{formatKST(item.savedAt)}</div>

                      <div className="col-actions">
                        {/* <Link
                          to={{ pathname: URL.SUPPORT_TRANSFORM_VIEW_TRANSFORMAITON_DETAIL }}
                          state={{ jobId: item.jobId }}
                          className="btn btn-primary"
                          title="상세 보기"
                        >
                          상세 보기
                        </Link> */}
                        {/* <button className="btn btn-outline" onClick={() => handleDownload(item.jobId)} title="결과 다운로드">
                          다운로드
                        </button> */}
                        <div className="col-actions">
                          <details className="dl-menu">
                            <summary className="btn btn-outline">다운로드</summary>
                            <div className="dl-menu-list">
                              {DL_GROUPS.map((g) => (
                                <button
                                  key={g.key}
                                  className="menu-item"
                                  onClick={() => handleDownload(item.jobId, g.key)}
                                  title={`${g.label} 다운로드`}
                                >
                                  {g.label}
                                </button>
                              ))}
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 페이징 */}
            <div className="board_bot">
              <EgovPaging
                pagination={paginationInfo}
                moveToPage={(pageNum) => {
                  setPage(pageNum);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .filter_bar .f_input, .filter_bar .f_select { height: 46px; padding: 0 12px; }
        .link { background: none; border: 0; font: inherit; cursor: pointer; }
        .skeleton { background: #f1f3f5; border-radius: 4px; animation: pulse 1.4s ease-in-out infinite; }
        @keyframes pulse { 0% { opacity: .6 } 50% { opacity: .3 } 100% { opacity: .6 } }
        .btn_light { height: 30px; padding: 0 8px; border: 1px solid #e1e1e1; border-radius: 6px; }
      `}
      
      
      </style>
      <style>{`
      .dl-menu { position: relative; display: inline-block; }
      .dl-menu > summary { list-style: none; cursor: pointer; }
      .dl-menu[open] > summary { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
      .dl-menu-list {
        position: absolute; right: 0; z-index: 20;
        min-width: 140px; padding: 6px; margin-top: 6px;
        background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,.08);
        display: grid; gap: 4px;
      }
      .dl-menu .menu-item {
        text-align: left; padding: 8px 10px; border: 0; background: transparent; cursor: pointer;
        border-radius: 6px;
      }
      .dl-menu .menu-item:hover { background: #f5f7fb; }
    `}</style>
    </div>
  );
}

