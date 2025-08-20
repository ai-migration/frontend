import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";
import { getSessionItem } from "@/utils/storage";
import "@/css/modern-styles.css";

function EgovAdminFaqList(props) {
  console.group("EgovAdminFaqList");
  console.log("[Start] EgovAdminFaqList ------------------------------");
  console.log("EgovAdminFaqList [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovAdminFaqList [location] : ", location);

  const cndRef = useRef();
  const wrdRef = useRef();

  //관리자 권한 체크때문에 추가(아래)
  const sessionUser = getSessionItem("loginUser");
  const sessionUserSe = sessionUser?.userSe;

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
  const [openSet, setOpenSet] = useState(new Set());
  const [paginationInfo, setPaginationInfo] = useState({  // 페이징 정보 직접 구성
    currentPageNo: 1,
    pageSize: 10,
    recordCountPerPage: 10,
    totalRecordCount: 0,
  });

  const toggleContent = (postId) => {
    setOpenSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const retrieveList = useCallback((pageIndex = 1) => {
    console.groupCollapsed("EgovAdminFaqList.retrieveList()");

    const retrieveListURL = "/posts?type=faq";
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

        setAllList(resultList); // 전체 리스트 저장
      },
      function (errResp) {
        console.error("Error fetching data:", errResp);
      }
    );

    console.groupEnd("EgovAdminFaqList.retrieveList()");
  }, [searchCondition]);

  useEffect(() => {
    retrieveList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminFaqList [End]");
  console.groupEnd("EgovAdminFaqList");
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
            <span className="breadcrumb-current">FAQ관리</span>
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h1 className="hero-title">FAQ관리</h1>
                <p className="hero-description">
                  자주 묻는 질문을 관리하고 새로운 FAQ를 등록할 수 있습니다.
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
                        to={URL.ADMIN_FAQ_CREATE}
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

                {/* FAQ List */}
                <div className="faq-list-container">
                  {allList
                    .slice(
                      (paginationInfo.currentPageNo - 1) * paginationInfo.recordCountPerPage,
                      paginationInfo.currentPageNo * paginationInfo.recordCountPerPage
                    )
                    .map((item, index) => {
                      const listIdx =
                        index + 1 + (paginationInfo.currentPageNo - 1) * paginationInfo.pageSize;
                      return (
                        <div key={item.postId} className="faq-item">
                          <div className="faq-header" onClick={() => toggleContent(item.postId)}>
                            <div className="faq-number">{listIdx}</div>
                            <div className="faq-title">{item.title}</div>
                            <div className="faq-actions">
                              <button
                                type="button"
                                className="action-button secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(URL.ADMIN_FAQ_MODIFY, {
                                    state: { postId: item.postId, mode: CODE.MODE_MODIFY },
                                  });
                                }}
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                수정
                              </button>
                              <div className={`faq-toggle ${openSet.has(item.postId) ? 'expanded' : ''}`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                              </div>
                            </div>
                          </div>
                          {openSet.has(item.postId) && (
                            <div className="faq-content">
                              <div className="faq-answer">{item.content}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  
                  {allList.length === 0 && (
                    <div className="empty-state">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                      </svg>
                      <span>등록된 FAQ가 없습니다.</span>
                    </div>
                  )}
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

        .action-button.secondary {
          background: var(--gray-50);
          color: var(--gray-700);
          border-color: var(--gray-300);
        }

        .action-button.secondary:hover {
          background: var(--light-blue);
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }

        .action-button svg {
          width: 16px;
          height: 16px;
        }

        /* FAQ List */
        .faq-list-container {
          margin-bottom: 1.5rem;
        }

        .faq-item {
          border: 1px solid var(--gray-200);
          border-radius: var(--border-radius-lg);
          margin-bottom: 1rem;
          overflow: hidden;
          background: white;
          transition: all 0.2s ease;
        }

        .faq-item:hover {
          border-color: var(--primary-blue);
          box-shadow: var(--shadow-md);
        }

        .faq-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          cursor: pointer;
          background: var(--gray-50);
          transition: all 0.2s ease;
        }

        .faq-header:hover {
          background: var(--light-blue);
        }

        .faq-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-blue);
          color: white;
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .faq-title {
          flex: 1;
          font-weight: 600;
          color: var(--gray-900);
          font-size: 1rem;
        }

        .faq-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .faq-toggle {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--gray-300);
          border-radius: 50%;
          background: white;
          transition: all 0.2s ease;
        }

        .faq-toggle.expanded {
          transform: rotate(180deg);
          border-color: var(--primary-blue);
          background: var(--light-blue);
        }

        .faq-toggle svg {
          width: 16px;
          height: 16px;
          color: var(--gray-600);
        }

        .faq-toggle.expanded svg {
          color: var(--primary-blue);
        }

        .faq-content {
          padding: 1.5rem;
          border-top: 1px solid var(--gray-200);
          background: white;
        }

        .faq-answer {
          color: var(--gray-700);
          line-height: 1.6;
          font-size: 0.95rem;
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

          .faq-header {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .faq-actions {
            justify-content: space-between;
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

          .faq-header {
            padding: 1rem;
          }

          .faq-content {
            padding: 1rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

          .faq-number {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }

          .faq-title {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAdminFaqList;
