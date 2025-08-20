import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavInform";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";
import { getSessionItem } from "@/utils/storage";

import "@/css/modern-pages.css";

function EgovFaqList(props) {
  console.group("EgovFaqList");
  console.log("[Start] EgovFaqList ------------------------------");
  console.log("EgovFaqList [props] : ", props);

  const location = useLocation();
  console.log("EgovFaqList [location] : ", location);

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
    console.groupCollapsed("EgovFaqList.retrieveList()");

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

    console.groupEnd("EgovFaqList.retrieveList()");
  }, [searchCondition]);

  useEffect(() => {
    retrieveList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovFaqList [End]");
  console.groupEnd("EgovFaqList");
  return (
    <div className="modern-container">
      <div className="modern-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb" aria-label="페이지 위치">
          <ul>
            <li>
              <Link to={URL.MAIN} className="breadcrumb-home">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                홈
              </Link>
            </li>
            <li>
              <Link to={URL.INFORM}>알림마당</Link>
            </li>
            <li>FAQ</li>
          </ul>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <aside className="modern-sidebar">
            <EgovLeftNav />
          </aside>

          {/* Main Content */}
          <main className="modern-content">
            {/* Page Header */}
            <header className="modern-page-header">
              <div className="page-header-content">
                <div className="page-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 9h6v6"/>
                    <path d="M9 15l6-6"/>
                  </svg>
                </div>
                <div className="page-titles">
                  <h1>알림마당</h1>
                  <h2>FAQ</h2>
                </div>
              </div>
            </header>

            {/* FAQ List */}
            <section className="modern-faq-section">
              <div className="faq-list">
                {allList
                  .slice(
                    (paginationInfo.currentPageNo - 1) * paginationInfo.recordCountPerPage,
                    paginationInfo.currentPageNo * paginationInfo.recordCountPerPage
                  )
                  .map((item, index) => {
                    const listIdx = index + 1 + (paginationInfo.currentPageNo - 1) * paginationInfo.pageSize;
                    const isOpen = openSet.has(item.postId);
                    
                    return (
                      <div key={item.postId} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button 
                          className="faq-question"
                          onClick={() => toggleContent(item.postId)}
                          aria-expanded={isOpen}
                        >
                          <div className="question-content">
                            <span className="question-number">Q{listIdx}</span>
                            <span className="question-text">{item.title}</span>
                          </div>
                          <div className="question-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="6,9 12,15 18,9"/>
                            </svg>
                          </div>
                        </button>
                        
                        <div className="faq-answer">
                          <div className="answer-content">
                            <span className="answer-label">A</span>
                            <div className="answer-text">
                              {item.content || "답변 내용이 없습니다."}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                
                {allList.length === 0 && (
                  <div className="no-data">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9 9h6v6"/>
                      <path d="M9 15l6-6"/>
                    </svg>
                    <p>등록된 FAQ가 없습니다.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Pagination */}
            <section className="modern-pagination-section">
              <EgovPaging
                pagination={paginationInfo}
                moveToPage={(pageNum) => {
                  retrieveList(pageNum);
                }}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EgovFaqList;
