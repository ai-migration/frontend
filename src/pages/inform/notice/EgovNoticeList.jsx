import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { NOTICE_BBS_ID } from "@/config";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavInform";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";
import { getSessionItem } from "@/utils/storage";

import "@/css/modern-pages.css";

function EgovNoticeList(props) {
  console.group("EgovNoticeList");
  console.log("[Start] EgovNoticeList ------------------------------");
  console.log("EgovNoticeList [props] : ", props);

  const location = useLocation();
  console.log("EgovNoticeList [location] : ", location);

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
    console.groupCollapsed("EgovNoticeList.retrieveList()");

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
            const listIndex = startIndex + index + 1;
            mutListTag.push(
              <Link
                to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                state={{
                  postId: item.postId,
                  searchCondition: searchCondition,
                }}
                key={item.postId}
                className="modern-board-row"
              >
                <div className="cell number">{listIndex}</div>
                <div className="cell title">
                  <span className="title-text">{item.title}</span>
                  {item.isNew && <span className="new-badge">NEW</span>}
                </div>
                <div className="cell author">{item.frstRegisterNm || "관리자"}</div>
                <div className="cell date">{item.createdAt.substring(0, 10)}</div>
                <div className="cell views">{item.viewCount || 0}</div>
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

    console.groupEnd("EgovNoticeList.retrieveList()");
  }, [searchCondition]);

  useEffect(() => {
    retrieveList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovNoticeList [End]");
  console.groupEnd("EgovNoticeList");
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
            <li>공지사항</li>
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="page-titles">
                  <h1>알림마당</h1>
                  <h2>공지사항</h2>
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
                
                {sessionUserSe === "ADM" && (
                  <Link
                    to={URL.INFORM_NOTICE_CREATE}
                    state={{ postId: null, mode: CODE.MODE_CREATE }}
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
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12l4 4 4-4"/>
                      </svg>
                      <p>등록된 공지사항이 없습니다.</p>
                    </div>
                  )}
                </div>
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

export default EgovNoticeList;
