import { Link } from "react-router-dom";

import URL from "@/constants/url";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutHistory() {
  return (
    <div className="modern-page-container">
      <div className="modern-page-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb">
          <div className="breadcrumb-container">
            <Link to={URL.MAIN} className="breadcrumb-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              Home
            </Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <Link to={URL.ABOUT} className="breadcrumb-link">사이트 소개</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">연혁</span>
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
                <h1 className="hero-title">연혁</h1>
                <p className="hero-description">
                  전자정부표준프레임워크의 발전 과정과 주요 이정표를 소개합니다.
                </p>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
                    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
                    <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"></path>
                  </svg>
                  <h2>표준프레임워크센터 설립</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="timeline-container">
                  <div className="timeline-item">
                    <div className="timeline-marker">
                      <div className="timeline-date">2010.11</div>
                    </div>
                    <div className="timeline-content">
                      <h3>표준프레임워크센터 설립</h3>
                      <p>
                        표준프레임워크 활성화 전담조직으로 한국정보화진흥원(NIA)에 
                        「표준프레임워크센터」가 설립되었습니다.
                      </p>
                      <div className="timeline-details">
                        <div className="detail-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>정책지원 및 글로벌 확산 담당 NIA 인력</span>
                        </div>
                        <div className="detail-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <span>R&D 및 기술지원 담당 외부 민간 전문가</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <h2>미션 및 비전</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="mission-grid">
                  <div className="mission-item">
                    <div className="mission-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="mission-content">
                      <h4>미션</h4>
                      <p>전자정부 서비스의 품질향상 및 정보화 투자 효율성 향상</p>
                    </div>
                  </div>

                  <div className="mission-item">
                    <div className="mission-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <div className="mission-content">
                      <h4>비전</h4>
                      <p>개발 프레임워크 표준화를 통한 응용 SW의 표준화 및 품질, 재사용성 향상</p>
                    </div>
                  </div>

                  <div className="mission-item">
                    <div className="mission-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                        <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                        <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                      </svg>
                    </div>
                    <div className="mission-content">
                      <h4>목표</h4>
                      <p>개발 프레임워크의 유지 보수 단일화를 통한 투자 효율성 향상</p>
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
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
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

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
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
          width: 20px;
          height: 20px;
          color: var(--primary-blue);
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

        /* Timeline Styles */
        .timeline-container {
          position: relative;
        }

        .timeline-item {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .timeline-date {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: white;
          border-radius: var(--border-radius-lg);
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .timeline-content {
          flex: 1;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
        }

        .timeline-content h3 {
          margin: 0 0 1rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .timeline-content p {
          margin: 0 0 1.5rem;
          color: var(--gray-700);
          line-height: 1.6;
        }

        .timeline-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: white;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .detail-item svg {
          width: 18px;
          height: 18px;
          color: var(--primary-blue);
          flex-shrink: 0;
        }

        .detail-item span {
          color: var(--gray-700);
          font-size: 0.95rem;
        }

        /* Mission Grid */
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .mission-item {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .mission-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .mission-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: var(--border-radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .mission-icon svg {
          width: 18px;
          height: 18px;
        }

        .mission-content h4 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .mission-content p {
          margin: 0;
          color: var(--gray-600);
          line-height: 1.5;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .timeline-item {
            flex-direction: column;
            gap: 1rem;
          }

          .timeline-marker {
            align-self: flex-start;
          }

          .mission-grid {
            grid-template-columns: 1fr;
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

          .timeline-content {
            padding: 1rem;
          }

          .mission-item {
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

export default EgovAboutHistory;
