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
                <h1 className="hero-title">프로젝트 소개</h1>
                <p className="hero-description">
                  표준프레임워크 경량환경의 개요와 연혁, 조직소개, 표준프레임워크센터의 약도 등의 정보를 제공하고 있습니다.
                </p>
              </div>
            </section>

            {/* Overview Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h2>프레임워크 개요</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="overview-description">
                  <p>
                    전자정부 표준 프레임워크는 응용SW의 구성기반이 되며 응용SW실행 시 필요한 기본 기능을 제공하는 환경입니다.
                    전자정부 서비스의 품질향상 및 정보화 투자 효율성 향상을 위해 개발 프레임워크 표준을 정립하고, 
                    개발 프레임워크 표준 적용을 통한 응용 SW의 표준화 및 품질과 재사용성 향상을 목표로 합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Benefits Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <h2>주요 효과</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>국가 정보화 투자효율성 제고</h3>
                      <p>표준화를 통한 중복 투자 방지 및 효율적 자원 활용을 실현합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>중소SI업체 경쟁력 확보</h3>
                      <p>공정한 경쟁 환경 조성 및 기술 종속성 해결을 지원합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>선진 국가정보화 기반환경 제공</h3>
                      <p>최신 기술 기반의 안정적이고 확장 가능한 인프라를 제공합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Issues Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h2>해결해야 할 문제점</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="architecture-layers">
                  <div className="layer-item">
                    <div className="layer-number">01</div>
                    <div className="layer-content">
                      <h4>특정업체 종속성 발생</h4>
                      <p>공정경쟁 저하 및 사업자 변경 시 예산낭비 문제가 발생하고 있습니다.</p>
                      <div className="layer-tags">
                        <span className="tag danger">종속성</span>
                        <span className="tag danger">예산낭비</span>
                        <span className="tag danger">경쟁력 저하</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">02</div>
                    <div className="layer-content">
                      <h4>개별적인 정보화 사업추진</h4>
                      <p>기관별/사업별 중복개발로 인한 비효율성이 증가하고 있습니다.</p>
                      <div className="layer-tags">
                        <span className="tag warning">중복개발</span>
                        <span className="tag warning">비효율성</span>
                        <span className="tag warning">자원낭비</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">03</div>
                    <div className="layer-content">
                      <h4>상호 운용성 부족</h4>
                      <p>표준화된 공통 개발기반 부재로 재사용성이 저하되고 있습니다.</p>
                      <div className="layer-tags">
                        <span className="tag info">표준화 부재</span>
                        <span className="tag info">재사용성 저하</span>
                        <span className="tag info">호환성 문제</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Solution Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>해결방안</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="getting-started-steps">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>표준화 기반 구축</h4>
                      <p>사업자 고유 개발 프레임워크에 대한 기술 종속성을 배제하고 표준화된 개발 환경을 구축합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>품질 및 재사용성 향상</h4>
                      <p>응용 SW의 표준화와 품질, 재사용성을 향상시켜 개발 효율성을 높입니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>투자 효율성 제고</h4>
                      <p>개발 프레임워크의 유지 보수 단일화를 통한 투자 효율성을 향상시킵니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>지속적인 발전</h4>
                      <p>오픈소스 기반의 지속가능한 프레임워크 생태계를 구축합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Framework Features Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>프레임워크 특징</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="resources-grid">
                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>보안성 강화</h4>
                      <p>공공기관의 엄격한 보안 요구사항을 만족하는 보안 기능들을 내장하고 있습니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                        <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                        <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>표준화 지원</h4>
                      <p>공통 컴포넌트와 표준화된 개발 방법론을 통해 일관된 개발 환경을 제공합니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>성능 최적화</h4>
                      <p>대용량 트래픽 처리와 높은 가용성을 보장하는 성능 최적화 기능을 제공합니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>테스트 지원</h4>
                      <p>단위 테스트, 통합 테스트를 위한 테스트 프레임워크와 도구를 제공합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Page Styles - Compact and Clean */
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
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-lg);
        }

        .hero-icon svg {
          width: 28px;
          height: 28px;
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

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, 
            rgba(0, 0, 255, 0.05) 0%, 
            rgba(255, 255, 255, 1) 100%);
          border-bottom: 1px solid var(--gray-200);
        }

        .header-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-icon svg {
          width: 18px;
          height: 18px;
          color: var(--primary-blue);
        }

        .header-icon h2 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .card-content {
          padding: 1.5rem;
        }

        /* Overview Description */
        .overview-description p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--gray-700);
          margin: 0;
        }

        /* Features Grid - Compact */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          gap: 0.75rem;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 18px;
          height: 18px;
        }

        .feature-content h3 {
          margin: 0 0 0.375rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .feature-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
        }

        /* Process Steps - Compact */
        .process-steps {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
          min-width: 180px;
          max-width: 200px;
        }

        .step-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .step-content h4 {
          margin: 0 0 0.375rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .step-content p {
          margin: 0;
          color: var(--gray-600);
          line-height: 1.4;
          font-size: 0.875rem;
        }

        .step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400);
          flex-shrink: 0;
        }

        .step-arrow svg {
          width: 18px;
          height: 18px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .process-steps {
            flex-direction: column;
            gap: 1rem;
          }

          .step-arrow {
            transform: rotate(90deg);
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
            padding: 1.25rem;
          }

          .card-header {
            padding: 1rem 1.25rem;
          }

          .feature-item {
            flex-direction: column;
            text-align: center;
            padding: 1rem;
          }

          .step-item {
            min-width: auto;
            width: 100%;
            padding: 1rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

          .card-content {
            padding: 1rem;
          }

          .card-header {
            padding: 0.875rem 1rem;
          }

          .header-icon h2 {
            font-size: 1rem;
          }

          .feature-item {
            padding: 0.875rem;
          }

          .step-item {
            padding: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAboutSite;
