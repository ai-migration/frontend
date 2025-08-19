import { Link, useNavigate } from "react-router-dom";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavIntro";
import "@/css/modern-styles.css";

function EgovIntroSecurity() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/support/security/scan"); // 원하는 보안 진단 페이지 경로로 수정
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
            <span className="breadcrumb-current">보안 소개</span>
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h1 className="hero-title">보안 소개</h1>
                <p className="hero-description">
                  코드의 취약점을 분석하고 보안 이슈를 진단하여 안전한 소프트웨어 개발을 지원합니다.
                </p>
                <button onClick={handleNavigate} className="cta-button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  보안 진단받기
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
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
                    보안 서비스는 최신 정적 분석 도구와 AI 기반 취약점 탐지 기술을 활용하여 
                    코드의 보안 위험요소를 사전에 식별하고 개선 방안을 제시합니다. 
                    개발 단계에서부터 보안을 고려한 안전한 소프트웨어 개발을 지원합니다.
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
                      <h3>정적 분석 점검</h3>
                      <p>코드를 실행하지 않고도 소스코드 분석을 통해 잠재적인 보안 취약점을 사전에 탐지합니다.</p>
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
                      <h3>자동 보고서 생성</h3>
                      <p>진단 결과를 바탕으로 상세한 보안 보고서를 자동으로 생성하여 개선 방안을 제시합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>진단 이력 관리</h3>
                      <p>과거 진단 결과를 체계적으로 관리하고 보안 개선 추이를 추적할 수 있습니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>실시간 위협 탐지</h3>
                      <p>최신 보안 위협 패턴을 학습한 AI 모델로 새로운 취약점을 실시간으로 탐지합니다.</p>
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
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  </svg>
                  <h2>보안 표준 준수</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="standards-grid">
                  <div className="standard-item">
                    <div className="standard-badge">OWASP</div>
                    <div className="standard-content">
                      <h4>OWASP Top 10</h4>
                      <p>웹 애플리케이션 보안의 가장 중요한 10가지 위험요소를 기준으로 진단합니다.</p>
                    </div>
                  </div>

                  <div className="standard-item">
                    <div className="standard-badge">CWE</div>
                    <div className="standard-content">
                      <h4>Common Weakness Enumeration</h4>
                      <p>소프트웨어 취약점의 공통 분류 체계를 기반으로 체계적인 분석을 수행합니다.</p>
                    </div>
                  </div>

                  <div className="standard-item">
                    <div className="standard-badge">SANS</div>
                    <div className="standard-content">
                      <h4>SANS Top 25</h4>
                      <p>가장 위험한 소프트웨어 오류 25가지를 중심으로 코드 품질을 검증합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>진단 프로세스</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="process-steps">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>코드 업로드</h4>
                      <p>분석할 소스코드를 ZIP 파일 형태로 업로드합니다.</p>
                    </div>
                  </div>

                  <div className="step-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>자동 분석</h4>
                      <p>AI 기반 정적 분석 도구가 코드의 보안 취약점을 자동으로 검사합니다.</p>
                    </div>
                  </div>

                  <div className="step-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>결과 확인</h4>
                      <p>상세한 진단 보고서와 개선 권고사항을 확인할 수 있습니다.</p>
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
          margin: 0 0 2rem;
          font-size: 1.125rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          color: white;
          border: none;
          border-radius: var(--border-radius-xl);
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-lg);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
          background: linear-gradient(135deg, #B91C1C, #DC2626);
        }

        .cta-button svg {
          width: 18px;
          height: 18px;
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

        /* Standards Grid */
        .standards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .standard-item {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .standard-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .standard-badge {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          color: white;
          border-radius: var(--border-radius-lg);
          font-weight: 700;
          font-size: 0.875rem;
          flex-shrink: 0;
          height: fit-content;
        }

        .standard-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .standard-content p {
          margin: 0;
          color: var(--gray-600);
          line-height: 1.5;
        }

        /* Process Steps */
        .process-steps {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .step-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .step-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #DC2626, #EF4444);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.125rem;
          margin-bottom: 1rem;
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
          font-size: 0.95rem;
        }

        .step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400);
        }

        .step-arrow svg {
          width: 24px;
          height: 24px;
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

          .standards-grid {
            grid-template-columns: 1fr;
          }

          .process-steps {
            flex-direction: column;
          }

          .step-arrow {
            transform: rotate(90deg);
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
          .standard-item {
            flex-direction: column;
            text-align: center;
          }

          .step-item {
            min-width: auto;
            width: 100%;
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
        }
      `}</style>
    </div>
  );
}

export default EgovIntroSecurity;
