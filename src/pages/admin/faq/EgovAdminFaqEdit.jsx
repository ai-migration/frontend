import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { getSessionItem } from "@/utils/storage";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";

import { useDebouncedInput } from "@/hooks/useDebounce";

function EgovAdminFaqEdit(props) {
  console.group("EgovAdminFaqEdit");
  console.log("------------------------------");
  console.log("EgovAdminFaqEdit [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovAdminFaqEdit [location] : ", location);

  const sessionUser = getSessionItem("loginUser");
  const sessionUserSe = sessionUser?.userSe;

  const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  // const [masterBoard, setMasterBoard] = useState({});
  const [boardDetail, setBoardDetail] = useState({ postId:location.state.postId, title: "", content: "", type:"FAQ" });

  // const handleInputChange = useDebouncedInput(setBoardDetail, 300);

  const initMode = () => {
    // Edit 데이터
    if(modeInfo.mode === CODE.MODE_MODIFY) {
      const retrieveDetailURL = `/posts/${location.state.postId}?type=NOTICE`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
        // console.log(resp);
        setBoardDetail(resp);
        // alert('불러오기!');
      });
    }
  };

  const retrieveDetail = () => {
    // 등록
    if(modeInfo.mode === CODE.MODE_CREATE) {
      const retrieveDetailURL = `/admin/posts`;
      const { postId, ...boardWithoutPostId } = boardDetail;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(boardWithoutPostId)
      };

      EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
        // console.log(resp);
        alert('공지 등록!');
        navigate('/inform/notice');
      });
    }
    // 수정
    else if(modeInfo.mode === CODE.MODE_MODIFY) {
      const retrieveDetailURL = `/admin/posts/${location.state.postId}`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(boardDetail)
      };

      EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
        // console.log(resp);
        alert('공지 수정!');
        navigate('/inform/notice');
      });

    }
  };

  const deleteFAQ = () => {
    const retrieveDetailURL = `/admin/posts/${location.state.postId}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ postId: location.state.postId })
    };

    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      // console.log(resp);
      alert('FAQ 삭제!');
      navigate('/admin/faq');
    });
  }

  useEffect(function () {
    initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.groupEnd("EgovAdminFaqEdit");

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
            <li>FAQ관리</li>
          </ul>
        </div>

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents NOTICE_LIST" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>

            <h2 className="tit_2">
              FAQ관리
            </h2>

            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="nttSj">
                    제목<span className="req">필수</span>
                  </label>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    id="nttSj"
                    name="nttSj"
                    type="text"
                    defaultValue={boardDetail.title}
                    onChange={(e) =>
                      setBoardDetail({ ...boardDetail, title: e.target.value })
                    }
                    maxLength="60"
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="nttCn">
                    내용 <span className="req">필수</span>
                  </label>
                </dt>
                <dd>
                  <textarea
                    className="f_txtar w_full h_200"
                    id="nttCn"
                    name="nttCn"
                    cols="30"
                    rows="10"
                    placeholder=""
                    defaultValue={boardDetail.content}
                    onChange={(e) =>
                      setBoardDetail({ ...boardDetail, content: e.target.value })
                    }
                  ></textarea>
                </dd>
              </dl>
              {/* 답글이 아니고 게시판 파일 첨부 가능 상태에서만 첨부파일 컴포넌트 노출 */}
              
              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                {sessionUserSe === "ADM" && 
                  modeInfo.mode === CODE.MODE_CREATE &&(
                  <div className="left_col btn1">
                    <button
                      className="btn_skyblue_h46 w_100"
                      onClick={() => retrieveDetail()}
                    >
                      등록
                    </button>
                  </div>
                )}
                {sessionUserSe === "ADM" && 
                  modeInfo.mode === CODE.MODE_MODIFY &&(
                  <div className="left_col btn1">
                    <button
                      className="btn_skyblue_h46 w_100"
                      onClick={() => retrieveDetail()}
                    >
                      저장
                    </button>
                    <button
                      className="btn_skyblue_h46 w_100"
                      onClick={() => deleteFAQ()}
                    >
                      삭제
                    </button>
                  </div>
                )}

                <div className="right_col btn1">
                  <Link
                    to={URL.ADMIN_FAQ}
                    className="btn btn_blue_h46 w_100"
                  >
                    목록
                  </Link>
                </div>
              </div>
              {/* <!--// 버튼영역 --> */}
            </div>

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovAdminFaqEdit;
