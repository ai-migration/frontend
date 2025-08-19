import { Link } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutSite() {
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
            <Link to="/about" className="breadcrumb-link">사이트 소개</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">소개</span>
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9,22 9,12 15,12 15,22"></polyline>
                  </svg>
                </div>
                <h1 className="hero-title">AI CODE MIGRATION 소개</h1>
                <p className="hero-description">
                  AI 기반 코드 변환 및 보안 검사 서비스를 제공하는 플랫폼입니다. 
                  전자정부표준프레임워크와 연계하여 안전하고 효율적인 개발 환경을 지원합니다.
                </p>
              </div>
            </section>

            {/* Service Introduction */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">서비스 소개</h2>
                <div className="section-divider"></div>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">AI 변환기</h3>
                  <p className="feature-desc">Python, Java 등 다양한 언어 간 자동 변환 서비스</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 className="feature-title">AI 보안기</h3>
                  <p className="feature-desc">코드 취약점 분석 및 보안 진단 서비스</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                    </svg>
                  </div>
                  <h3 className="feature-title">가이드 제공</h3>
                  <p className="feature-desc">전자정부프레임워크 활용 가이드 및 지원</p>
                </div>
              </div>
            </section>

            {/* Framework Introduction */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">전자정부표준프레임워크 연계</h2>
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
                  <h3 className="card-title">표준 프레임워크 기반</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    본 플랫폼은 전자정부 표준 프레임워크 기반으로 구축되어 안정성과 호환성을 보장합니다.
                    AI 기술과 표준 프레임워크의 결합으로 효율적이고 안전한 개발 환경을 제공하며,
                    정부 표준을 준수하는 고품질 소프트웨어 개발을 지원합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">전자정부 서비스 품질향상 및 정보화투자 효율성 향상</h2>
                <div className="section-divider"></div>
              </div>

              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">국가 정보화 투자효율성 제고</h3>
                  <p className="benefit-desc">표준화를 통한 중복 투자 방지 및 효율적 자원 활용</p>
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
                  <h3 className="benefit-title">중소SI업체 경쟁력 확보</h3>
                  <p className="benefit-desc">공정한 경쟁 환경 조성 및 기술 종속성 해결</p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <h3 className="benefit-title">선진 국가정보화 기반환경 제공</h3>
                  <p className="benefit-desc">최신 기술 기반의 안정적이고 확장 가능한 인프라</p>
                </div>
              </div>

              <div className="framework-highlight">
                <div className="highlight-content">
                  <h3 className="highlight-title">전자정부표준프레임워크 활용</h3>
                  <p className="highlight-desc">표준화된 개발 환경으로 품질 향상과 효율성 증대를 실현합니다</p>
                </div>
              </div>
            </section>

            {/* Issues Section */}
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">전자정부표준프레임워크 구축 및 적용 요구</h2>
                <div className="section-divider"></div>
              </div>

              <div className="issues-grid">
                <div className="issue-card">
                  <div className="issue-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="issue-title">특정업체 종속성 발생</h3>
                  <p className="issue-desc">공정경쟁 저하 및 사업자 변경 시 예산낭비 문제</p>
                </div>

                <div className="issue-card">
                  <div className="issue-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path>
                    </svg>
                  </div>
                  <h3 className="issue-title">개별적인 정보화 사업추진</h3>
                  <p className="issue-desc">기관별/사업별 중복개발로 인한 비효율성</p>
                </div>

                <div className="issue-card">
                  <div className="issue-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h3 className="issue-title">상호 운용성 부족</h3>
                  <p className="issue-desc">표준화된 공통 개발기반 부재로 재사용성 저하</p>
                </div>
              </div>

              <div className="solution-highlight">
                <div className="solution-content">
                  <h3 className="solution-title">해결방안</h3>
                  <p className="solution-desc">
                    전자정부표준프레임워크는 응용SW의 구성기반이 되며 응용SW실행 시 필요한 기본 기능을 제공하는 환경으로,
                    특정 대기업의 프레임워크 종속성을 해결하고 전자정부 서비스의 품질향상 및 정보화 투자 효율성 향상을 목표로 합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Background Section */}
            <section className="content-section">
              <div className="info-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                  <h3 className="card-title">배경</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    현재 전자정부는 유사한 기능을 가지는 다양한 종류 및 버전의 프레임워크를 개별 시스템 단위로 적용/관리하고 있으며, 
                    이에 따라 다양한 문제점들이 발생하고 있습니다. 전자정부에 적용된 개발프레임워크는 Black Box 형태로 제공되어 
                    사업자의 기술지원 없이는 응용 SW를 유지보수하기 어렵기 때문에 사업자에 대한 의존성이 발생합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="content-section">
              <div className="info-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="card-title">특징</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    전자정부의 프레임워크 표준화는 사업자 고유 개발 프레임워크에 대한 기술 종속성을 배제하고 표준화를 통해 
                    응용 SW의 표준화와 품질, 재사용성을 향상시키며, 개발 프레임워크의 유지 보수 단일화를 통한 투자 효율성을 높입니다.
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

export default EgovAboutSite;
