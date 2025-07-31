import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //Link, 제거

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { setSessionItem } from "@/utils/storage";

function EgovSignupForm({ onBack }) {
  console.group("EgovSignupForm");
  console.log("[Start] EgovSignupForm ------------------------------");
  // console.log("EgovSignupForm [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  console.log("EgovSignupForm [location] : ", location);
  //const uniqId = location.state?.uniqId || "";
  const [userDetail, setUserDetail] = useState({});
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  
  const submitForm = () => {
    // 회원가입 버튼 클릭
    console.log(userDetail)
    
    const retrieveDetailURL = `localhost:8082/users`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetail),
    };

    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      console.log("signup retrieveDetail response:", resp);
      console.log("resp.result:", resp?.result);
    });
  }

  const retrieveDetail = () => {

    const retrieveDetailURL = `/signup`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetail),
    };

    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      console.log("signup retrieveDetail response:", resp);
      console.log("resp.result:", resp?.result);
      console.log("resp.result.mberManageVO:", resp?.result?.mberManageVO);
    });
  };
  const checkIdDplct = () => {
    return new Promise((resolve) => {
      let checkId = userDetail["email"];
      if (checkId === null || checkId === undefined) {
        alert("회원ID를 입력해 주세요");
        return false;
      }
      const checkIdURL = `/etc/member_checkid/${checkId}`;
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };
      EgovNet.requestFetch(checkIdURL, reqOptions, function (resp) {
        if (
          Number(resp.resultCode) === Number(CODE.RCV_SUCCESS) &&
          resp.result.usedCnt > 0
        ) {
          setUserDetail({
            ...userDetail,
            checkIdResult: "이미 사용중인 아이디입니다. [ID체크]",
            userEmail: checkId,
          });
          resolve(resp.result.usedCnt);
        } else {
          setUserDetail({
            ...userDetail,
            checkIdResult: "사용 가능한 아이디입니다.",
            userEmail: checkId,
          });
          resolve(0);
        }
      });
    });
  };

  const formValidator = (formData) => {
    return new Promise((resolve) => {
      if (formData.get("userEmail") === null || formData.get("userEmail") === "") {
        alert("회원ID는 필수 값입니다.");
        return false;
      }
      checkIdDplct().then((res) => {
        if (res > 0) {
          return false;
        }
        if (
          formData.get("password") === null ||
          formData.get("password") === ""
        ) {
          alert("암호는 필수 값입니다.");
          return false;
        }
        if (formData.get("nickname") === null || formData.get("nickname") === "") {
          alert("회원명은 필수 값입니다.");
          return false;
        }
        resolve(true);
      });
    });
  };

  const formObjValidator = (checkRef) => {
    if (checkRef.current[0].value === "") {
      alert("회원ID는 필수 값입니다.");
      return false;
    }
    if (checkRef.current[1].value === "") {
      alert("회원암호는 필수 값입니다.");
      return false;
    }
    if (checkRef.current[2].value === "") {
      alert("암호확인은 필수 값입니다.");
      return false;
    }
    if (checkRef.current[3].value === "") {
      alert("회원명은 필수 값입니다.");
      return false;
    }
    return true;
  };
  
  // const requestToken = () => {
    
  //   let requestOptions = {};
    
  //   alert("토큰 발급이 요청되었습니다. 토큰 발급 후 서비스 이용이 가능합니다.");
  //   EgovNet.requestFetch('/users/token', 'POST', (resp) => {
  //     if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
  //       alert("토큰 발급이 요청되었습니다. 토큰 발급 후 서비스 이용이 가능합니다.");
  //       // navigate({ pathname: URL.MAIN });
  //     } else {
  //       navigate(
  //         { pathname: URL.ERROR },
  //         { state: { msg: resp.resultMessage } }
  //       );
  //     }
  //   });
  // }

  useEffect(() => {
    // initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovSignupForm [End]");
  console.groupEnd("EgovSignupForm");

  return (
    <div className="container">
      <div className="c_wrap">

        <div className="layout">
          {/* <!-- Navigation --> */}
          {/* <EgovLeftNav></EgovLeftNav> *}
                    {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">회원가입</h1>
            </div>

            <h2 className="tit_2"></h2>

            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="userEmail">Email</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="text"
                    name="userEmail"
                    title=""
                    id="userEmail"
                    placeholder="이메일 형식으로 입력해 주세요"
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        userEmail: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[0] = el)}
                    required
                  />
                  <button
                    className="btn_skyblue_h46"
                    onClick={() => {
                      checkIdDplct();
                    }}
                  >
                    ID 중복확인
                  </button>
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
                    placeholder="비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다."
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
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
                  <label htmlFor="password">암호확인</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="passwordCheck"
                    title=""
                    id="passwordCheck"
                    placeholder="동일한 암호를 한 번 더 입력해 확인해 주세요."
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        passwordCheck: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[1] = el)}
                    required
                  />
                  
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="bbsNm">닉네임</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="text"
                    name="nickname"
                    title=""
                    id="nickname"
                    placeholder="닉네임을 입력해 주세요."
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

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1">
                  {/* <button
                    className="btn_skyblue_h46 w_100"
                    onClick={() => requestToken()}
                  >
                    토큰요청
                  </button> */}

                  <button
                    className="btn_skyblue_h46 w_100"
                    onClick={() => submitForm()}
                  >
                    가입하기
                  </button>

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

export default EgovSignupForm;
