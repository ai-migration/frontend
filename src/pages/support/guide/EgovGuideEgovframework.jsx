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
                    전자정부프레임워크는 대한민국의 공공기관에서 사용하는 표준 개발 프레임워크입니다.
                    효율적이고 안전한 전자정부 서비스 개발을 위한 다양한 기능과 도구를 제공합니다.
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
                  <h2>주요 특징</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>보안성</h3>
                      <p>공공기관의 엄격한 보안 요구사항을 만족하는 보안 기능들을 내장하고 있습니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                        <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                        <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>표준화</h3>
                      <p>공통 컴포넌트와 표준화된 개발 방법론을 통해 일관된 개발 환경을 제공합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>성능 최적화</h3>
                      <p>대용량 트래픽 처리와 높은 가용성을 보장하는 성능 최적화 기능을 제공합니다.</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h3>테스트 지원</h3>
                      <p>단위 테스트, 통합 테스트를 위한 테스트 프레임워크와 도구를 제공합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Architecture Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
                    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
                    <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"></path>
                  </svg>
                  <h2>아키텍처 구조</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="architecture-layers">
                  <div className="layer-item">
                    <div className="layer-number">01</div>
                    <div className="layer-content">
                      <h4>프레젠테이션 레이어</h4>
                      <p>사용자 인터페이스와 웹 컨트롤러를 담당하는 레이어입니다.</p>
                      <div className="layer-tags">
                        <span className="tag">Spring MVC</span>
                        <span className="tag">JSP</span>
                        <span className="tag">Tiles</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">02</div>
                    <div className="layer-content">
                      <h4>비즈니스 레이어</h4>
                      <p>업무 로직과 트랜잭션 처리를 담당하는 핵심 레이어입니다.</p>
                      <div className="layer-tags">
                        <span className="tag">Spring IoC</span>
                        <span className="tag">AOP</span>
                        <span className="tag">Transaction</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">03</div>
                    <div className="layer-content">
                      <h4>퍼시스턴스 레이어</h4>
                      <p>데이터베이스 연동과 데이터 접근을 담당하는 레이어입니다.</p>
                      <div className="layer-tags">
                        <span className="tag">MyBatis</span>
                        <span className="tag">Hibernate</span>
                        <span className="tag">JPA</span>
                      </div>
                    </div>
                  </div>

                  <div className="layer-item">
                    <div className="layer-number">04</div>
                    <div className="layer-content">
                      <h4>공통 서비스</h4>
                      <p>로깅, 예외처리, 보안 등 공통으로 사용되는 서비스들입니다.</p>
                      <div className="layer-tags">
                        <span className="tag">Logging</span>
                        <span className="tag">Security</span>
                        <span className="tag">Exception</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Getting Started Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>시작하기</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="getting-started-steps">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>개발환경 설정</h4>
                      <p>JDK, Eclipse/IntelliJ, Maven 등 필요한 개발 도구들을 설치하고 설정합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>프로젝트 생성</h4>
                      <p>eGovFrame 개발환경에서 새로운 프로젝트를 생성하거나 기존 템플릿을 활용합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>개발 및 테스트</h4>
                      <p>표준 가이드에 따라 개발하고 내장된 테스트 도구로 품질을 검증합니다.</p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>배포</h4>
                      <p>운영 환경에 배포하고 모니터링 도구를 통해 서비스 상태를 관리합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Resources Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>참고 자료</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="resources-grid">
                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10,8 16,12 10,16 10,8"></polygon>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>개발자 가이드</h4>
                      <p>프레임워크 사용법과 개발 가이드라인을 상세히 설명합니다.</p>
                      <a href="#" className="resource-link">
                        바로가기
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6"></polyline>
                        <polyline points="8,6 2,12 8,18"></polyline>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>API 레퍼런스</h4>
                      <p>프레임워크에서 제공하는 모든 API의 상세 레퍼런스입니다.</p>
                      <a href="#" className="resource-link">
                        바로가기
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                        </svg>
                      </a>
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
                      <h4>샘플 프로젝트</h4>
                      <p>실제 프로젝트에 활용할 수 있는 다양한 샘플 코드와 예제들입니다.</p>
                      <a href="#" className="resource-link">
                        바로가기
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="resource-item">
                    <div className="resource-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h4>커뮤니티 지원</h4>
                      <p>개발자 커뮤니티와 기술 지원을 통해 문제 해결을 도와드립니다.</p>
                      <a href="#" className="resource-link">
                        바로가기
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                        </svg>
                      </a>
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
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
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
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
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
          background: var(--primary-blue);
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
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
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
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
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

        .resource-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .resource-link:hover {
          color: var(--dark-blue);
          transform: translateX(4px);
        }

        .resource-link svg {
          width: 14px;
          height: 14px;
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

export default EgovGuideEgovframework;