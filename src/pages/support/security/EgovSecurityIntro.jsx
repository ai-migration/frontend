import EgovLeftNavSecurity from "@/components/leftmenu/EgovLeftNavSecurity";
import { Link } from "react-router-dom";
import "@/css/modern-styles.css";

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
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h1 className="hero-title">AI 보안기 기능 소개</h1>
                <p className="hero-description">
                  AI 보안기는 업로드된 코드에 대해 자동으로 보안 분석을 수행하고, 취약점 탐지 및 해결 제안을 제공합니다.
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
                  <h2>서비스 개요</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="overview-description">
                  <p>
                    AI 보안기는 최신 정적 분석 기술과 머신러닝 알고리즘을 활용하여 소스코드의 보안 취약점을 
                    자동으로 탐지하고 분석합니다. OWASP Top 10, CWE 등 국제 보안 표준을 기반으로 
                    체계적인 보안 진단을 수행하며, 개발자가 쉽게 이해할 수 있는 상세한 개선 방안을 제공합니다.
                  </p>
                </div>
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
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>보안 취약점 탐지</h3>
                      <p>정적 분석을 통해 코드 내의 위험 요소를 자동으로 감지하고 분류합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>AI 기반 보안 제안</h3>
                      <p>탐지된 취약점에 따라 자동으로 보완 가이드를 생성하고 수정 방안을 제시합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>결과 리포트 제공</h3>
                      <p>전체 분석 결과를 시각화된 리포트로 제공하여 쉽게 이해할 수 있습니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>분석 이력 저장 및 다운로드</h3>
                      <p>분석 결과를 ZIP으로 압축하여 다운로드하고 이력을 관리할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Standards Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
                    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
                    <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"></path>
                  </svg>
                  <h2>보안 표준 기반 분석</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="architecture-layers">
                  <div className="layer-item">
                    <div className="layer-number">01</div>
                    <div className="layer-content">
                      <h4>OWASP Top 10 기반 분석</h4>
                      <p>웹 애플리케이션 보안의 가장 중요한 10가지 위험요소를 중심으로 분석합니다.</p>
                      <div className="layer-tags">
                        <span className="tag">Injection</span>
                        <span className="tag">XSS</span>
                        <span className="tag">CSRF</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">02</div>
                    <div className="layer-content">
                      <h4>CWE 분류 체계 적용</h4>
                      <p>Common Weakness Enumeration 기준으로 취약점을 체계적으로 분류합니다.</p>
                      <div className="layer-tags">
                        <span className="tag">Buffer Overflow</span>
                        <span className="tag">SQL Injection</span>
                        <span className="tag">Path Traversal</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">03</div>
                    <div className="layer-content">
                      <h4>SANS Top 25 검증</h4>
                      <p>가장 위험한 소프트웨어 오류 25가지를 기준으로 코드 품질을 검증합니다.</p>
                      <div className="layer-tags">
                        <span className="tag">Memory Safety</span>
                        <span className="tag">Input Validation</span>
                        <span className="tag">Access Control</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">04</div>
                    <div className="layer-content">
                      <h4>한국형 보안 가이드</h4>
                      <p>국내 보안 정책과 전자정부 보안 가이드라인을 반영한 맞춤형 분석을 제공합니다.</p>
                      <div className="layer-tags">
                        <span className="tag">K-ISMS</span>
                        <span className="tag">개인정보보호</span>
                        <span className="tag">전자정부법</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Analysis Process Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>분석 프로세스</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="getting-started-steps">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>파일 업로드</h4>
                      <p>분석할 소스코드를 ZIP 파일 형태로 업로드합니다. (최대 20MB, 10개 파일)</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>AI 보안 분석</h4>
                      <p>정적 분석 도구와 AI 모델이 코드의 보안 취약점을 자동으로 검사합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>취약점 분류 및 평가</h4>
                      <p>탐지된 취약점을 위험도별로 분류하고 영향도를 평가합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>개선 방안 제시</h4>
                      <p>각 취약점에 대한 구체적인 수정 방법과 보안 가이드를 제공합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Information Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>지원 정보</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="resources-grid">
                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>지원 파일 형식</h4>
                      <p>ZIP 파일 형태로 업로드 가능하며, 다양한 프로그래밍 언어를 지원합니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>파일 크기 제한</h4>
                      <p>최대 20MB까지 업로드 가능하며, 한 번에 최대 10개 파일까지 처리할 수 있습니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>분석 성능</h4>
                      <p>대부분의 프로젝트는 5분 이내에 분석이 완료되며, 실시간 진행상황을 확인할 수 있습니다.</p>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>기술 지원</h4>
                      <p>분석 결과에 대한 문의나 추가 지원이 필요한 경우 전문가 상담을 제공합니다.</p>
                    </div>
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
          gap: 2rem;
        }

        .content-hero {
          text-align: center;
          padding: 3rem 0;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          border-radius: var(--border-radius-2xl);
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
          margin: 0 0 1rem;
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, #DC2626, #EF4444);
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

        .content-section {
          background: white;
          border-radius: var(--border-radius-2xl);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, 
            rgba(220, 38, 38, 0.05) 0%, 
            rgba(255, 255, 255, 1) 100%);
          border-bottom: 1px solid var(--gray-200);
        }

        .header-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-icon svg {
          width: 20px;
          height: 20px;
          color: #DC2626;
        }

        .header-icon h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .card-content {
          padding: 2rem;
        }

        /* Overview Description */
        .overview-description p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--gray-700);
          margin: 0;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
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
          background: linear-gradient(135deg, #DC2626, #EF4444);
          border-radius: var(--border-radius-lg);
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
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .feature-content p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--gray-600);
          line-height: 1.5;
        }

        /* Architecture Layers */
        .architecture-layers {
          display: grid;
          gap: 1.5rem;
        }

        .layer-item {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .layer-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .layer-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          border-radius: var(--border-radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .layer-content {
          flex: 1;
        }

        .layer-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .layer-content p {
          margin: 0 0 1rem;
          color: var(--gray-600);
          line-height: 1.5;
        }

        .layer-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          padding: 0.25rem 0.75rem;
          background: #DC2626;
          color: white;
          border-radius: var(--border-radius-md);
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Getting Started Steps */
        .getting-started-steps {
          display: grid;
          gap: 1rem;
        }

        .step-item {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .step-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .step-content p {
          margin: 0;
          color: var(--gray-600);
          line-height: 1.5;
        }

        /* Resources Grid */
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .resource-item {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .resource-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .resource-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          border-radius: var(--border-radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1rem;
          flex-shrink: 0;
        }

        .resource-icon svg {
          width: 20px;
          height: 20px;
        }

        .resource-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .resource-content p {
          margin: 0 0 1rem;
          color: var(--gray-600);
          line-height: 1.5;
          flex: 1;
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

          .resources-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .hero-title {
            font-size: 1.875rem;
          }

          .card-content {
            padding: 1.5rem;
          }

          .card-header {
            padding: 1rem 1.5rem;
          }

          .feature-item,
          .layer-item,
          .step-item {
            flex-direction: column;
            text-align: center;
          }

          .layer-item {
            text-align: left;
          }

          .resource-item {
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .card-content {
            padding: 1rem;
          }

          .card-header {
            padding: 0.875rem 1rem;
          }

          .header-icon h2 {
            font-size: 1.125rem;
          }

          .feature-item,
          .layer-item,
          .step-item,
          .resource-item {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovSecurityIntro;
