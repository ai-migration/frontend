import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //Link, 제거

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { setSessionItem } from "@/utils/storage";
import { getSessionItem } from "@/utils/storage";

function EgovMypageEdit() {
  console.group("EgovMypageEdit");
  console.log("[Start] EgovMypageEdit ------------------------------");

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);
  const sessionToken = getSessionItem("jToken");

  console.log("EgovMypageEdit [location] : ", location);
  //const uniqId = location.state?.uniqId || "";
  // const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  const [userDetail, setUserDetail] = useState({});

  // const initMode = () => {
  //   switch (props.mode) {
  //     case CODE.MODE_MODIFY:
  //       setModeInfo({
  //         ...modeInfo,
  //         modeTitle: "수정",
  //         editURL: `/mypage/update`,
  //       });
  //       break;
  //     default:
  //       navigate({ pathname: URL.ERROR }, { state: { msg: "" } });
  //   }
  //   retrieveDetail();
  // };

  const retrieveDetail = () => {

    const retrieveDetailURL = `/users/mypage`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": sessionToken
      },
    };

    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      console.log("mypage retrieveDetail response:", resp);
      // console.log("resp.result:", resp?.result);
      // console.log("resp.result.mberManageVO:", resp?.result?.mberManageVO);
      // const userInfo = {
      //   email : 
      // }

      // if (resp && resp.resultCode === "403") {
      //   console.error("Permission denied for mypage:", resp);
      //   // 백엔드에서 반환한 에러 메시지가 있으면 사용
      //   const errorMessage =
      //     resp && resp.resultMessage
      //       ? resp.resultMessage
      //       : "로그인이 필요합니다.";
      //   alert(errorMessage);
      //   window.location.href = URL.LOGIN;
      // } else if (resp && resp.resultCode === "401") {
      //   console.error("Authentication required for mypage:", resp);
      //   alert("로그인이 필요합니다.");
      //   window.location.href = URL.LOGIN;
      // } else if (resp && resp.resultCode === "900") {
      //   console.error("Data error for mypage:", resp);
      //   alert(resp.resultMessage || "회원 정보를 불러올 수 없습니다.");
      //   window.location.href = URL.LOGIN;
      // } else {
      //   console.error("mberManageVO not found in response:", resp);
      //   // 백엔드에서 반환한 에러 메시지가 있으면 사용
      //   const errorMessage =
      //     resp && resp.resultMessage
      //       ? resp.resultMessage
      //       : "회원 정보를 불러올 수 없습니다. 다시 로그인해주세요.";
      //   alert(errorMessage);
      //   window.location.href = URL.LOGIN;
      // }
    });
  };
  
  const requestToken = () => {
    
    const requestTokenURL = `/users/token`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": sessionToken
      },
    };
    alert("토큰 발급이 요청되었습니다. 토큰 발급 후 서비스 이용이 가능합니다.");
    EgovNet.requestFetch(requestTokenURL, requestOptions, (resp) => {
      if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        alert("토큰 발급이 요청되었습니다. 토큰 발급 후 서비스 이용이 가능합니다.");
        // navigate({ pathname: URL.MAIN });
      } else {
        navigate(
          { pathname: URL.ERROR },
          { state: { msg: resp.resultMessage } }
        );
      }
    });
  }

  const updateUser = () => {
    // let modeStr = "PUT";

  let requestOptions = {};

    if (formObjValidator(checkRef)) {
      requestOptions = {
        method: modeStr,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...userDetail }),
      };

      // EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
      //   if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
      //     alert("회원 정보가 수정되었습니다.");
      //     navigate({ pathname: URL.MAIN });
      //   } else {
      //     navigate(
      //       { pathname: URL.ERROR },
      //       { state: { msg: resp.resultMessage } }
      //     );
      //   }
      // });
    }
    
  };

  // const deleteUser = () => {
  //   if (formObjValidator(checkRef)) {
  //     const deleteMypageURL = `/mypage/delete`; // /${uniqId} 제거 서버단에서 토큰 값 사용.
  //     const requestOptions = {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ ...userDetail }),
  //     };

  //     EgovNet.requestFetch(deleteMypageURL, requestOptions, (resp) => {
  //       console.log("====>>> member delete= ", resp);
  //       if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
  //         setSessionItem("loginUser", { id: "" });
  //         setSessionItem("jToken", null);
  //         // PC와 Mobile 열린메뉴 닫기
  //         document.querySelector(".all_menu.WEB").classList.add("closed");
  //         document.querySelector(".btnAllMenu").classList.remove("active");
  //         document.querySelector(".btnAllMenu").title = "전체메뉴 닫힘";
  //         document.querySelector(".all_menu.Mobile").classList.add("closed");
  //         alert("회원이 탈퇴되었습니다. 로그아웃 됩니다.");
  //         navigate(URL.MAIN, { replace: true });
  //       } else {
  //         alert("ERR : " + resp.resultMessage);
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    // initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    retrieveDetail();
  }, []);

  console.log("------------------------------EgovMypageEdit [End]");
  console.groupEnd("EgovMypageEdit");

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <a className="home" href="#!">
                Home
              </a>
            </li>
            <li>마이페이지</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          {/* <EgovLeftNav></EgovLeftNav> *}
                    {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">마이페이지</h1>
            </div>

            <h2 className="tit_2">회원 수정</h2>
            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="mberId">Email</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  {/* 수정/조회 일때 변경 불가 */}
                  <input
                    className="f_input2 w_full"
                    type="text"
                    name="mberId"
                    title=""
                    id="mberId"
                    placeholder=""
                    defaultValue={userDetail.mberId}
                    ref={(el) => (checkRef.current[0] = el)}
                    readOnly
                    required
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="password">회원암호</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="password"
                    title=""
                    id="password"
                    placeholder="빈값이면 기존 암호가 변경되지 않고 그대로 유지됩니다."
                    defaultValue=""
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        password: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[1] = el)}
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="bbsNm">회원명</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="text"
                    name="mberNm"
                    title=""
                    id="mberNm"
                    placeholder=""
                    defaultValue={userDetail.nickname}
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        nickname: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[2] = el)}
                    required
                  />
                </dd>
              </dl>
              
              <dl>
                <dt>
                  <label htmlFor="bbsNm">토큰</label>
                  {/* <span className="req">필수</span> */}
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="text"
                    name="mberToken"
                    title=""
                    id="mberToken"
                    placeholder="Token"
                    defaultValue=""
                    // onChange={(e) =>
                    //   setMemberDetail({
                    //     ...memberDetail,
                    //     mberNm: e.target.value,
                    //   })
                    // }
                    ref={(el) => (checkRef.current[2] = el)}
                    required
                  />
                </dd>
              </dl>

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1">
                  <button
                    className="btn_skyblue_h46 w_100"
                    onClick={() => requestToken()}
                  >
                    토큰요청
                  </button>

                  <button
                    className="btn_skyblue_h46 w_100"
                    onClick={() => updateUser()}
                  >
                    저장
                  </button>

                  {/* {modeInfo.mode === CODE.MODE_MODIFY && (
                    <button
                      className="btn btn_skyblue_h46 w_100"
                      onClick={() => {
                        deleteMember();
                      }}
                    >
                      탈퇴
                    </button>
                  )} */}
                  {/* memberDetail.uniqId 제거 서버단에서 토큰값 사용 */}
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

export default EgovMypageEdit;
