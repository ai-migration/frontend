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
  const [userDetail, setUserDetail] = useState({email:"", nickname:"", tokenIssued:false});
  const [changePassword, setChangePassword] = useState({password:"", newPassword:""});
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
        setUserDetail({
            ...userDetail,
            tokenIssued: true,
          })
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
    const msgs = getPasswordValidationMessage(changePassword.newPassword);
    if (msgs.some(m => m.startsWith("❌"))) {
      alert("새 비밀번호 형식을 확인해 주세요.");
      return;
    }
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    const requestUpdateUserURL = `/users/changePassword`; // 임시URL

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": sessionToken
      },
      body: JSON.stringify({ ...changePassword }),
    };
    
    EgovNet.requestFetch(requestUpdateUserURL, requestOptions, (resp) => {
      // if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        alert("회원 정보가 수정되었습니다.");
        navigate({ pathname: URL.MAIN });
      // } else {
      //   navigate(
      //     { pathname: URL.ERROR },
      //     { state: { msg: resp.resultMessage } }
      //   );
      // }
    });
  };
  
  useEffect(() => {
    setPasswordMatch(changePassword.newPassword !== "" && changePassword.newPassword === passwordCheck);
  }, [changePassword.newPassword, passwordCheck]);

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
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="password">현재 비밀번호</label>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="password"
                    title=""
                    id="password"
                    placeholder="현재 암호를 입력해 주세요."
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        password: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[1] = el)}
                    required
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="newPassword">암호변경</label>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="newPassword"
                    title=""
                    id="newPassword"
                    placeholder="변경할 암호를 입력해 주세요. 비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다."
                    onChange={(e) =>
                      setChangePassword({
                        ...changePassword,
                        newPassword: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[1] = el)}
                    required
                  />
                  <div>
                    {getPasswordValidationMessage(changePassword.newPassword).map((m, i) => (
                      <div key={i}>{m}</div>
                    ))}
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="newPasswordCheck">암호확인</label>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="newPasswordCheck"
                    title=""
                    id="newPasswordCheck"
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

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovMypageEdit;
