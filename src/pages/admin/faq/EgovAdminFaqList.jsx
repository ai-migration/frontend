import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";
import { getSessionItem } from "@/utils/storage";

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
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <Link to={URL.MAIN} className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to={URL.INFORM}>사이트관리</Link>
            </li>
            <li>FAQ관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents NOTICE_LIST" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>

            <h2 className="tit_2">FAQ관리</h2>

            {/* <!-- 검색조건 --> */}
            <div className="condition">
              <ul>
                <li className="third_1 L">
                  <label className="f_select" htmlFor="sel1">
                    <select
                      id="sel1"
                      title="조건"
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
                </li>
                <li className="third_2 R">
                  <span className="f_search w_500">
                    <input
                      type="text"
                      name=""
                      defaultValue={searchCondition.searchWrd}
                      placeholder=""
                      ref={wrdRef}
                      onChange={(e) => {
                        wrdRef.current.value = e.target.value;
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        retrieveList({
                          ...searchCondition,
                          pageIndex: 1,
                          searchCnd: cndRef.current.value,
                          searchWrd: wrdRef.current.value,
                        });
                      }}
                    >
                      조회
                    </button>
                  </span>
                </li>
                {user &&
                  sessionUserSe === "ADM" && (
                    <li>
                      <Link
                        to={URL.ADMIN_FAQ_CREATE}
                        state={{ postId: null, mode:CODE.MODE_CREATE }}
                        className="btn btn_blue_h46 pd35"
                      >
                        등록
                      </Link>
                    </li>
                  )}
              </ul>
            </div>
            {/* <!--// 검색조건 --> */}

            {/* <!-- 게시판목록 --> */}
            <div className="board_list BRD002">
              <div className="head">
                <span>번호</span>
                <span>제목</span>
              </div>
              <div className="result">
                {allList
                  .slice(
                    (paginationInfo.currentPageNo - 1) * paginationInfo.recordCountPerPage,
                    paginationInfo.currentPageNo * paginationInfo.recordCountPerPage
                  )
                  .map((item, index) => {
                    const listIdx =
                      index + 1 + (paginationInfo.currentPageNo - 1) * paginationInfo.pageSize;
                    return (
                      <li key={item.postId} className="list_wrapper">
                        <div className="list_item" onClick={() => toggleContent(item.postId)}>
                          <div>{listIdx}</div>
                          <div className="al">{item.title}</div>
                          {/* 수정 버튼 */}
                          <div>
                          <button
                            type="button"
                            className="btn_skyblue_h46 w_100"
                            onClick={() =>
                              navigate(URL.ADMIN_FAQ_MODIFY, {
                                state: { postId: item.postId, mode: CODE.MODE_MODIFY },
                              })
                            }
                          >
                            수정
                          </button>
                          </div>
                        </div>
                        {openSet.has(item.postId) && (
                          <div className="list_item">
                            <div className="al">{item.content}</div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </div>
            </div>

            <div className="board_bot">
              {/* <!-- Paging --> */}
              <EgovPaging
                pagination={paginationInfo}
                moveToPage={(pageNum) => {
                  retrieveList(pageNum); // 페이지 이동 시 리스트 다시 자르기
                }}
              />
              {/* <!--/ Paging --> */}
            </div>

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovAdminFaqList;
