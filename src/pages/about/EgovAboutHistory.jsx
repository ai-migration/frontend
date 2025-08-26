import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutHistory() {
  const [animatedProgress, setAnimatedProgress] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedProgress(true);
        }
      },
      { threshold: 0.3 }
    );

    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
      observer.observe(progressSection);
    }

    return () => observer.disconnect();
  }, []);

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
              <span className="breadcrumb-current">프로젝트 연혁</span>
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
                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                     </svg>
                   </div>
                   <h1 className="hero-title">프로젝트 연혁</h1>
                 </div>
                 <p className="hero-description">
                   AI Code Migration 프로젝트의 개발 과정과 주요 마일스톤을 소개합니다
                 </p>
               </div>
             </section>

            {/* Project Phases Section */}
            <section className="content-section modern-card progress-section">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>프로젝트 단계</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="progress-grid">
                  <div className="progress-item">
                    <div className="progress-header">
                      <div className="progress-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </div>
                      <div className="progress-info">
                        <h3>기획 및 설계</h3>
                        <span className="progress-period">2025.07 - 2025.07</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: animatedProgress ? '100%' : '0%'}}></div>
                    </div>
                    <p>프로젝트 요구사항 분석 및 시스템 아키텍처 설계</p>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <div className="progress-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16,18 22,12 16,6"></polyline>
                          <polyline points="8,6 2,12 8,18"></polyline>
                        </svg>
                      </div>
                      <div className="progress-info">
                        <h3>개발 및 구현</h3>
                        <span className="progress-period">2025.07 - 2025.08</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: animatedProgress ? '100%' : '0%'}}></div>
                    </div>
                    <p>AI 에이전트 시스템 개발 및 코드 변환 로직 구현</p>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <div className="progress-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <circle cx="12" cy="16" r="1"></circle>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                      <div className="progress-info">
                        <h3>테스트 및 검증</h3>
                        <span className="progress-period">2025.08 - 2025.8</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: animatedProgress ? '100%' : '0%'}}></div>
                    </div>
                    <p>시스템 통합 테스트 및 성능 최적화</p>
                  </div>

                  <div className="progress-item">
                    <div className="progress-header">
                      <div className="progress-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7,10 12,15 17,10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </div>
                      <div className="progress-info">
                        <h3>배포 및 런칭</h3>
                        <span className="progress-period">2025.8 - 현재</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: animatedProgress ? '85%' : '0%'}}></div>
                    </div>
                    <p>서비스 배포 및 지속적인 개선 및 업데이트</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>주요 마일스톤</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="timeline-grid">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>2025년 7월</h4>
                      <h3>프로젝트 기획 시작</h3>
                      <p>전자정부 표준프레임워크 변환의 필요성 인식 및 AI 기반 솔루션 기획</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>2025년 7월 3주차</h4>
                      <h3>시스템 아키텍처 설계 완료</h3>
                      <p>8개 AI 에이전트 구조 설계 및 마스터 에이전트 조율 시스템 구상</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>2025년 8월 1주차</h4>
                      <h3>핵심 에이전트 개발 완료</h3>
                      <p>분석, 변환, 검사 에이전트의 핵심 기능 구현 및 테스트</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>2025년 8월 4주차</h4>
                      <h3>통합 시스템 완성</h3>
                      <p>모든 에이전트 통합 및 웹 인터페이스 개발 완료</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>2025년 8월 28일</h4>
                      <h3>베타 서비스 런칭</h3>
                      <p>첫 공개 및 베타 테스터 모집, 초기 피드백 수집</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>2025년 9월 2일</h4>
                      <h3>정식 서비스 준비</h3>
                      <p>피드백 반영 및 성능 최적화, 정식 서비스 준비 완료</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Achievements Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h2>eGovFramework 주요 성과</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="achievements-grid">
                  <div className="achievement-item">
                    <div className="achievement-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="achievement-content">
                      <h4>120만+ 다운로드</h4>
                      <p>2024년 11월 기준 누적 다운로드 수 달성</p>
                      <div className="achievement-chart">
                        <div className="achievement-bar" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <div className="achievement-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="achievement-content">
                      <h4>17개국 적용</h4>
                      <p>해외 17개국 33개 정보시스템에 적용</p>
                      <div className="achievement-chart">
                        <div className="achievement-bar" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <div className="achievement-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="achievement-content">
                      <h4>67% 채택률</h4>
                      <p>조달청 발주 정보화사업의 표준프레임워크 채택률</p>
                      <div className="achievement-chart">
                        <div className="achievement-bar" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <div className="achievement-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                    <div className="achievement-content">
                      <h4>254개 컴포넌트</h4>
                      <p>eGovFrame 제공 공통 컴포넌트 지원</p>
                      <div className="achievement-chart">
                        <div className="achievement-bar" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
                 /* Hero Content Override */
         .hero-content {
           max-width: 800px;
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

                 /* Progress Grid */
         .progress-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .progress-item {
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .progress-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .progress-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

                 .progress-icon {
           width: 52px;
           height: 52px;
           background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: white;
           flex-shrink: 0;
           padding: 12px;
         }

                 .progress-icon svg {
           width: 22px;
           height: 22px;
         }

        .progress-info h3 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .progress-period {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 4px;
          transition: width 1.5s ease-out;
        }

        .progress-item p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
        }

                 /* Timeline Grid */
         .timeline-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .timeline-item {
          position: relative;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .timeline-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .timeline-dot {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          width: 12px;
          height: 12px;
          background: var(--primary-blue);
          border-radius: 50%;
        }

        .timeline-content {
          margin-left: 2rem;
        }

        .timeline-content h4 {
          margin: 0 0 0.25rem;
          font-size: 0.875rem;
          color: var(--primary-blue);
          font-weight: 600;
        }

        .timeline-content h3 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .timeline-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
        }

                 /* Achievements Grid */
         .achievements-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.25rem;
         }

        .achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .achievement-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

                 .achievement-icon {
           width: 48px;
           height: 48px;
           background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: white;
           flex-shrink: 0;
           padding: 12px;
         }

                 .achievement-icon svg {
           width: 20px;
           height: 20px;
         }

        .achievement-content h4 {
          margin: 0 0 0.375rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .achievement-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .progress-grid,
          .timeline-grid,
          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }

        /* New styles for improved readability and trendy look */
        .hero-content {
          max-width: 800px;
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

        .content-section {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1.5rem;
          text-align: center;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        /* 프로젝트 단계 섹션 */
        .progress-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .progress-item {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .progress-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .progress-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        }

        .progress-icon {
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

        .progress-icon svg {
          width: 22px;
          height: 22px;
        }

        .progress-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .progress-content p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        /* 타임라인 섹션 - 유연한 세로 배치 */
        .timeline-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
        }

        .timeline-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-item {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          transition: all 0.3s ease;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background: #ffd700;
          border-radius: 50%;
          border: 3px solid white;
        }

        .timeline-item:hover {
          transform: translateX(8px);
          background: rgba(255, 255, 255, 0.15);
        }

        .timeline-date {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffd700;
          margin-bottom: 0.5rem;
        }

        .timeline-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .timeline-description {
          opacity: 0.9;
          line-height: 1.6;
        }

        /* 성과 섹션 */
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .achievement-item {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(237, 242, 247, 0.8);
          transition: all 0.3s ease;
          position: relative;
        }

        .achievement-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #48bb78, #38a169);
        }

        .achievement-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(72, 187, 120, 0.15);
        }

        .achievement-icon {
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

        .achievement-icon svg {
          width: 20px;
          height: 20px;
        }

        .achievement-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .achievement-content p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        /* 애니메이션 차트 */
        .achievement-chart {
          margin-top: 1rem;
          height: 6px;
          background: rgba(72, 187, 120, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .achievement-bar {
          height: 100%;
          background: linear-gradient(90deg, #48bb78, #38a169);
          border-radius: 3px;
          transform: scaleX(0);
          transform-origin: left;
          animation: achievementFill 2s ease-out forwards;
        }

        @keyframes achievementFill {
          to {
            transform: scaleX(1);
          }
        }

        @media (max-width: 768px) {
          .progress-grid,
          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .timeline-item::before {
            left: 50%;
            top: -1rem;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAboutHistory;
