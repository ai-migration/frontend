import { Link, useNavigate } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";
import "@/css/modern-styles.css";

function EgovIntroTransform() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/support/transform/transformation");
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
            <span className="breadcrumb-current">AI 변환기 소개</span>
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                    <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                    <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                  </svg>
                </div>
                <h1 className="hero-title">AI 변환기 소개</h1>
                <p className="hero-description">
                  Python, Java 등 다양한 언어 간의 변환을 지원하며, AI 기반 모델을 활용한 코드 변환 서비스입니다.
                </p>
                <div className="hero-actions">
                  <button onClick={handleNavigate} className="hero-cta-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    변환하러 가기
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
                  <h3 className="card-title">AI 기반 코드 변환</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    변환 서비스는 Python, Java 등 다양한 언어 간의 변환을 지원하며,
                    코드 품질 향상과 유지보수를 쉽게 할 수 있도록 AI 기반 모델을 활용합니다.
                    최신 머신러닝 기술을 통해 정확하고 효율적인 코드 변환을 제공합니다.
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
                      <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">코드 자동 변환</h3>
                  <p className="feature-desc">AI 기반 알고리즘을 통한 정확하고 빠른 언어 간 코드 변환</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v10l3-3 1.4 1.4-5.4 5.4-5.4-5.4L7 10l3 3V3h2zm-7 16h14v2H5v-2z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">변환 결과 다운로드</h3>
                  <p className="feature-desc">변환된 코드를 다양한 형태로 다운로드하여 즉시 활용 가능</p>
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
                  <h3 className="feature-title">이력 조회 및 테스트</h3>
                  <p className="feature-desc">변환 이력 관리와 테스트 결과를 통한 품질 보증</p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">서비스 장점</h2>
                <div className="section-divider"></div>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">개발 효율성 향상</h3>
                  <p className="benefit-desc">수동 변환 작업을 자동화하여 개발 시간 단축</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">코드 품질 보장</h3>
                  <p className="benefit-desc">AI 모델을 통한 정확한 문법 변환 및 최적화</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                  <h3 className="benefit-title">시간 절약</h3>
                  <p className="benefit-desc">빠른 변환 속도로 프로젝트 일정 단축</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EgovIntroTransform;
