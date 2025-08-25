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
    email: "", // id에서 email로 변경
    password: "",
  });
  const [saveIDFlag, setSaveIDFlag] = useState(false);
  const [loginVO, setLoginVO] = useState();
  const [loginStatus, setLoginStatus] = useState("");

  const checkRef = useRef();

  const handleSaveIDFlag = (e) => {
    setSaveIDFlag(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EgovLoginContent handleSubmit");
    console.log("userInfo:", userInfo);

    const loginURL = "/users/login";
    
    // 백엔드 API가 email 필드를 사용하므로 그대로 전송
    const requestBody = {
      email: userInfo.email,
      password: userInfo.password
    };
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    console.log("Request body:", JSON.stringify(requestBody));

    EgovNet.requestFetch(loginURL, requestOptions, (resp) => {
      console.log("resp : ", resp);
      if (resp.resultCode === "200") {
        setSessionItem("loginUser", resp.result);
        setSessionItem("jToken", resp.result.jToken);
        if (saveIDFlag) {
          setLocalItem("saveIDFlag", "true");
          setLocalItem("saveID", userInfo.email);
        } else {
          setLocalItem("saveIDFlag", "false");
          setLocalItem("saveID", "");
        }
        setLoginStatus("SUCCESS");
        props.onChangeLogin(resp.result);
        navigate(URL.MAIN);
      } else {
        setLoginStatus("FAIL");
        // 구체적인 오류 메시지 표시
        const errorMessage = resp.resultMessage || "로그인에 실패했습니다.";
        alert(errorMessage);
      }
    });
  };

  useEffect(() => {
    const saveIDFlag = getLocalItem("saveIDFlag");
    const saveID = getLocalItem("saveID");
    if (saveIDFlag === "true") {
      setSaveIDFlag(true);
      setUserInfo((prev) => ({ ...prev, email: saveID })); // id에서 email로 변경
    }
  }, []);

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
            AI CODE MIGRATION 서비스에 오신 것을 환영합니다
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="form-input"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              className="form-input"
              placeholder="비밀번호를 입력하세요"
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
              <span className="checkbox-text">이메일 저장</span>
            </label>
          </div>

          <button type="submit" className="login-button">
            <span>로그인</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>

          {/* Social Login */}
          <div className="social-login">
            <div className="divider">
              <span>또는</span>
            </div>
            <div className="social-buttons">
              <SnsNaverBt />
              <SnsKakaoBt />
            </div>
          </div>

          {/* Signup Link */}
          <div className="signup-link">
            <span>계정이 없으신가요?</span>
            <Link to={URL.SIGNUP} className="link-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="m22 21-2-2"></path>
                <path d="m16 16 5 5"></path>
              </svg>
              회원가입
            </Link>
          </div>
        </form>

        {/* Security Tips */}
        <div className="security-tips">
          <h3>보안 팁</h3>
          <ul className="tips-list">
            <li>개인정보 보호를 위해 공용 PC에서는 로그아웃을 잊지 마세요</li>
            <li>비밀번호는 정기적으로 변경하시는 것이 좋습니다</li>
            <li>의심스러운 링크나 첨부파일은 열지 마세요</li>
          </ul>
        </div>
      </div>

      <style>{`
        /* Login Container */
        .login-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        /* Hero Section */
        .login-hero {
          text-align: center;
          padding: 3rem 2rem 2rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-icon svg {
          width: 32px;
          height: 32px;
        }

        .hero-title {
          margin: 0 0 1rem;
          font-size: 2.5rem;
          font-weight: 700;
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
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .form-label svg {
          width: 16px;
          height: 16px;
          color: #667eea;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          color: #1f2937;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        /* Form Options */
        .form-options {
          margin-bottom: 2rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid #d1d5db;
          border-radius: 6px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: #667eea;
          border-color: #667eea;
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

        .checkbox-text {
          line-height: 1.4;
        }

        /* Login Button */
        .login-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.25rem 2rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .login-button svg {
          width: 20px;
          height: 20px;
        }

        /* Social Login */
        .social-login {
          margin-top: 2rem;
        }

        .divider {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e7eb;
        }

        .divider span {
          background: white;
          padding: 0 1rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .social-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        /* Signup Link */
        .signup-link {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 1.5rem;
        }

        .signup-link span {
          display: block;
          margin-bottom: 1rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .link-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .link-button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .link-button svg {
          width: 16px;
          height: 16px;
        }

        /* Security Tips */
        .security-tips {
          padding: 2rem 2.5rem;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }

        .security-tips h3 {
          margin: 0 0 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
        }

        .tips-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .tips-list li {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.5;
          position: relative;
          padding-left: 1.25rem;
        }

        .tips-list li::before {
          content: "•";
          color: #667eea;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            padding: 1rem;
          }

          .login-card {
            max-width: 100%;
          }

          .login-hero {
            padding: 2rem 1.5rem 1.5rem;
          }

          .hero-title {
            font-size: 2rem;
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
            padding: 0.5rem;
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
