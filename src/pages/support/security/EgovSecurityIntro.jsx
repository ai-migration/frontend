import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";
import "@/css/modern-styles.css";
import "@/css/visual-effects.css";

function EgovSecurityIntro() {
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
            <Link to="/support" className="breadcrumb-link">AI 보안기</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">기능 소개</span>
          </div>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNavSecurity />

          {/* Main Content */}
          <main className="modern-content">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h1 className="hero-title">AI 보안기</h1>
                <p className="hero-description">코드 보안 분석과 취약점 탐지를 위한 AI 기반 도구입니다</p>
              </div>
            </section>

            {/* Content Section */}
            <section className="content-section">
              <div className="info-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h2 className="card-title">기능 소개</h2>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    AI 보안기는 업로드된 코드에 대해 자동으로 <strong>보안 분석</strong>을 수행하고, <strong>취약점 탐지</strong> 및 <strong>해결 제안</strong>을 제공합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="content-section">
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <h3 className="feature-title">보안 취약점 탐지</h3>
                  <p className="feature-desc">정적 분석을 통해 코드 내의 위험 요소를 자동 감지합니다</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">AI 기반 보안 제안</h3>
                  <p className="feature-desc">탐지된 취약점에 따라 자동으로 보완 가이드를 생성합니다</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="feature-title">결과 리포트 제공</h3>
                  <p className="feature-desc">전체 분석 결과를 시각화된 리포트로 제공합니다</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7,10 12,15 17,10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <h3 className="feature-title">분석 이력 저장 및 다운로드</h3>
                  <p className="feature-desc">분석 결과를 ZIP으로 압축하여 다운로드할 수 있습니다</p>
                </div>
              </div>
            </section>

            {/* Notice Section */}
            <section className="content-section">
              <div className="notice-highlight">
                <div className="notice-content">
                  <h3 className="notice-title">이용 안내</h3>
                  <p className="notice-desc">
                    보안 분석은 업로드된 .zip 파일 기반으로 수행되며, 최대 20MB, 10개까지 지원합니다.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
export default EgovSecurityIntro;
