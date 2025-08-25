import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import "@/css/modern-styles.css";

function EgovAdminPasswordUpdate(props) {
  console.group("EgovAdminPasswordUpdate");
  console.log("[Start] EgovAdminPasswordUpdate ------------------------------");
  console.log("EgovAdminPasswordUpdate [props] : ", props);

  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const formValidator = (formData) => {
    if (
      formData.get("old_password") === null ||
      formData.get("old_password") === ""
    ) {
      alert("기존 암호는 필수 값입니다.");
      return false;
    }
    if (
      formData.get("new_password") === null ||
      formData.get("new_password") === ""
    ) {
      alert("신규 암호는 필수 값입니다.");
      return false;
    }
    if (formData.get("new_password") === formData.get("old_password")) {
      alert("신규 암호는 기존 암호와 동일하게 사용할 수 없습니다.");
      return false;
    }
    return true;
  };

  const updateAdminPassword = () => {
    if (newPassword !== confirmPassword) {
      return alert("신규 암호와 입력 확인값이 일치하지 않습니다");
    }

    setIsLoading(true);
    const editURL = "/admin/password";

    let requestOptions = {};
    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("new_password", newPassword);
    if (formValidator(formData)) {
      requestOptions = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      };
      EgovNet.requestFetch(editURL, requestOptions, (resp) => {
        setIsLoading(false);
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          alert("OK 다음 로그인 시 신규 암호를 사용하세요.");
          navigate({ pathname: URL.MAIN }, { replace: true });
        } else {
          alert("Fail 변경되지 않았습니다. 다시 시도해 주세요.");
          navigate(
            { pathname: URL.ERROR },
            { state: { msg: resp.resultMessage } }
          ); //에러메세지 변수명 변경
        }
      });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminPasswordUpdate [End]");
  console.groupEnd("EgovAdminPasswordUpdate");

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
            <Link to={URL.INFORM} className="breadcrumb-link">사이트관리</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">관리자관리</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNav />
          
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
                <h1 className="hero-title">관리자관리</h1>
                <p className="hero-description">
                  관리자 계정의 비밀번호를 안전하게 변경할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section className="content-section modern-card">
              <div className="card-content">
                <div className="form-container">
                  <h2 className="form-title">사이트관리자 암호변경</h2>
                  
                  <div className="form-group">
                    <label htmlFor="oldPassword" className="form-label">
                      기존 암호
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input
                        className="form-input"
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="기존 암호를 입력하세요"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">
                      신규 암호
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input
                        className="form-input"
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="새로운 암호를 입력하세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      입력 확인
                      <span className="required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input
                        className="form-input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="새로운 암호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      className={`action-button primary ${isLoading ? 'loading' : ''}`}
                      onClick={() => updateAdminPassword()}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="loading-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                          </svg>
                          변경 중...
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4"></path>
                            <path d="M21 12c-1 0-2-.4-2-1s1-2 2-2 2 1.6 2 2-1 1-2 1z"></path>
                            <path d="M3 12c1 0 2-.4 2-1s-1-2-2-2-2 1.6-2 2 1 1 2 1z"></path>
                          </svg>
                          변경
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Page Styles - Consistent with other pages */
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

        .breadcrumb-home,
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-md);
          transition: all 0.2s ease;
        }

        .breadcrumb-home:hover,
        .breadcrumb-link:hover {
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
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 2rem;
          align-items: start;
        }

        .modern-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .content-hero {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .hero-icon svg {
          width: 24px;
          height: 24px;
        }

        .hero-title {
          margin: 0 0 0.75rem;
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          margin: 0;
          font-size: 1rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        .content-section {
          background: white;
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .card-content {
          padding: 1.5rem;
        }

        /* Form Styles */
        .form-container {
          max-width: 500px;
          margin: 0 auto;
        }

        .form-title {
          margin: 0 0 2rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
        }

        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          width: 20px;
          height: 20px;
          color: var(--gray-400);
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          color: var(--gray-700);
          background: white;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
        }

        .form-input::placeholder {
          color: var(--gray-400);
        }

        .form-actions {
          margin-top: 2rem;
          text-align: center;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--gray-700);
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 120px;
          justify-content: center;
        }

        .action-button:hover:not(:disabled) {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-1px);
        }

        .action-button.primary {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        .action-button.primary:hover:not(:disabled) {
          background: var(--dark-blue);
          border-color: var(--dark-blue);
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .action-button svg {
          width: 16px;
          height: 16px;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .content-hero {
            padding: 1.5rem 0;
          }

          .hero-title {
            font-size: 1.625rem;
          }

          .card-content {
            padding: 1rem;
          }

          .form-container {
            max-width: none;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

          .form-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAdminPasswordUpdate;
