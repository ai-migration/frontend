import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
    
    EgovNet.requestFetch(requestTokenURL, requestOptions)
      .then((resp) => {
        console.log("resp : ", resp);
        if (resp.resultCode === "200") {
          alert("토큰 발급이 요청되었습니다. 토큰 발급 후 서비스 이용이 가능합니다.");
          setUserDetail({
              ...userDetail,
              tokenIssued: true,
            })
        } else {
          navigate(
            { pathname: URL.ERROR },
            { state: { msg: resp.resultMessage } }
          );
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        alert("토큰 발급 중 오류가 발생했습니다.");
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
    
    const requestUpdateUserURL = `/users/changePassword`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": sessionToken
      },
      body: JSON.stringify({ ...changePassword }),
    };
    
    EgovNet.requestFetch(requestUpdateUserURL, requestOptions)
      .then((resp) => {
        console.log("resp : ", resp);
        if (resp.resultCode === "200") {
          alert("회원 정보가 수정되었습니다.");
          navigate({ pathname: URL.MAIN });
        } else {
          alert(resp.resultMessage);
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        alert("회원 정보 수정 중 오류가 발생했습니다.");
      });
  };
  
  useEffect(() => {
    setPasswordMatch(changePassword.newPassword !== "" && changePassword.newPassword === passwordCheck);
  }, [changePassword.newPassword, passwordCheck]);

  useEffect(() => {
    retrieveDetail();
  }, []);

  console.log("------------------------------EgovMypageEdit [End]");
  console.groupEnd("EgovMypageEdit");

  return (
    <div className="modern-page-container">
      <div className="modern-page-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb">
          <div className="breadcrumb-container">
            <Link to={URL.MAIN} className="breadcrumb-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              Home
            </Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">마이페이지</span>
          </div>
        </nav>

        <div className="modern-layout">
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h1 className="hero-title">마이페이지</h1>
                <p className="hero-description">
                  회원 정보를 확인하고 수정할 수 있습니다.
                  <br />
                  비밀번호 변경 및 토큰 발급 요청이 가능합니다.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section className="content-section modern-card">
              <div className="card-content">
                <div className="form-container">
                  <h2 className="form-title">회원 정보 수정</h2>
                  
                  <div className="info-section">
                    <div className="info-group">
                      <label className="info-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        이메일
                      </label>
                      <div className="info-value">{userDetail.email}</div>
                    </div>

                    <div className="info-group">
                      <label className="info-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        회원명
                      </label>
                      <div className="info-value">{userDetail.nickname}</div>
                    </div>

                    <div className="info-group">
                      <label className="info-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        토큰 상태
                      </label>
                      <div className="info-value">
                        {userDetail.tokenIssued ? (
                          <span className="token-issued">✅ 토큰 발급 완료</span>
                        ) : (
                          <button className="token-request-btn" onClick={requestToken}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            토큰 발급 요청
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="password-section">
                    <h3 className="section-title">비밀번호 변경</h3>
                    
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <circle cx="12" cy="16" r="1"></circle>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        현재 비밀번호
                        <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-input"
                        placeholder="현재 비밀번호를 입력하세요"
                        onChange={(e) =>
                          setChangePassword({
                            ...changePassword,
                            password: e.target.value,
                          })
                        }
                        ref={(el) => (checkRef.current[0] = el)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <circle cx="12" cy="16" r="1"></circle>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        새 비밀번호
                        <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="form-input"
                        placeholder="8~16자의 영문, 숫자, 특수문자 조합"
                        onChange={(e) =>
                          setChangePassword({
                            ...changePassword,
                            newPassword: e.target.value,
                          })
                        }
                        ref={(el) => (checkRef.current[1] = el)}
                        required
                      />
                      <div className="validation-message">
                        {changePassword.newPassword && getPasswordValidationMessage(changePassword.newPassword).map((m, i) => (
                          <div key={i} className="validation-item">{m}</div>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPasswordCheck" className="form-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22,4 12,14.01 9,11.01"></polyline>
                        </svg>
                        새 비밀번호 확인
                        <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        id="newPasswordCheck"
                        className="form-input"
                        placeholder="새 비밀번호를 다시 입력하세요"
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        ref={(el) => (checkRef.current[2] = el)}
                        required
                      />
                      <div className="validation-message">
                        {passwordCheck && (
                          passwordMatch ? 
                            "✅ 비밀번호가 일치합니다." : 
                            "❌ 비밀번호가 일치하지 않습니다."
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="form-actions">
                    <button type="button" className="submit-button" onClick={updateUser}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17,21 17,13 7,13 7,21"></polyline>
                        <polyline points="7,3 7,8 15,8"></polyline>
                      </svg>
                      저장
                    </button>
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

        .section-title {
          margin: 0 0 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-800);
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--gray-200);
        }

        /* Info Section */
        .info-section {
          margin-bottom: 3rem;
          padding: 2rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
        }

        .info-group {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .info-group:last-child {
          margin-bottom: 0;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
        }

        .info-label svg {
          width: 16px;
          height: 16px;
          color: var(--primary-blue);
        }

        .info-value {
          flex: 1;
          font-size: 1rem;
          color: var(--gray-900);
          font-weight: 500;
        }

        .token-issued {
          color: var(--green-600);
          font-weight: 600;
        }

        .token-request-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .token-request-btn:hover {
          background: var(--secondary-blue);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .token-request-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Password Section */
        .password-section {
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
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
          margin-top: 2rem;
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

          .info-section {
            padding: 1.5rem;
          }

          .info-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .info-label {
            min-width: auto;
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

          .info-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovMypageEdit;
