import { Link } from "react-router-dom";
import EgovLeftNavGuide from "@/components/leftmenu/EgovLeftNavGuide";
import "@/css/modern-styles.css";

function EgovGuideEgovframework() {
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
            <Link to="/support" className="breadcrumb-link">고객지원</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">전자정부프레임워크 가이드</span>
          </div>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNavGuide />

          {/* Main Content */}
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <h1 className="hero-title">전자정부프레임워크 가이드</h1>
                <p className="hero-description">
                  전자정부프레임워크에 대한 사용 가이드를 안내합니다.
                </p>
              </div>
            </section>

            {/* Overview Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">프레임워크 개요</h2>
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
                  <h3 className="card-title">전자정부 표준 프레임워크</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    전자정부프레임워크는 대한민국의 공공기관에서 사용하는 표준 개발 프레임워크입니다.
                    효율적이고 안전한 전자정부 서비스 개발을 위한 다양한 기능과 도구를 제공하며,
                    개발 생산성 향상과 표준화된 개발 환경을 통해 품질 높은 전자정부 서비스를 구축할 수 있도록 지원합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Architecture Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">프레임워크 구조</h2>
                <div className="section-divider"></div>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">실행환경 (Runtime Environment)</h3>
                  <p className="feature-desc">애플리케이션이 구동되는 기반 환경을 제공하는 실행 기반 서비스</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">개발환경 (Development Environment)</h3>
                  <p className="feature-desc">개발자의 편의성을 위한 개발, 테스트, 배포 도구 및 환경</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">운영환경 (Management Environment)</h3>
                  <p className="feature-desc">시스템 운영을 위한 관리 도구 및 모니터링 환경</p>
                </div>
              </div>
            </section>

            {/* Core Services Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">핵심 서비스</h2>
                <div className="section-divider"></div>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">데이터 처리</h3>
                  <p className="benefit-desc">데이터베이스 연결, 트랜잭션 관리, 데이터 접근 추상화</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">보안</h3>
                  <p className="benefit-desc">인증, 권한관리, 암호화, 로그인/로그아웃 처리</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                      <path d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">화면처리</h3>
                  <p className="benefit-desc">MVC 패턴 기반 웹 애플리케이션 개발 지원</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">업무처리</h3>
                  <p className="benefit-desc">업무 로직 구현을 위한 공통 컴포넌트 및 유틸리티</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">연계통합</h3>
                  <p className="benefit-desc">시스템 간 연계 및 통합을 위한 인터페이스 제공</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="benefit-title">배치처리</h3>
                  <p className="benefit-desc">대용량 데이터 처리 및 스케줄링 기반 배치 작업</p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">도입 효과</h2>
                <div className="section-divider"></div>
              </div>

              <div className="framework-highlight">
                <div className="highlight-content">
                  <h3 className="highlight-title">전자정부프레임워크 도입 효과</h3>
                  <p className="highlight-desc">
                    • <strong>개발 생산성 향상:</strong> 표준화된 개발 환경으로 개발 시간 단축<br/>
                    • <strong>품질 향상:</strong> 검증된 프레임워크 사용으로 안정성 확보<br/>
                    • <strong>유지보수 효율성:</strong> 표준화된 구조로 유지보수 비용 절감<br/>
                    • <strong>기술 종속성 해결:</strong> 오픈소스 기반으로 특정 업체 종속성 제거<br/>
                    • <strong>호환성 보장:</strong> 정부 표준 준수로 시스템 간 호환성 확보
                  </p>
                </div>
              </div>
            </section>

            {/* Getting Started Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">시작하기</h2>
                <div className="section-divider"></div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3 8-8"></path>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.6 1.99"></path>
                    </svg>
                  </div>
                  <h3 className="card-title">개발 환경 구성</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    전자정부프레임워크를 사용하기 위해서는 Java 개발환경(JDK 1.8 이상), 
                    이클립스 기반 개발도구, Maven 또는 Gradle 빌드 도구가 필요합니다.
                    공식 홈페이지에서 제공하는 개발환경 구성 가이드를 참고하여 환경을 설정할 수 있습니다.
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
export default EgovGuideEgovframework;