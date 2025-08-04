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
  const [userDetail, setUserDetail] = useState({email:"", password:"", nickname:"", tokenIssued:false});
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Password 유효성 체크 메시지
  function getPasswordValidationMessage(pw) {
    const messages = [];
    if (pw.length < 8 || pw.length > 16) {
      messages.push("❌ 8자 이상 16자 이하로 입력하세요.");
    }

    if (!/[0-9]/.test(pw)) {
      messages.push("❌ 숫자를 1개 이상 포함하세요.");
    }

    if (!/[a-zA-Z]/.test(pw)) {
      messages.push("❌ 영문자를 1개 이상 포함하세요.");
    }

    if (!/\W/.test(pw)) {
      messages.push("❌ 특수문자를 1개 이상 포함하세요.");
    }

    if (/\s/.test(pw)) {
      messages.push("❌ 공백은 사용할 수 없습니다.");
    }

    return messages.length === 0
      ? ["✅ 사용 가능한 비밀번호입니다."]
      : messages;
  }

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
      
      setUserDetail((prev) => ({
        ...prev,
        email: resp.email,
        nickname: resp.nickname,
        tokenIssued: resp.tokenIssued,
      }));
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

    const requestUpdateUserURL = `/users/update`; // 임시URL

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": sessionToken
      },
      body: JSON.stringify({ ...userDetail }),
    };
    
    EgovNet.requestFetch(requestUpdateUserURL, requestOptions, (resp) => {
      if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        alert("회원 정보가 수정되었습니다.");
        navigate({ pathname: URL.MAIN });
      } else {
        navigate(
          { pathname: URL.ERROR },
          { state: { msg: resp.resultMessage } }
        );
      }
    });
  };
  
  useEffect(() => {
    setPasswordMatch(userDetail.password !== "" && userDetail.password === passwordCheck);
  }, [userDetail.password, passwordCheck]);

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

            <h2 className="tit_2">회원 정보 수정</h2>
            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="mberId">Email</label>
                </dt>
                <dd>
                  {userDetail.email}
                  {/* <input
                    className="f_input2 w_full"
                    type="text"
                    name="mberId"
                    title=""
                    id="mberId"
                    placeholder=""
                    defaultValue={userDetail.email}
                    ref={(el) => (checkRef.current[0] = el)}
                    readOnly
                    required
                  /> */}
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="password">암호변경</label>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="password"
                    title=""
                    id="password"
                    placeholder="변경할 암호를 입력해 주세요. 비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다."
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        password: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[1] = el)}
                    required
                  />
                  <div>
                    {getPasswordValidationMessage(userDetail.password)}
                  </div>
                </dd>
              </dl><dl>
                <dt>
                  <label htmlFor="password">암호확인</label>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="passwordCheck"
                    title=""
                    id="passwordCheck"
                    placeholder="동일한 암호를 한 번 더 입력해 확인해 주세요."
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    ref={(el) => (checkRef.current[2] = el)}
                    required
                  />
                  <div>
                    {passwordCheck
                      ? passwordMatch
                        ? "✅ 비밀번호가 일치합니다."
                        : "❌ 비밀번호가 일치하지 않습니다."
                      : ""}
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="bbsNm">회원명</label>
                </dt>
                <dd>
                  {userDetail.nickname}
                  {/* <input
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
                  /> */}
                </dd>
              </dl>
              
              <dl>
                <dt>
                  <label htmlFor="bbsNm">토큰</label>
                  {/* <span className="req">필수</span> */}
                </dt>
                <dd>
                  {userDetail.tokenIssued && (
                    <p>토큰 발급이 완료되었습니다.</p>
                  )}
                  {!userDetail.tokenIssued && (
                    <button
                      className="btn_skyblue_h46 w_100"
                      onClick={() => requestToken()}
                    >
                      토큰요청
                    </button>
                  )}
                  {/* <input
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
                  /> */}
                </dd>
              </dl>

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1">

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
