import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import "@/css/modern-styles.css";

function EgovSupportViewTest() {
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
            <span className="breadcrumb-current">테스트 이력 조회</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNavTransform />
          
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-header">
                  <div className="hero-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h1 className="hero-title">테스트 이력 조회</h1>
                </div>
                <p className="hero-description">
                  변환된 코드의 자동 테스트 실행 결과를 조회하고 품질을 확인할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Main Content Section */}
            <section className="content-section modern-card">
              <div className="card-content">
                {/* Coming Soon Notice */}
                <div className="coming-soon-container">
                  <div className="coming-soon-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <h2>서비스 준비 중</h2>
                  <p>테스트 이력 조회 기능은 현재 개발 중입니다.<br />곧 더 나은 서비스로 찾아뵙겠습니다.</p>
                </div>

                {/* Feature Preview */}
                <div className="features-preview">
                  <h3>제공 예정 기능</h3>
                  <div className="features-grid">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                        </svg>
                      </div>
                      <div className="feature-content">
                        <h4>자동 테스트 실행</h4>
                        <p>변환된 코드에 대해 자동으로 단위 테스트를 실행하고 결과를 제공합니다.</p>
                      </div>
                    </div>

                    <div className="feature-card">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4"></path>
                          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                        </svg>
                      </div>
                      <div className="feature-content">
                        <h4>품질 분석 리포트</h4>
                        <p>코드 커버리지, 테스트 통과율 등 상세한 품질 분석 결과를 제공합니다.</p>
                      </div>
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
                      <div className="feature-content">
                        <h4>테스트 이력 관리</h4>
                        <p>과거 테스트 실행 이력을 조회하고 변환 품질 개선 추이를 확인할 수 있습니다.</p>
                      </div>
                    </div>

                    <div className="feature-card">
                      <div className="feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      </div>
                      <div className="feature-content">
                        <h4>성능 벤치마크</h4>
                        <p>변환된 코드의 성능을 측정하고 최적화 제안사항을 제공합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="contact-info">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-content">
                    <h4>문의사항이 있으시나요?</h4>
                    <p>테스트 기능에 대한 문의나 요청사항이 있으시면 언제든지 연락주세요.</p>
                    <button className="contact-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      문의하기
                    </button>
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
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-xl);
          flex-shrink: 0;
        }

        .hero-icon svg {
          width: 24px;
          height: 24px;
        }

        .hero-title {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
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

        .card-content {
          padding: 3rem;
        }

        /* Coming Soon Section */
        .coming-soon-container {
          text-align: center;
          padding: 3rem 0;
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: 3rem;
        }

        .coming-soon-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, #FFA726, #FF7043);
          border-radius: var(--border-radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-xl);
        }

        .coming-soon-icon svg {
          width: 60px;
          height: 60px;
        }

        .coming-soon-container h2 {
          margin: 0 0 1rem;
          font-size: 2rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .coming-soon-container p {
          margin: 0;
          font-size: 1.125rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* Features Preview */
        .features-preview h3 {
          margin: 0 0 2rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .feature-card {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .feature-icon svg {
          width: 24px;
          height: 24px;
        }

        .feature-content h4 {
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

        /* Contact Information */
        .contact-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, 
            rgba(0, 0, 255, 0.05) 0%, 
            rgba(255, 255, 255, 1) 100%);
          border-radius: var(--border-radius-xl);
          border: 1px solid rgba(0, 0, 255, 0.1);
        }

        .contact-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .contact-icon svg {
          width: 32px;
          height: 32px;
        }

        .contact-content {
          flex: 1;
        }

        .contact-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .contact-content p {
          margin: 0 0 1rem;
          color: var(--gray-600);
          line-height: 1.5;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: var(--border-radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .contact-btn:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .contact-btn svg {
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

          .contact-info {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .card-content {
            padding: 2rem;
          }

          .coming-soon-container {
            padding: 2rem 0;
          }

          .coming-soon-icon {
            width: 100px;
            height: 100px;
          }

          .coming-soon-icon svg {
            width: 50px;
            height: 50px;
          }

          .coming-soon-container h2 {
            font-size: 1.75rem;
          }

          .feature-card {
            flex-direction: column;
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
            padding: 1.5rem;
          }

          .coming-soon-container h2 {
            font-size: 1.5rem;
          }

          .features-preview h3 {
            font-size: 1.25rem;
          }

          .contact-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovSupportViewTest;