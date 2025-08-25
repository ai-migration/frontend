import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import { GALLERY_BBS_ID } from "@/config";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavInform";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";

import "@/css/modern-pages.css";

function EgovQnaList(props) {
  console.group("EgovQnaList");
  console.log("[Start] EgovQnaList ------------------------------");
  console.log("EgovQnaList [props] : ", props);

  const location = useLocation();
  console.log("EgovQnaList [location] : ", location);

  const cndRef = useRef();
  const wrdRef = useRef();

  const bbsId = GALLERY_BBS_ID;

  // eslint-disable-next-line no-unused-vars
  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || {
      bbsId: bbsId,
      pageIndex: 1,
      searchCnd: "0",
      searchWrd: "",
    }
  ); // 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [masterBoard, setMasterBoard] = useState({});
  const [user, setUser] = useState({});
  const [paginationInfo, setPaginationInfo] = useState({});

  const [listTag, setListTag] = useState([]);

  const retrieveList = useCallback((searchCondition) => {
    console.groupCollapsed("EgovQnaList.retrieveList()");

    const retrieveListURL = "/board" + EgovNet.getQueryString(searchCondition);
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
        setMasterBoard(resp.result.brdMstrVO);
        setPaginationInfo(resp.result.paginationInfo);
        setUser(resp.result.user);

        let mutListTag = [];
        mutListTag.push(
          <p className="no_data" key="0">
            검색된 결과가 없습니다.
          </p>
        ); // 게시판 목록 초기값

        const resultCnt = parseInt(resp.result.resultCnt);
        const currentPageNo = resp.result.paginationInfo.currentPageNo;
        const pageSize = resp.result.paginationInfo.pageSize;

        // 리스트 항목 구성
        resp.result.resultList.forEach(function (item, index) {
          if (index === 0) mutListTag = []; // 목록 초기화
          const listIdx = itemIdxByPage(
            resultCnt,
            currentPageNo,
            pageSize,
            index
          );

          mutListTag.push(
            <Link
              to={{ pathname: URL.INFORM_QNA_DETAIL }}
              state={{
                nttId: item.nttId,
                bbsId: item.bbsId,
                searchCondition: searchCondition,
              }}
              key={listIdx}
              className="modern-board-row"
            >
              <div className="cell number">{listIdx}</div>
              <div className="cell title">
                {(item.replyLc * 1 ? true : false) && (
                  <div className="title-content reply">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 10l6 6-6 6"/>
                    </svg>
                    <span className="title-text">{item.nttSj}</span>
                  </div>
                )}
                {(item.replyLc * 1 ? false : true) && (
                  <span className="title-text">{item.nttSj}</span>
                )}
              </div>
              <div className="cell author">{item.frstRegisterNm}</div>
              <div className="cell date">{item.frstRegisterPnttm}</div>
              <div className="cell views">{item.inqireCo}</div>
            </Link>
          );
        });
        setListTag(mutListTag);
      },
      function (resp) {
        console.log("err response : ", resp);
      }
    );
    console.groupEnd("EgovQnaList.retrieveList()");
  }, []);

  //======================================================
  useEffect(() => {
    retrieveList(searchCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovQnaList [End]");
  console.groupEnd("EgovQnaList");
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
            <li>Q&A</li>
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 9h8"/>
                    <path d="M8 13h6"/>
                  </svg>
                </div>
                <div className="page-titles">
                  <h1>알림마당</h1>
                  <h2>Q&A</h2>
                </div>
              </div>
            </header>

            {/* Search Section */}
            <section className="modern-search-section">
              <div className="search-controls">
                <div className="search-group">
                  <label className="modern-select-wrapper">
                    <select
                      id="searchCondition"
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
                  </label>
                  
                  <div className="modern-search-input">
                    <input
                      type="text"
                      defaultValue={searchCondition.searchWrd}
                      placeholder="검색어를 입력하세요"
                      ref={wrdRef}
                      onChange={(e) => {
                        wrdRef.current.value = e.target.value;
                      }}
                    />
                    <button
                      type="button"
                      className="search-btn"
                      onClick={() => {
                        retrieveList({
                          ...searchCondition,
                          pageIndex: 1,
                          searchCnd: cndRef.current.value,
                          searchWrd: wrdRef.current.value,
                        });
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                      </svg>
                      검색
                    </button>
                  </div>
                </div>
                
                {user.id && masterBoard.bbsUseFlag === "Y" && (
                  <Link
                    to={URL.INFORM_QNA_CREATE}
                    state={{ bbsId: bbsId }}
                    className="modern-create-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    등록
                  </Link>
                )}
              </div>
            </section>

            {/* Board List */}
            <section className="modern-board-section">
              <div className="modern-board-list">
                <div className="board-header">
                  <div className="header-cell number">번호</div>
                  <div className="header-cell title">제목</div>
                  <div className="header-cell author">작성자</div>
                  <div className="header-cell date">작성일</div>
                  <div className="header-cell views">조회수</div>
                </div>
                
                <div className="board-body">
                  {listTag.length > 0 ? listTag : (
                    <div className="no-data">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        <path d="M8 9h8"/>
                        <path d="M8 13h6"/>
                      </svg>
                      <p>등록된 Q&A가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Pagination */}
            <section className="modern-pagination-section">
              <EgovPaging
                pagination={paginationInfo}
                moveToPage={(passedPage) => {
                  retrieveList({
                    ...searchCondition,
                    pageIndex: passedPage,
                    searchCnd: cndRef.current.value,
                    searchWrd: wrdRef.current.value,
                  });
                }}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EgovQnaList;
