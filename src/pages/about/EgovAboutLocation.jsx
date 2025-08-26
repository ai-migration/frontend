import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutLocation() {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className="modern-page-container">
      <div className="modern-page-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb">
          <ul className="breadcrumb-container">
            <li>
              <Link to="/" className="breadcrumb-home">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                홈
              </Link>
            </li>
            <li>
              <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </li>
            <li>
              <Link to="/about" className="breadcrumb-link">사이트소개</Link>
            </li>
            <li>
              <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </li>
            <li>
              <span className="breadcrumb-current">찾아오시는 길</span>
            </li>
          </ul>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNav />

          {/* Main Content */}
          <main className="modern-content" id="contents">
            {/* Hero Section */}
                         <section className="content-hero">
               <div className="hero-content">
                 <div className="hero-header">
                   <div className="hero-icon">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                       <circle cx="12" cy="10" r="3"></circle>
                     </svg>
                   </div>
                   <h1 className="hero-title">찾아오시는 길</h1>
                 </div>
                 <p className="hero-description">
                   AI Code Migration 서비스에 접근하는 방법과 연락처 정보를 안내합니다
                 </p>
               </div>
             </section>

            {/* Service Access Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <h2>서비스 접근</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="access-grid">
                  <div className="access-item">
                    <div className="access-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                        <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                        <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                      </svg>
                    </div>
                    <div className="access-content">
                      <h3>웹 서비스</h3>
                      <p>브라우저를 통해 언제든지 접근 가능한 웹 기반 서비스</p>
                      <div className="access-details">
                        <div className="detail-row">
                          <span className="detail-label">URL:</span>
                          <span className="detail-value">https://ai-code-migration.com</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">접근 시간:</span>
                          <span className="detail-value">24시간 운영</span>
                        </div>
                      </div>
                      <div className="access-chart">
                        <div className="access-bar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="access-item">
                    <div className="access-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="access-content">
                      <h3>챗봇 지원</h3>
                      <p>실시간 Q&A 챗봇을 통한 즉시 응답 서비스</p>
                      <div className="access-details">
                        <div className="detail-row">
                          <span className="detail-label">응답 시간:</span>
                          <span className="detail-value">실시간</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">언어:</span>
                          <span className="detail-value">한국어</span>
                        </div>
                      </div>
                      <div className="access-chart">
                        <div className="access-bar" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="access-item">
                    <div className="access-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="access-content">
                      <h3>이메일 문의</h3>
                      <p>상세한 문의사항이나 기술 지원 요청</p>
                      <div className="access-details">
                        <div className="detail-row">
                          <span className="detail-label">이메일:</span>
                          <span className="detail-value">support@ai-code-migration.com</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">응답 시간:</span>
                          <span className="detail-value">24시간 이내</span>
                        </div>
                      </div>
                      <div className="access-chart">
                        <div className="access-bar" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>주요 기능</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="features-grid">
                  <div 
                    className={`feature-item ${activeFeature === 'code-conversion' ? 'active' : ''}`}
                    onClick={() => setActiveFeature(activeFeature === 'code-conversion' ? null : 'code-conversion')}
                  >
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6"></polyline>
                        <polyline points="8,6 2,12 8,18"></polyline>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>코드 변환</h4>
                      <p>Python, Flask, FastAPI → 전자정부 표준프레임워크 자동 변환</p>
                    </div>
                    <div className="feature-details">
                      <ul>
                        <li>언어 감지 및 분석</li>
                        <li>구조 매핑 및 변환</li>
                        <li>컴포넌트 자동 생성</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    className={`feature-item ${activeFeature === 'testing' ? 'active' : ''}`}
                    onClick={() => setActiveFeature(activeFeature === 'testing' ? null : 'testing')}
                  >
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>자동 테스트</h4>
                      <p>변환된 코드에 대한 자동 테스트 코드 생성 및 실행</p>
                    </div>
                    <div className="feature-details">
                      <ul>
                        <li>JUnit 테스트 코드 생성</li>
                        <li>테스트 실행 및 결과 분석</li>
                        <li>예외 로그 수집</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    className={`feature-item ${activeFeature === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveFeature(activeFeature === 'security' ? null : 'security')}
                  >
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>보안 검사</h4>
                      <p>SonarQube 기반 보안 취약점 분석 및 개선 방안 제안</p>
                    </div>
                    <div className="feature-details">
                      <ul>
                        <li>정적 코드 분석</li>
                        <li>보안 취약점 탐지</li>
                        <li>개선 가이드 제공</li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    className={`feature-item ${activeFeature === 'reporting' ? 'active' : ''}`}
                    onClick={() => setActiveFeature(activeFeature === 'reporting' ? null : 'reporting')}
                  >
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="feature-content">
                      <h4>리포트 생성</h4>
                      <p>변환 과정과 결과에 대한 상세한 리포트 제공</p>
                    </div>
                    <div className="feature-details">
                      <ul>
                        <li>변환 과정 기록</li>
                        <li>품질 평가 결과</li>
                        <li>개선 사항 제안</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>연락처 정보</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="contact-grid">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>이메일</h4>
                      <p>support@ai-code-migration.com</p>
                      <p>info@ai-code-migration.com</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>전화</h4>
                      <p>02-1234-5678</p>
                      <p>평일 09:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>주소</h4>
                      <p>서울특별시 강남구 테헤란로 123</p>
                      <p>AI빌딩 15층</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>운영 시간</h4>
                      <p>평일: 09:00 - 18:00</p>
                      <p>주말: 10:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
                 /* Page Container Override */
         .modern-page-wrapper {
           max-width: 1200px;
           margin: 0 auto;
           padding: 2rem;
         }

                 /* Hero Content Override */
         .hero-content {
           max-width: 600px;
           margin: 0 auto;
           text-align: center;
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 1.5rem;
         }

         .hero-header {
           display: flex;
           align-items: center;
           gap: 1rem;
           justify-content: center;
         }
                 /* Hero Icon Styles */
         .hero-icon {
           width: 56px;
           height: 56px;
           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
           border-radius: 16px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: white;
           flex-shrink: 0;
         }
        .hero-icon svg {
          width: 28px;
          height: 28px;
        }

                 /* Access Grid */
         .access-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .access-item {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .access-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .access-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        }

                 .access-icon {
           width: 52px;
           height: 52px;
           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           margin-bottom: 1rem;
           color: white;
         }

                 .access-icon svg {
           width: 22px;
           height: 22px;
         }

        .access-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .access-content p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .access-details {
          background: white;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--gray-200);
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          font-size: 0.75rem;
          color: var(--gray-600);
          font-weight: 500;
        }

        .detail-value {
          font-size: 0.75rem;
          color: var(--gray-900);
          font-weight: 600;
        }

                 /* Features Grid */
         .features-grid {
           display: flex;
           flex-direction: column;
           gap: 1.5rem;
         }

        .feature-item {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .feature-item:hover {
          transform: translateX(8px);
          background: rgba(255, 255, 255, 0.15);
        }

        .feature-item.active {
          background: white;
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-blue);
        }

                 .feature-icon {
           width: 60px;
           height: 60px;
           background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: #1a202c;
           flex-shrink: 0;
         }

                 .feature-icon svg {
           width: 24px;
           height: 24px;
         }

        .feature-content h4 {
          margin: 0 0 0.5rem;
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

        .feature-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          margin-top: 1rem;
        }

        .feature-item.active .feature-details {
          max-height: 200px;
        }

        .feature-details ul {
          margin: 0;
          padding-left: 1.25rem;
          list-style-type: disc;
        }

        .feature-details li {
          font-size: 0.875rem;
          color: var(--gray-700);
          margin-bottom: 0.25rem;
        }

                 /* Contact Grid */
         .contact-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .contact-item {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(237, 242, 247, 0.8);
          transition: all 0.3s ease;
          position: relative;
        }

        .contact-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #48bb78, #38a169);
        }

        .contact-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(72, 187, 120, 0.15);
        }

                 .contact-icon {
           width: 48px;
           height: 48px;
           background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           margin-bottom: 1rem;
           color: white;
         }

                 .contact-icon svg {
           width: 20px;
           height: 20px;
         }

        .contact-content h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .contact-content p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .contact-content p:last-child {
          margin-bottom: 0;
        }

        /* 애니메이션 차트 */
        .access-chart {
          margin-top: 1rem;
          height: 6px;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .access-bar {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 3px;
          transform: scaleX(0);
          transform-origin: left;
          animation: accessFill 2s ease-out forwards;
        }

        @keyframes accessFill {
          to {
            transform: scaleX(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .access-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }

          .feature-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAboutLocation;
