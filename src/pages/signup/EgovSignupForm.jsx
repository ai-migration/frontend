/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //Link, 제거

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { setSessionItem } from "@/utils/storage";
import "@/css/auth.css";

function EgovSignupForm({ onBack }) {
  console.group("EgovSignupForm");
  console.log("[Start] EgovSignupForm ------------------------------");
  // console.log("EgovSignupForm [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  console.log("EgovSignupForm [location] : ", location);
  //const uniqId = location.state?.uniqId || "";
  const [userDetail, setUserDetail] = useState({email: "", password:"", passwordCheck: "", nickname: ""});
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Email 유효성 체크
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid = emailRegex.test(email);

    return isValid;
  }

  // Email 유효성 체크 메시지
  function getEmailValidationMessage(email) {

    return isValidEmail(email) ? "✅ 올바른 Email 형식입니다." : "❌ Email 형식을 확인해 주세요.";
  }

  // Password 유효성 체크
  function isValidPassword(pw) {
    const lengthValid = pw.length >= 8 && pw.length <= 16;

    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigit = /\d/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw); // 특수문자

    const typeCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;

    return lengthValid && typeCount >= 2;
  }

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
    
  // 회원가입 버튼 클릭
  const submitForm = () => {
    const { email, password, passwordCheck, nickname } = userDetail;

    // 필수항목
    if(!formObjValidator()) {
      // alert("모든 필수 항목을 입력하세요.");
      return;
    }

    // 이메일
    if(!isValidEmail(email)) {
      alert("이메일 형식을 확인해주세요.");
      return;
    }

    // 비밀번호 유효성
    if(!isValidPassword(password)) {
      alert("비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.");
      return;
    }

    // 비밀번호 일치
    if (password !== passwordCheck) {
      alert("비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    const retrieveDetailURL = `/users/register`;

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
      alert("회원가입 성공!");
      navigate("/login"); // 또는 원하는 페이지로 이동
    });
  }

  const formObjValidator = () => {
    if (!userDetail.email)  {
      alert("이메일은 필수입니다.");
      return false;
    }      
    else if (!userDetail.password) {
      alert("비밀번호는 필수입니다.");
      return false;
    } 
    else if (!userDetail.passwordCheck) {
      alert("암호확인은 필수입니다.");
      return false;
    }
    else if (!userDetail.nickname) {
      alert("닉네임은 필수입니다.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    
  }, []);

  // 비밀번호 일치 여부 검사
  useEffect(() => {
    setPasswordMatch(userDetail.password !== "" && userDetail.password === userDetail.passwordCheck);
  }, [userDetail.password, userDetail.passwordCheck]);

  console.log("------------------------------EgovSignupForm [End]");
  console.groupEnd("EgovSignupForm");

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <a href="/" className="home">
                Home
              </a>
            </li>
            <li>회원가입</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">회원가입</h1>
            </div>

            <h2 className="tit_2">회원정보 입력</h2>

            <div className="board_view">
              <div className="signup_form_content">
                <div className="form_description">
                  <p>회원가입을 위해 아래 정보를 입력해 주세요. 모든 항목은 필수입니다.</p>
                </div>

                <form className="signup_form">
                  <div className="form_section">
                    <div className="input_group">
                      <div className="input_item">
                        <label htmlFor="userEmail" className="input_label">
                          이메일 <span className="required_mark">*</span>
                        </label>
                        <input
                          className="f_input2 w_full"
                          type="email"
                          name="userEmail"
                          id="userEmail"
                          placeholder="이메일을 입력해 주세요"
                          value={userDetail.email}
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              email: e.target.value,
                            })
                          }
                          ref={(el) => (checkRef.current[0] = el)}
                          required
                        />
                        <div className="validation_message">
                          {userDetail.email && getEmailValidationMessage(userDetail.email)}
                        </div>
                      </div>

                      <div className="input_item">
                        <label htmlFor="password" className="input_label">
                          비밀번호 <span className="required_mark">*</span>
                        </label>
                        <input
                          className="f_input2 w_full"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="8~16자의 영문, 숫자, 특수문자를 혼합하여 입력하세요"
                          value={userDetail.password}
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              password: e.target.value,
                            })
                          }
                          ref={(el) => (checkRef.current[1] = el)}
                          required
                        />
                        <div className="validation_message">
                          {userDetail.password && getPasswordValidationMessage(userDetail.password).map((m, i) => (
                            <div key={i} className="validation_item">{m}</div>
                          ))}
                        </div>
                      </div>

                      <div className="input_item">
                        <label htmlFor="passwordCheck" className="input_label">
                          비밀번호 확인 <span className="required_mark">*</span>
                        </label>
                        <input
                          className="f_input2 w_full"
                          type="password"
                          name="passwordCheck"
                          id="passwordCheck"
                          placeholder="비밀번호를 다시 입력해 주세요"
                          value={userDetail.passwordCheck}
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              passwordCheck: e.target.value,
                            })
                          }
                          ref={(el) => (checkRef.current[2] = el)}
                          required
                        />
                        <div className="validation_message">
                          {userDetail.passwordCheck && (
                            <div className={`validation_item ${passwordMatch ? 'success' : 'error'}`}>
                              {passwordMatch ? "✅ 비밀번호가 일치합니다." : "❌ 비밀번호가 일치하지 않습니다."}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="input_item">
                        <label htmlFor="nickname" className="input_label">
                          닉네임 <span className="required_mark">*</span>
                        </label>
                        <input
                          className="f_input2 w_full"
                          type="text"
                          name="nickname"
                          id="nickname"
                          placeholder="닉네임을 입력해 주세요"
                          value={userDetail.nickname}
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              nickname: e.target.value,
                            })
                          }
                          ref={(el) => (checkRef.current[3] = el)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form_actions">
                    <div className="button_area">
                      <div className="btn_group">
                        <button
                          type="button"
                          className="btn btn_gray_h46"
                          onClick={() => window.history.back()}
                        >
                          <span>이전</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn_blue_h46"
                          onClick={() => submitForm()}
                        >
                          <span>가입하기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSignupForm;
