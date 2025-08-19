import { Link, useNavigate } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";
import "@/css/modern-styles.css";

function EgovIntroSecurity() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/support/security/scan");
  };

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
            <Link to="/intro" className="breadcrumb-link">정보마당</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">AI 보안기 소개</span>
          </div>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNav />

          {/* Main Content */}
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h1 className="hero-title">AI 보안기 소개</h1>
                <p className="hero-description">
                  코드의 취약점을 분석하고 보안 이슈를 진단하여 안전한 소프트웨어를 개발할 수 있도록 지원하는 AI 보안 서비스입니다.
                </p>
                <div className="hero-actions">
                  <button onClick={handleNavigate} className="hero-cta-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    보안 진단받기
                  </button>
                </div>
              </div>
            </section>

            {/* Overview Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">서비스 개요</h2>
                <div className="section-divider"></div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="card-title">AI 기반 보안 진단</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    보안 서비스는 코드의 취약점을 분석하고 보안 이슈를 진단하여 안전한 소프트웨어를 개발할 수 있도록 지원합니다.
                    최신 AI 기술을 활용하여 정확하고 포괄적인 보안 분석을 제공하며, 개발자가 쉽게 이해할 수 있는 상세한 보고서를 생성합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">주요 기능</h2>
                <div className="section-divider"></div>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">정적 분석 도구</h3>
                  <p className="feature-desc">코드 실행 없이 소스 코드를 분석하여 보안 취약점을 탐지</p>
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
                  <h3 className="feature-title">보안 보고서 자동 생성</h3>
                  <p className="feature-desc">진단 결과를 종합하여 상세한 보안 보고서를 자동으로 생성</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                      <path d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"></path>
                      <circle cx="12" cy="11" r="2"></circle>
                    </svg>
                  </div>
                  <h3 className="feature-title">진단 결과 이력 관리</h3>
                  <p className="feature-desc">과거 진단 이력을 체계적으로 관리하고 추적 가능</p>
                </div>
              </div>
            </section>

            {/* Security Types Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">보안 진단 영역</h2>
                <div className="section-divider"></div>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="benefit-title">취약점 탐지</h3>
                  <p className="benefit-desc">SQL 인젝션, XSS, CSRF 등 주요 보안 취약점 탐지</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <circle cx="12" cy="16" r="1"></circle>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">데이터 보호</h3>
                  <p className="benefit-desc">개인정보 및 민감 데이터 처리 보안 검증</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      <path d="M9 14l2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">코딩 표준 준수</h3>
                  <p className="benefit-desc">보안 코딩 가이드라인 및 표준 준수 여부 검증</p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="content-section">
              <div className="framework-highlight">
                <div className="highlight-content">
                  <h3 className="highlight-title">AI 보안기의 장점</h3>
                  <p className="highlight-desc">
                    • 실시간 보안 취약점 탐지로 개발 단계에서 보안 이슈 해결<br/>
                    • 자동화된 보안 검사로 개발 효율성 향상<br/>
                    • 상세한 보안 보고서로 문제점과 해결방안 명확 제시<br/>
                    • 지속적인 보안 모니터링을 통한 안전한 소프트웨어 개발 지원
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

export default EgovIntroSecurity;
