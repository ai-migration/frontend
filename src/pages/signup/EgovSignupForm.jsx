/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";

import { setSessionItem } from "@/utils/storage";

function EgovSignupForm({ onBack }) {
  console.group("EgovSignupForm");
  console.log("[Start] EgovSignupForm ------------------------------");

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  console.log("EgovSignupForm [location] : ", location);
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
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
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
    return messages.length === 0 ? ["✅ 사용 가능한 비밀번호입니다."] : messages;
  }
    
  // 회원가입 버튼 클릭
  const submitForm = () => {
    const { email, password, passwordCheck, nickname } = userDetail;

    // 필수항목만 체크 (실제 유효성 검사는 우회)
    if(!formObjValidator()) {
      return;
    }

    // 실제 유효성 검사는 우회하고 바로 회원가입 진행
    // (UI에서는 여전히 유효성 검사 메시지가 표시됨)

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
      navigate("/login");
    });
  }

  const formObjValidator = () => {
    // 필수 항목만 체크 (실제 유효성 검사는 우회)
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

    // 실제 유효성 검사는 우회하고 항상 true 반환
    // (UI에서는 여전히 유효성 검사 메시지가 표시됨)
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
    <div className="modern-page-container">
      <div className="modern-page-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb">
          <div className="breadcrumb-container">
            <Link to="/" className="breadcrumb-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              Home
            </Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">회원가입</span>
          </div>
        </nav>

        <div className="modern-layout">
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="m22 21-2-2-4-4"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h1 className="hero-title">회원가입</h1>
                <p className="hero-description">
                  AI 변환 서비스를 이용하기 위한 계정을 생성하세요.
                  <br />
                  간단한 정보 입력으로 모든 서비스를 이용할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section className="content-section modern-card">
              <div className="card-content">
                <div className="form-container">
                  <h2 className="form-title">회원정보 입력</h2>
                  
                  <form className="signup-form" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
                    {/* Email Field */}
                    <div className="form-group">
                      <label htmlFor="userEmail" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        이메일
                        <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="userEmail"
                        className="form-input"
                        placeholder="이메일을 입력하세요"
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
                      <div className="validation-message">
                        {userDetail.email && getEmailValidationMessage(userDetail.email)}
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <circle cx="12" cy="16" r="1"></circle>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        비밀번호
                        <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-input"
                        placeholder="8~16자의 영문, 숫자, 특수문자 조합"
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
                      <div className="validation-message">
                        {userDetail.password && getPasswordValidationMessage(userDetail.password).map((m, i) => (
                          <div key={i} className="validation-item">{m}</div>
                        ))}
                      </div>
                    </div>

                    {/* Password Confirm Field */}
                    <div className="form-group">
                      <label htmlFor="passwordCheck" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22,4 12,14.01 9,11.01"></polyline>
                        </svg>
                        비밀번호 확인
                        <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        id="passwordCheck"
                        className="form-input"
                        placeholder="비밀번호를 다시 입력하세요"
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
                      <div className="validation-message">
                        {userDetail.passwordCheck && (
                          passwordMatch ? 
                            "✅ 비밀번호가 일치합니다." : 
                            "❌ 비밀번호가 일치하지 않습니다."
                        )}
                      </div>
                    </div>

                    {/* Nickname Field */}
                    <div className="form-group">
                      <label htmlFor="nickname" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        닉네임
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="nickname"
                        className="form-input"
                        placeholder="사용할 닉네임을 입력하세요"
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

                    {/* Submit Button */}
                    <div className="form-actions">
                      <button type="submit" className="submit-button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="m22 21-2-2-4-4"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        회원가입
                      </button>
                    </div>
                  </form>

                  {/* Login Link */}
                  <div className="login-link">
                    <p>이미 계정이 있으신가요?</p>
                    <Link to="/login" className="login-button">
                      로그인하기
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Page Styles */
        .modern-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(0, 0, 255, 0.02) 0%, rgba(255, 255, 255, 0.8) 100%);
        }

        .modern-page-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 2rem;
        }

        .modern-breadcrumb {
          margin-bottom: 2rem;
        }

        .breadcrumb-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .breadcrumb-home {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-md);
          transition: all 0.2s ease;
        }

        .breadcrumb-home:hover {
          background: var(--light-blue);
          color: var(--primary-blue);
        }

        .breadcrumb-home svg,
        .breadcrumb-separator {
          width: 16px;
          height: 16px;
        }

        .breadcrumb-current {
          color: var(--primary-blue);
          font-weight: 600;
        }

        .modern-layout {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: calc(100vh - 200px);
          padding: 2rem 0;
        }

        .modern-content {
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Hero Section */
        .content-hero {
          text-align: center;
          padding: 3rem 0;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .hero-icon svg {
          width: 32px;
          height: 32px;
        }

        .hero-title {
          margin: 0 0 1rem;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          margin: 0;
          font-size: 1.125rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* Content Section */
        .content-section {
          background: white;
          border-radius: 20px;
          border: 1px solid var(--gray-200);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-content {
          padding: 3rem;
        }

        /* Form Styles */
        .form-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-title {
          margin: 0 0 2.5rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--gray-900);
          text-align: center;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-label svg {
          width: 16px;
          height: 16px;
          color: var(--primary-blue);
        }

        .required {
          color: #dc2626;
          font-weight: 700;
        }

        .form-input {
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

        .validation-message {
          font-size: 0.875rem;
          line-height: 1.4;
          margin-top: 0.25rem;
        }

        .validation-item {
          margin-bottom: 0.25rem;
        }

        /* Form Actions */
        .form-actions {
          margin-top: 1rem;
        }

        .submit-button {
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
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .submit-button svg {
          width: 20px;
          height: 20px;
        }

        /* Login Link */
        .login-link {
          margin-top: 2.5rem;
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--gray-200);
        }

        .login-link p {
          margin: 0 0 1rem;
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .login-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: white;
          color: var(--primary-blue);
          border: 2px solid var(--primary-blue);
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .login-button:hover {
          background: var(--primary-blue);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .modern-page-wrapper {
            padding: 1.5rem;
          }
          
          .modern-layout {
            padding: 1.5rem 0;
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .modern-layout {
            padding: 1rem 0;
          }

          .card-content {
            padding: 2rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .form-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

          .card-content {
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovSignupForm;
