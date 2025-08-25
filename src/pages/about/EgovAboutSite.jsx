import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutSite() {
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedStats(true);
        }
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
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
              <span className="breadcrumb-current">프로젝트 소개</span>
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
                       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                       <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                       <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                       <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                     </svg>
                   </div>
                   <h1 className="hero-title">AI Code Migration</h1>
                 </div>
                 <p className="hero-description">
                   <strong>'클릭 한번'</strong>으로 <strong>'생각하는 AI 팀'</strong>이 대신해드리는 전자정부 표준 프레임워크 자동 변환 시스템
                 </p>
               </div>
             </section>

                         {/* Project Overview Section */}
             <section className="content-section modern-card">
               <div className="card-header">
                 <div className="header-icon">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                   </svg>
                   <h2>프로젝트 개요</h2>
                 </div>
               </div>
               <div className="card-content">
                 <div className="overview-grid">
                   <div className="overview-item">
                     <div className="overview-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <polyline points="16,18 22,12 16,6"></polyline>
                         <polyline points="8,6 2,12 8,18"></polyline>
                       </svg>
                     </div>
                     <div className="overview-content">
                       <h3>전자정부 표준 프레임워크로 변환</h3>
                       <p>Flask, FastAPI, SpringBoot → 전자정부 표준프레임워크</p>
                     </div>
                   </div>

                   <div className="overview-item">
                     <div className="overview-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                       </svg>
                     </div>
                     <div className="overview-content">
                       <h3>프로그래밍 언어 변환</h3>
                       <p>Python → Java 기반 전자정부 프레임워크</p>
                     </div>
                   </div>

                   <div className="overview-item">
                     <div className="overview-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                         <circle cx="12" cy="16" r="1"></circle>
                         <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                       </svg>
                     </div>
                     <div className="overview-content">
                       <h3>자동 테스트 코드 생성 & 실행</h3>
                       <p>테스트 통과 여부, 예외 로그 수집까지 자동화</p>
                     </div>
                   </div>

                   <div className="overview-item">
                     <div className="overview-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                       </svg>
                     </div>
                     <div className="overview-content">
                       <h3>보안 검사 및 개선 방안 제안</h3>
                       <p>전자정부 표준프레임워크 기반 코드의 보안 취약점 분석</p>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

             {/* Project Materials Section */}
             <section className="content-section modern-card">
               <div className="card-header">
                 <div className="header-icon">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                     <polyline points="14,2 14,8 20,8"></polyline>
                     <line x1="16" y1="13" x2="8" y2="13"></line>
                     <line x1="16" y1="17" x2="8" y2="17"></line>
                   </svg>
                   <h2>프로젝트 자료</h2>
                 </div>
               </div>
               <div className="card-content">
                 <div className="materials-grid">
                   <div className="material-item">
                     <div className="material-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <polygon points="23,7 16,12 23,17 23,7"></polygon>
                         <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                       </svg>
                     </div>
                     <div className="material-content">
                       <h3>1분 쇼츠 영상</h3>
                       <p>AI Code Migration 프로젝트를 간단히 소개하는 1분 영상</p>
                       <div className="material-preview">
                         <video controls poster="/assets/project/shorts-poster.jpg" className="material-video">
                           <source src="/assets/project/shorts.mp4" type="video/mp4" />
                           브라우저가 비디오를 지원하지 않습니다.
                         </video>
                       </div>
                     </div>
                   </div>

                   <div className="material-item">
                     <div className="material-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <polygon points="23,7 16,12 23,17 23,7"></polygon>
                         <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                       </svg>
                     </div>
                     <div className="material-content">
                       <h3>발표 영상</h3>
                       <p>프로젝트 전체 발표 영상 - 상세한 기술 설명과 데모</p>
                       <div className="material-preview">
                         <video controls poster="/assets/project/presentation-poster.jpg" className="material-video">
                           <source src="/assets/project/presentation.mp4" type="video/mp4" />
                           브라우저가 비디오를 지원하지 않습니다.
                         </video>
                       </div>
                     </div>
                   </div>

                   <div className="material-item">
                     <div className="material-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                         <circle cx="8.5" cy="8.5" r="1.5"></circle>
                         <polyline points="21,15 16,10 5,21"></polyline>
                       </svg>
                     </div>
                     <div className="material-content">
                       <h3>사업 솔루션</h3>
                       <p>프로젝트의 핵심 솔루션과 비즈니스 모델을 한눈에</p>
                       <div className="material-preview">
                         <img src="/assets/project/solution.png" alt="사업 솔루션" className="material-image" />
                       </div>
                     </div>
                   </div>

                   <div className="material-item">
                     <div className="material-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <polygon points="23,7 16,12 23,17 23,7"></polygon>
                         <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                       </svg>
                     </div>
                     <div className="material-content">
                       <h3>시연 영상</h3>
                       <p>실제 시스템 동작을 보여주는 시연 영상</p>
                       <div className="material-preview">
                         <video controls poster="/assets/project/demo-poster.jpg" className="material-video">
                           <source src="/assets/project/demo.mp4" type="video/mp4" />
                           브라우저가 비디오를 지원하지 않습니다.
                         </video>
                       </div>
                     </div>
                   </div>

                   <div className="material-item">
                     <div className="material-icon">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                         <polyline points="14,2 14,8 20,8"></polyline>
                         <line x1="16" y1="13" x2="8" y2="13"></line>
                         <line x1="16" y1="17" x2="8" y2="17"></line>
                       </svg>
                     </div>
                     <div className="material-content">
                       <h3>발표자료</h3>
                       <p>프로젝트 발표용 PowerPoint 자료</p>
                       <div className="material-preview">
                         <div className="material-download">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                             <polyline points="7,10 12,15 17,10"></polyline>
                             <line x1="12" y1="15" x2="12" y2="3"></line>
                           </svg>
                           <a href="/assets/project/presentation.pptx" download className="download-link">
                             발표자료 다운로드
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

            {/* Statistics Section */}
            <section className="content-section modern-card stats-section">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>주요 성과</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">{animatedStats ? "120만+" : "0"}</div>
                    <div className="stat-label">누적 다운로드</div>
                    <div className="stat-description">2024년 11월 기준</div>
                    <div className="chart-container">
                      <div className="chart-bar" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{animatedStats ? "67%" : "0%"}</div>
                    <div className="stat-label">표준프레임워크 채택률</div>
                    <div className="stat-description">조달청 발주 정보화사업</div>
                    <div className="chart-container">
                      <div className="chart-bar" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{animatedStats ? "17개국" : "0개국"}</div>
                    <div className="stat-label">해외 적용 국가</div>
                    <div className="stat-description">33개 정보시스템 적용</div>
                    <div className="chart-container">
                      <div className="chart-bar" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{animatedStats ? "254개" : "0개"}</div>
                    <div className="stat-label">공통 컴포넌트</div>
                    <div className="stat-description">eGovFrame 제공</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>기대 효과</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4>중복 개발 방지</h4>
                      <p>공통 기능을 한 번 만들고 여러 사업에서 재사용하여 불필요한 중복 개발을 방지합니다.</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4>시스템 연계 효율성</h4>
                      <p>서로 다른 시스템도 하나의 블록처럼 맞춰 연결되며, 준비·테스트 시간을 크게 줄여줍니다.</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="benefit-content">
                      <h4>표준화 제공</h4>
                      <p>규칙과 설명이 함께 정리되어있는 표준을 제공하여 이해는 쉽고, 연계작업은 빠르게 되도록 합니다.</p>
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

                 /* Overview Grid */
         .overview-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .overview-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .overview-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

                 .overview-icon {
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

                 .overview-icon svg {
           width: 20px;
           height: 20px;
         }

        .overview-content h3 {
          margin: 0 0 0.375rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .overview-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
        }

                 /* Stats Grid */
         .stats-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: 12px;
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
          transition: all 0.5s ease;
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: 0.25rem;
        }

        .stat-description {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

                 /* Benefits Grid */
         .benefits-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.25rem;
         }

         .benefit-item {
           display: flex;
           align-items: flex-start;
           gap: 1rem;
           padding: 1.25rem;
           background: var(--gray-50);
           border-radius: 12px;
           border: 1px solid var(--gray-200);
           transition: all 0.3s ease;
         }

         .benefit-item:hover {
           background: white;
           box-shadow: var(--shadow-md);
           transform: translateY(-2px);
         }

                  .benefit-icon {
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

                  .benefit-icon svg {
            width: 20px;
            height: 20px;
          }

         .benefit-content h4 {
           margin: 0 0 0.375rem;
           font-size: 1rem;
           font-weight: 700;
           color: var(--gray-900);
         }

         .benefit-content p {
           margin: 0;
           font-size: 0.875rem;
           color: var(--gray-600);
           line-height: 1.4;
         }

         /* Materials Grid */
         .materials-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

         .material-item {
           padding: 1.5rem;
           background: var(--gray-50);
           border-radius: 12px;
           border: 1px solid var(--gray-200);
           transition: all 0.3s ease;
         }

         .material-item:hover {
           background: white;
           box-shadow: var(--shadow-md);
           transform: translateY(-2px);
         }

         .material-icon {
           width: 48px;
           height: 48px;
           background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
           border-radius: 12px;
           display: flex;
           align-items: center;
           justify-content: center;
           color: white;
           margin-bottom: 1rem;
           padding: 12px;
         }

         .material-icon svg {
           width: 20px;
           height: 20px;
         }

         .material-content h3 {
           margin: 0 0 0.5rem;
           font-size: 1.125rem;
           font-weight: 700;
           color: var(--gray-900);
         }

         .material-content p {
           margin: 0 0 1rem;
           font-size: 0.875rem;
           color: var(--gray-600);
           line-height: 1.4;
         }

         .material-preview {
           border-radius: 8px;
           overflow: hidden;
           background: white;
           border: 1px solid var(--gray-200);
         }

         .material-video {
           width: 100%;
           height: auto;
           max-height: 200px;
           object-fit: cover;
         }

         .material-image {
           width: 100%;
           height: auto;
           max-height: 200px;
           object-fit: cover;
         }

         .material-download {
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 0.5rem;
           padding: 1rem;
           background: var(--primary-blue);
           color: white;
           border-radius: 8px;
           transition: all 0.3s ease;
         }

         .material-download:hover {
           background: var(--secondary-blue);
           transform: translateY(-1px);
         }

         .material-download svg {
           width: 16px;
           height: 16px;
         }

         .download-link {
           color: white;
           text-decoration: none;
           font-weight: 600;
           font-size: 0.875rem;
         }

         .download-link:hover {
           text-decoration: underline;
         }

         /* Responsive Design */
         @media (max-width: 768px) {
           .overview-grid,
           .benefits-grid,
           .materials-grid,
           .stats-grid {
             grid-template-columns: 1fr;
           }
         }
      `}</style>
    </div>
  );
}

export default EgovAboutSite;
