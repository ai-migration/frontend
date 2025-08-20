import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { NOTICE_BBS_ID } from "@/config";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";
import { getSessionItem } from "@/utils/storage";
import "@/css/modern-styles.css";

function EgovAdminNoticeList(props) {
  console.group("EgovAdminNoticeList");
  console.log("[Start] EgovAdminNoticeList ------------------------------");
  console.log("EgovAdminNoticeList [props] : ", props);

  const location = useLocation();
  console.log("EgovAdminNoticeList [location] : ", location);

  const cndRef = useRef();
  const wrdRef = useRef();

  //관리자 권한 체크때문에 추가(아래)
  const sessionUser = getSessionItem("loginUser");
  const sessionUserSe = sessionUser?.userSe;

  // const bbsId = location.state?.bbsId || NOTICE_BBS_ID;

  // eslint-disable-next-line no-unused-vars
  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || {
      // bbsId: bbsId,
      pageIndex: 1,
      searchCnd: "0",
      searchWrd: "",
    }
  ); // 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  // const [masterBoard, setMasterBoard] = useState({});
  const [user, setUser] = useState({});
  const [allList, setAllList] = useState([]);             // 전체 리스트 원본
  const [listTag, setListTag] = useState([]);             // 현재 페이지에 보여줄 리스트
  const [paginationInfo, setPaginationInfo] = useState({  // 페이징 정보 직접 구성
    currentPageNo: 1,
    pageSize: 10,
    recordCountPerPage: 10,
    totalRecordCount: 0,
  });


  const retrieveList = useCallback((pageIndex = 1) => {
    console.groupCollapsed("EgovAdminNoticeList.retrieveList()");

    const retrieveListURL = "/posts?type=notice";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        const resultList = resp; // 전체 리스트가 반환됨

        const totalRecordCount = resultList.length;
        const pageSize = 10;
        const recordCountPerPage = 10;
        const currentPageNo = pageIndex;

        // 인덱스 계산
        const startIndex = (currentPageNo - 1) * recordCountPerPage;
        const endIndex = startIndex + recordCountPerPage;
        const slicedList = resultList.slice(startIndex, endIndex);

        // 페이징 정보 구성
        setPaginationInfo({
          currentPageNo,
          pageSize,
          recordCountPerPage,
          totalRecordCount,
        });

        // 리스트 렌더링
        let mutListTag = [];
        if (slicedList.length === 0) {
          mutListTag.push(
            <p className="no_data" key="0">검색된 결과가 없습니다.</p>
          );
        } else {
          slicedList.forEach((item, index) => {
            mutListTag.push(
              <Link
                to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                state={{
                  postId: item.postId,
                  searchCondition: searchCondition,
                }}
                key={item.postId}
                className="list_item"
              >
                <div>{item.postId}</div>
                <div className="al">{item.title}</div>
                <div>{item.frstRegisterNm || "관리자"}</div>
                <div>{item.createdAt.substring(0, 10)}</div>
                <div>{item.viewCount}</div>
              </Link>
            );
          });
        }

        setAllList(resultList); // 전체 리스트 저장
        setListTag(mutListTag);
      },
      function (errResp) {
        console.error("Error fetching data:", errResp);
      }
    );

    console.groupEnd("EgovAdminNoticeList.retrieveList()");
  }, [searchCondition]);

  useEffect(() => {
    retrieveList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminNoticeList [End]");
  console.groupEnd("EgovAdminNoticeList");
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
            <Link to={URL.INFORM} className="breadcrumb-link">사이트관리</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">공지사항관리</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNav />
          
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
                  </svg>
                </div>
                <h1 className="hero-title">공지사항관리</h1>
                <p className="hero-description">
                  사이트의 공지사항을 관리하고 새로운 공지를 등록할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section className="content-section modern-card">
              <div className="card-content">
                {/* Search and Actions */}
                <div className="search-actions-bar">
                  <div className="search-section">
                    <div className="search-controls">
                      <select
                        className="search-select"
                        defaultValue={searchCondition.searchCnd}
                        ref={cndRef}
                        onChange={(e) => {
                          cndRef.current.value = e.target.value;
                        }}
                      >
                        <option value="0">제목</option>
                        <option value="1">내용</option>
                        <option value="2">작성자</option>
                      </select>
                      <div className="search-input-group">
                        <input
                          type="text"
                          className="search-input"
                          defaultValue={searchCondition.searchWrd}
                          placeholder="검색어를 입력하세요"
                          ref={wrdRef}
                          onChange={(e) => {
                            wrdRef.current.value = e.target.value;
                          }}
                        />
                        <button
                          type="button"
                          className="search-button"
                          onClick={() => {
                            retrieveList({
                              ...searchCondition,
                              pageIndex: 1,
                              searchCnd: cndRef.current.value,
                              searchWrd: wrdRef.current.value,
                            });
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                          </svg>
                          조회
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {user && sessionUserSe === "ADM" && (
                    <div className="actions-section">
                      <Link
                        to={URL.INFORM_NOTICE_CREATE}
                        state={{ postId: null, mode: CODE.MODE_CREATE }}
                        className="action-button primary"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        등록
                      </Link>
                    </div>
                  )}
                </div>

                {/* Data Table */}
                <div className="data-table-container">
                  <div className="data-table">
                    <div className="table-header">
                      <div className="table-cell">번호</div>
                      <div className="table-cell">제목</div>
                      <div className="table-cell">작성자</div>
                      <div className="table-cell">작성일</div>
                      <div className="table-cell">조회수</div>
                    </div>
                    <div className="table-body">
                      {listTag.length > 0 ? (
                        listTag
                      ) : (
                        <div className="empty-state">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                          </svg>
                          <span>검색된 결과가 없습니다.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                  <EgovPaging
                    pagination={paginationInfo}
                    moveToPage={(pageNum) => {
                      retrieveList(pageNum);
                    }}
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Page Styles - Consistent with other pages */
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
          gap: 1.5rem;
        }

        .content-hero {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .hero-icon svg {
          width: 24px;
          height: 24px;
        }

        .hero-title {
          margin: 0 0 0.75rem;
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          margin: 0;
          font-size: 1rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        .content-section {
          background: white;
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .card-content {
          padding: 1.5rem;
        }

        /* Search and Actions Bar */
        .search-actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .search-section {
          flex: 1;
        }

        .search-controls {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .search-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md);
          background: white;
          font-size: 0.875rem;
          color: var(--gray-700);
          min-width: 100px;
        }

        .search-input-group {
          display: flex;
          gap: 0.5rem;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-button:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
        }

        .search-button svg {
          width: 16px;
          height: 16px;
        }

        .actions-section {
          display: flex;
          gap: 0.75rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--gray-700);
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-1px);
        }

        .action-button.primary {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        .action-button.primary:hover {
          background: var(--dark-blue);
          border-color: var(--dark-blue);
        }

        .action-button svg {
          width: 16px;
          height: 16px;
        }

        /* Data Table */
        .data-table-container {
          margin-bottom: 1.5rem;
        }

        .data-table {
          border: 1px solid var(--gray-200);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          background: white;
        }

        .table-header {
          display: grid;
          grid-template-columns: 80px 1fr 120px 120px 80px;
          background: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
        }

        .table-cell {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
          text-align: center;
        }

        .table-cell:first-child {
          text-align: center;
        }

        .table-body {
          max-height: 500px;
          overflow-y: auto;
        }

        .list_item {
          display: grid;
          grid-template-columns: 80px 1fr 120px 120px 80px;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--gray-700);
          border-bottom: 1px solid var(--gray-100);
          transition: all 0.2s ease;
        }

        .list_item:hover {
          background: var(--light-blue);
          color: var(--primary-blue);
        }

        .list_item:last-child {
          border-bottom: none;
        }

        .list_item > div {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }

        .list_item > div.al {
          justify-content: flex-start;
          text-align: left;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem;
          color: var(--gray-500);
        }

        .empty-state svg {
          width: 48px;
          height: 48px;
        }

        .empty-state span {
          font-size: 1rem;
          font-weight: 500;
        }

        /* Pagination */
        .pagination-container {
          display: flex;
          justify-content: center;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-200);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .search-actions-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .search-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input-group {
            max-width: none;
          }

          .table-header,
          .list_item {
            grid-template-columns: 60px 1fr 100px 100px 60px;
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .content-hero {
            padding: 1.5rem 0;
          }

          .hero-title {
            font-size: 1.625rem;
          }

          .card-content {
            padding: 1rem;
          }

          .table-header,
          .list_item {
            grid-template-columns: 50px 1fr 80px 80px 50px;
          }

          .table-cell,
          .list_item > div {
            font-size: 0.8rem;
            padding: 0.5rem 0.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

          .table-header,
          .list_item {
            grid-template-columns: 40px 1fr 70px 70px 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAdminNoticeList;
