import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { getLocalItem, setLocalItem, setSessionItem } from "@/utils/storage";
import SnsNaverBt from "@/components/sns/SnsNaverBt";
import SnsKakaoBt from "@/components/sns/SnsKakaoBt";

function EgovLoginContent(props) {
  console.group("EgovLoginContent");
  console.log("[Start] EgovLoginContent ------------------------------");
  console.log("EgovLoginContent [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovLoginContent [location] : ", location);

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "default",
    userSe: "USR",
  });
  // eslint-disable-next-line no-unused-vars
  const [loginVO, setLoginVO] = useState({});

  const [saveIDFlag, setSaveIDFlag] = useState(false);

  const checkRef = useRef();
  const idRef = useRef(null); //id입력 부분에서 엔터키 이벤트 발생 확인
  const passwordRef = useRef(null); //비밀번호 입력 부분

  const KEY_ID = "KEY_ID";
  const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";

  // Email 유효성 체크
  function getEmailValidationMessage(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid = emailRegex.test(email);

    return isValid ? "✅ 올바른 Email 형식입니다." : "❌ Email 형식을 확인해 주세요.";
  }
  
  const handleSaveIDFlag = () => {
    setLocalItem(KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  useEffect(() => {
    let idFlag = getLocalItem(KEY_SAVE_ID_FLAG);
    if (idFlag === null) {
      setSaveIDFlag(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      idFlag = false;
    } else {
      setSaveIDFlag(idFlag);
    }
    if (idFlag === false) {
      setLocalItem(KEY_ID, "");
      checkRef.current.className = "f_chk";
    } else {
      checkRef.current.className = "f_chk on";
    }
  }, []);

  useEffect(() => {
    let data = getLocalItem(KEY_ID);
    if (data !== null) {
      setUserInfo({ email: data, password: "default", userSe: "USR" });
    }
  }, []);

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target === idRef.current && passwordRef.current.value === "") {
        //엔터 키 이벤트 발생한 입력 필드가 아이디인지 확인하기
        alert("비밀번호 입력 여부를 확인하여 주세요");
        passwordRef.current.focus();
      } else {
        submitFormHandler(e);
      }
    }
  };
  const submitFormHandler = () => {
    console.log("EgovLoginContent submitFormHandler()");

    // 이메일 형식이 아닌 경우 admin으로 처리
    let emailToSend = userInfo.email;
    if (userInfo.email === 'admin') {
      emailToSend = 'admin@admin.com';
    }

    const loginUrl = "/users/login";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...userInfo,
        email: emailToSend
      }),
    };

    EgovNet.requestFetch(loginUrl, requestOptions, (resp) => {
      // let resultVO = resp.resultVO;
      let jToken = resp?.accessToken || null;
      // let jToken = resp?.accessToken.split(' ')[1] || null;

      const obj = {
        id: resp?.id,
        name: resp?.nickname,
        userSe: resp?.role,
      };

      setSessionItem("jToken", jToken);
      setSessionItem("loginUser", obj);

    if (saveIDFlag) setLocalItem(KEY_ID, userInfo.email);

    // 3) 만료/임박 처리
    const isExpired = !resp?.isExpired;         // 백엔드에서 true/false
    // const daysLeft  = Number(resp?.daysLeft ?? NaN); // 선택: 남은 일수 제공 시
    console.log(isExpired);
    if (isExpired) {
      const goChange = confirm(
        "마지막으로 비밀번호를 변경하신지 60일이 지났습니다.\n지금 바로 변경하시겠습니까?"
      );
      if (goChange) {
        // 비밀번호 변경 화면(라우팅 상수에 맞춰 수정하세요)
        navigate(URL.MYPAGE); // 예: '/mypage/password' 등
        return;
      } else {
        alert("보안을 위해 가능한 빨리 비밀번호를 변경해 주세요.");
        // 원하는 정책에 따라: 메인으로 보낼지, 로그인 유지 막을지 결정
        navigate(URL.MAIN);
        return;
      }
    }

    // (선택) 만료 임박 경고: 7일 이하 남았을 때 알림
    // if (!isExpired && !isNaN(daysLeft) && daysLeft <= 7 && daysLeft >= 0) {
    //   modernConfirm(
    //     `비밀번호 만료가 ${daysLeft}일 남았습니다.\n지금 변경하시겠습니까?`,
    //     "비밀번호 만료 임박"
    //   ).then((goEarly) => {
    //     if (goEarly) {
    //       navigate(URL.MYPAGE_PASSWORD);
    //       return;
    //     }
    //   });
    // }

    // 4) 정상 로그인 플로우
    alert("로그인 성공!");
    navigate(URL.MAIN);
    });
  };

  console.log("------------------------------EgovLoginContent [End]");
  console.groupEnd("EgovLoginContent");

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Hero Section */}
        <div className="login-hero">
          <div className="hero-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10,17 15,12 10,7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </div>
          <h1 className="hero-title">로그인</h1>
          <p className="hero-description">
            시스템을 이용하시려면 로그인이 필요합니다.
            <br />
            로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.
          </p>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <form onSubmit={(e) => { e.preventDefault(); submitFormHandler(); }}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="이메일을 입력하세요"
                value={userInfo?.email || ''}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                ref={idRef}
                onKeyDown={activeEnter}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                ref={passwordRef}
                onKeyDown={activeEnter}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label" htmlFor="saveid" ref={checkRef}>
                <input
                  type="checkbox"
                  id="saveid"
                  onChange={handleSaveIDFlag}
                  checked={saveIDFlag}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">아이디 저장</span>
              </label>
            </div>

            <button type="submit" className="login-button">
              <span>로그인</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </form>

          <div className="signup-link">
            <span>계정이 없으신가요?</span>
            <Link to="/signup" className="link-button">
              회원가입
            </Link>
          </div>
        </div>

        {/* Security Tips */}
        <div className="security-tips">
          <h3 className="tips-title">보안 안내</h3>
          <ul className="tips-list">
            <li>비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.</li>
            <li>쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기 쉬우므로 주기적으로 변경하셔서 사용하는 것이 좋습니다.</li>
          </ul>
        </div>
      </div>

      <style>{`
        .login-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 200px);
          padding: 0 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid var(--gray-200);
        }

        /* Hero Section */
        .login-hero {
          text-align: center;
          padding: 3rem 2rem 2rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: white;
        }

        .hero-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .hero-icon svg {
          width: 28px;
          height: 28px;
        }

        .hero-title {
          margin: 0 0 1rem;
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
        }

        .hero-description {
          margin: 0;
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        /* Login Form */
        .login-form {
          padding: 3rem 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
        }

        .form-label svg {
          width: 16px;
          height: 16px;
          color: var(--primary-blue);
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid var(--gray-200);
          border-radius: 12px;
          font-size: 1rem;
          color: var(--gray-900);
          background: white;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder {
          color: var(--gray-400);
        }

        /* Form Options */
        .form-options {
          margin-bottom: 3rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid var(--gray-300);
          border-radius: 6px;
          position: relative;
          transition: all 0.2s ease;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: var(--primary-blue);
          border-color: var(--primary-blue);
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        /* Login Button */
        .login-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.25rem 2rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          margin-top: 1.5rem;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-button svg {
          width: 20px;
          height: 20px;
        }

        /* Signup Link */
        .signup-link {
          margin-top: 2rem;
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--gray-200);
        }

        .signup-link span {
          display: block;
          margin-bottom: 1rem;
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .link-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: white;
          color: var(--primary-blue);
          border: 2px solid var(--primary-blue);
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .link-button:hover {
          background: var(--primary-blue);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        /* Security Tips */
        .security-tips {
          padding: 2rem 2.5rem;
          background: var(--gray-50);
          border-top: 1px solid var(--gray-200);
        }

        .tips-title {
          margin: 0 0 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-800);
        }

        .tips-list {
          margin: 0;
          padding-left: 1.25rem;
          list-style: none;
        }

        .tips-list li {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.5;
          position: relative;
        }

        .tips-list li::before {
          content: "•";
          color: var(--primary-blue);
          font-weight: bold;
          position: absolute;
          left: -1.25rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            padding: 0 1rem;
          }

          .login-card {
            max-width: 100%;
          }

          .login-hero {
            padding: 2rem 1.5rem 1.5rem;
          }

          .hero-title {
            font-size: 1.875rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .login-form {
            padding: 2rem 1.5rem;
          }

          .security-tips {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 0 0.5rem;
          }

          .login-hero {
            padding: 1.5rem 1rem 1rem;
          }

          .login-form {
            padding: 1.5rem 1rem;
          }

          .security-tips {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovLoginContent;
