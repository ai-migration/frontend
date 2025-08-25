import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import "@/css/modern-styles.css";

function EgovSupportIntro() {
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
            <Link to="/support" className="breadcrumb-link">AI 변환기</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">기능 소개</span>
          </div>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNavTransform />

          {/* Main Content */}
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-header">
                  <div className="hero-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                      <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                      <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                    </svg>
                  </div>
                  <h1 className="hero-title">AI 변환기 기능 소개</h1>
                </div>
                <p className="hero-description">
                  AI 변환기는 사용자가 업로드한 코드를 <strong>전자정부표준프레임워크(eGovFrame)</strong> 구조에 맞춰 자동으로 변환해주는 도구입니다.
                </p>
              </div>
            </section>

            {/* Key Features Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <h2>주요 기능</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6"></polyline>
                        <polyline points="8,6 2,12 8,18"></polyline>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>자동 프레임워크 전환</h3>
                      <p>기존의 일반 Spring, FastAPI, Flask 등의 코드 구조를 전자정부프레임워크 구조에 맞춰 재구성합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>기능 인식 및 모듈 매핑</h3>
                      <p>업로드된 코드에서 REST API, DB 연동, 서비스 로직 등을 인식하여 eGovFrame 모듈로 자동 매핑합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>보안 템플릿 적용</h3>
                      <p>보안에 취약한 코드 패턴을 탐지하고, eGovFrame 보안 코딩 가이드를 기반으로 수정 제안을 반영합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>테스트 코드 변환 지원</h3>
                      <p>단위 테스트 코드를 함께 변환하거나, JUnit 기반으로 변환된 테스트 코드를 제공합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>사용 방법</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="getting-started-steps">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>파일 업로드</h4>
                      <p>변환할 소스코드를 ZIP 파일 형태로 업로드합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>AI 분석 및 변환</h4>
                      <p>AI 모델이 코드 구조를 분석하고 eGovFrame 구조로 자동 변환합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>결과 확인 및 다운로드</h4>
                      <p>변환된 결과를 확인하고 ZIP 파일로 다운로드합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>품질 검증</h4>
                      <p>변환된 코드의 품질과 동작을 테스트하여 검증합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>사용 팁</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="resources-grid">
                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>정확한 코드 업로드</h4>
                      <p>변환 품질을 높이기 위해 완전하고 정확한 소스코드를 업로드해주세요.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>기능 명세 작성</h4>
                      <p>코드의 주요 기능과 목적을 명확히 기술하면 더 정확한 변환이 가능합니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>테스트 코드 포함</h4>
                      <p>기존 테스트 코드를 함께 업로드하면 변환된 코드의 검증이 용이합니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>결과 검토</h4>
                      <p>변환 결과를 다운로드한 후 반드시 코드 검토와 테스트를 수행해주세요.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Page Styles - Matching EgovAboutSite */
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
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .hero-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hero-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .hero-icon svg {
          width: 100%;
          height: 100%;
        }

        .hero-title {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a202c;
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
          width: 16px;
          height: 16px;
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

        /* Features Grid - Horizontal Layout */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 16px;
          height: 16px;
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

        /* Getting Started Steps - Grid Layout */
        .getting-started-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .step-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .step-number {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          flex-shrink: 0;
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

        /* Resources Grid - Horizontal Layout */
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .resource-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .resource-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .resource-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .resource-icon svg {
          width: 16px;
          height: 16px;
        }

        .resource-content h4 {
          margin: 0 0 0.375rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .resource-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
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

          .getting-started-steps {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

          .features-grid {
            grid-template-columns: 1fr;
          }

          .getting-started-steps {
            grid-template-columns: 1fr;
          }

          .resources-grid {
            grid-template-columns: 1fr;
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

          .feature-item,
          .step-item,
          .resource-item {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovSupportIntro;