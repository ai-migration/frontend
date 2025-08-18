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
export default function EgovSupportViewTransformation() {
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
            <h2 className="tit_2">변환 이력 조회</h2>

            <div className="board_view2">
            </div>
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
                      </div>

                      <div className="col-file" title={item.s3OriginPath}>
                        <span className="text-clip">{basename(item.s3OriginPath)}</span>
                      </div>

                      <div className="col-date">{formatKST(item.savedAt)}</div>

                      <div className="col-actions">
                        <Link
                          to={{ pathname: URL.SUPPORT_TRANSFORM_VIEW_TRANSFORMAITON_DETAIL }}
                          state={{ jobId: item.jobId }}
                          className="btn btn-primary"
                          title="상세 보기"
                        >
                          상세 보기
                        </Link>
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
    </div>
  );
}

