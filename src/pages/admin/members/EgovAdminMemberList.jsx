import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovPaging from "@/components/EgovPaging";

import { itemIdxByPage } from "@/utils/calc";
import { getSessionItem } from "@/utils/storage";

function EgovAdminMemberList(props) {
  console.group("EgovAdminMemberList");
  console.log(
    "[Start] EgovAdminMemberMemberList ------------------------------"
  );
  console.log("EgovAdminMemberList [props] : ", props);

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

      const retrieveListURL = "/admin/users";

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
        console.log(resultList)

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
                to={{ pathname: URL.ADMIN_MEMBERS_MODIFY }}
                state={{
                  userId: item.userId,
                  searchCondition: searchCondition,
                }}
                key={item.userId}
                className="list_item"
              >
                <div>{item.userId}</div>
                <div>{item.email}</div>
                <div>{item.nickname}</div>
                <div>{item.role}</div>
                <div>{item.tokenIssued ? "발급됨" : "미발급"}</div>
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

    console.groupEnd("EgovAdminMemberList.retrieveList()");
  }, [searchCondition]);

  useEffect(() => {
    retrieveList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminMemberList [End]");
  console.groupEnd("EgovAdminMemberList");
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
              <Link to={URL.ADMIN}>사이트관리</Link>
            </li>
            <li>회원 관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_LIST" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>

            <h2 className="tit_2">회원 관리</h2>

            {/* <!-- 검색조건 --> */}
            <div className="condition">
              <ul>
                <li className="third_1 L">
                  <span className="lb">검색유형선택</span>
                  <label className="f_select" htmlFor="searchCnd">
                    <select
                      id="searchCnd"
                      name="searchCnd"
                      title="검색유형선택"
                      ref={cndRef}
                      onChange={(e) => {
                        cndRef.current.value = e.target.value;
                      }}
                    >
                      <option value="0">사용자ID</option>
                      <option value="1">사용자명</option>
                    </select>
                  </label>
                </li>
                <li className="third_2 R">
                  <span className="lb">검색어</span>
                  <span className="f_search w_400">
                    <input
                      type="text"
                      name=""
                      defaultValue={
                        searchCondition && searchCondition.searchWrd
                      }
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
                <li>
                  <Link
                    to={URL.ADMIN_MEMBERS_CREATE}
                    className="btn btn_blue_h46 pd35"
                  >
                    등록
                  </Link>
                </li>
              </ul>
            </div>
            {/* <!--// 검색조건 --> */}

            {/* <!-- 회원목록 --> */}
            <div className="board_list BRD006">
              <div className="head">
                <span>UserId</span>
                <span>Email</span>
                <span>사용자명</span>
                <span>권한그룹</span>
                <span>토큰 발급 여부</span>
              </div>
              <div className="result">{listTag}</div>
            </div>
            {/* <!--// 회원목록 --> */}

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

export default EgovAdminMemberList;
