import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutOrganization() {
  const [activeMember, setActiveMember] = useState(null);

  const TEAM_MEMBERS = [
    {
      id: 1,
      name: "이유민",
      role: "AI 엔지니어",
      department: "AI & Backend & DevOps",
      image: "/src/assets/images/member7.jpg",
      description: "AI 개발, Backend 개발, 클라우드 인프라 구축 및 배포 자동화",
      skills: ["LangGraph", "RAG", "SpringBoot", "Python", "Kafka", "MongoDB", "AWS", "Docker", "Kubernetes", "CI/CD"],
      email: "lee_yumin@naver.com"
    },
    {
      id: 2,
      name: "구현규",
      role: "AI 엔지니어",
      department: "AI Research & Development",
      image: "/src/assets/images/member2.jpg",
      description: "LLM 기반 코드 변환 알고리즘 개발 및 최적화",
      skills: ["Python", "TensorFlow", "LLM", "NLP", "코드 분석"],
      email: "gyu@example.com"
    },
    {
      id: 3,
      name: "김동영",
      role: "AI 개발자",
      department: "Backend Development",
      image: "/src/assets/images/member3.jpg",
      description: "전자정부 표준프레임워크 버전 변환 개발",
      skills: ["Python"],
      email: "dongyoung@example.com"
    },
    
  { id: 4, name: "김지현", role: "AI 엔지니어", department: "AI & Backend", image: "/src/assets/images/member7.jpg", description: "보안 에이전트 개발, 백엔드 설계·구축, MSA 아키텍처 설계·구축, 데이터베이스 구축·운영, 클라우드 인프라 담당.", skills: ["MSA", "LangGraph", "RAG", "SpringBoot", "Python", "Kafka", "MongoDB", "AWS", "Docker", "Kubernetes", "SonarQube", "Faiss", "API Gateway", "JWT", "S3"], email: "wlgus021107@gmail.com" },
    {
      id: 5,
      name: "박기웅",
      role: "챗봇 엔지니어",
      department: "Chatbot",
      image: "/src/assets/images/member5.jpg",
      description: "챗봇 기능 개발",
      skills: ["Streamlit","Chatbot"],
      email: "giwoong@example.com"
    },
    {
      id: 6,
      name: "신현승",
      role: "AI 에이전트 / 프론트엔드 / 데이터베이스 / 클라우드",
      department: "Testing & Quality Assurance",
      image: "/src/assets/images/member6.jpg",
      description: "자동 테스트 코드 생성 및 실행 시스템 개발",
      skills: ["LangGraph", "RAG", "Python", "MongoDB","MySQL","AWS","Kafka","Docker","React","Vite"],
      email: "dnclgk9@naver.com"
    },
    {
      id: 7,
      name: "양준모",
      role: "AI 엔지니어",
      department: "AI Agent Development",
      image: "/src/assets/images/member7.jpg",
      description: "분석 Agent 설계 및 AI Agent 개발",
      skills: ["Python", "Java", "LangGraph", "에이전트 개발"],
      email: "jooniee802@gmail.com"
    },
    {
      id: 8,
      name: "옥정우",
      role: "프론트엔드 / 백엔드 / AI 에이전트",
      department: "Frontend PM & Backend & AI",
      image: "/src/assets/images/member8.jpg",
      description: "프론트엔드 및 백엔드 개발, RAG 시스템 구축",
      skills: ["Java", "Spring", "Javascript", "React", "MySQL", "MongoDB", "Python", "Kafka", "RAG"],
      email: "okjungwoo@naver.com"
    }

  ];

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
              <span className="breadcrumb-current">조직 소개</span>
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
                       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                       <circle cx="9" cy="7" r="4"></circle>
                       <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                       <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                     </svg>
                   </div>
                   <h1 className="hero-title">조직 소개</h1>
                 </div>
                 <p className="hero-description">
                   AI Code Migration 프로젝트를 이끄는 전문가 팀을 소개합니다
                 </p>
               </div>
             </section>

            {/* Team Overview Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <h2>팀 구성</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="team-overview">
                  <div className="overview-item">
                    <div className="overview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="overview-content">
                      <h3>8명의 전문가</h3>
                      <p>각 분야의 전문성을 가진 팀원들이 협력하여 프로젝트를 진행합니다</p>
                    </div>
                  </div>

                  <div className="overview-item">
                    <div className="overview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6"></polyline>
                        <polyline points="8,6 2,12 8,18"></polyline>
                      </svg>
                    </div>
                    <div className="overview-content">
                      <h3>다양한 기술 스택</h3>
                      <p>AI/ML, 백엔드, 프론트엔드, 보안, DevOps 등 다양한 기술 영역을 커버합니다</p>
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
                      <h3>협력 중심 문화</h3>
                      <p>각자의 전문성을 바탕으로 한 협력과 지식 공유를 통해 최고의 결과를 만들어냅니다</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Members Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  <h2>팀원 소개</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="team-grid">
                  {TEAM_MEMBERS.map((member) => (
                    <div 
                      key={member.id}
                      className={`team-member ${activeMember === member.id ? 'active' : ''}`}
                      onClick={() => setActiveMember(activeMember === member.id ? null : member.id)}
                    >
                      <div className="member-avatar">
                        <img src={member.image} alt={member.name} />
                        <div className="member-status-dot"></div>
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <p className="member-department">{member.department}</p>
                      </div>
                      <div className="member-details">
                        <p className="member-description">{member.description}</p>
                        <div className="member-skills">
                          {member.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                        <div className="member-contact">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                          <span>{member.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team Values Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <h2>팀 가치</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="values-grid">
                  <div className="value-item">
                    <div className="value-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="value-content">
                      <h4>혁신</h4>
                      <p>최신 기술을 활용하여 혁신적인 솔루션을 개발합니다</p>
                      <div className="value-chart">
                        <div className="value-bar" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="value-item">
                    <div className="value-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="value-content">
                      <h4>품질</h4>
                      <p>높은 품질의 코드와 안정적인 시스템을 제공합니다</p>
                      <div className="value-chart">
                        <div className="value-bar" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="value-item">
                    <div className="value-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </div>
                    <div className="value-content">
                      <h4>협력</h4>
                      <p>팀워크와 협력을 통해 더 나은 결과를 만들어냅니다</p>
                      <div className="value-chart">
                        <div className="value-bar" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="value-item">
                    <div className="value-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                    <div className="value-content">
                      <h4>성장</h4>
                      <p>지속적인 학습과 개선을 통해 함께 성장합니다</p>
                      <div className="value-chart">
                        <div className="value-bar" style={{ width: '92%' }}></div>
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

                 /* Team Overview */
         .team-overview {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .overview-item {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .overview-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .overview-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        }

                 .overview-icon {
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

                 .overview-icon svg {
           width: 22px;
           height: 22px;
         }

        .overview-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .overview-content p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.9rem;
        }

                 /* Team Grid */
         .team-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
           gap: 1.5rem;
         }

        .team-member {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          text-align: center;
        }

        .team-member:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.15);
        }

        .team-member.active {
          background: white;
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-blue);
        }

        .member-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
        }

        .member-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: var(--shadow-sm);
        }

        .member-status-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 16px;
          height: 16px;
          background: #48bb78;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .member-info {
          margin-bottom: 1rem;
        }

        .member-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .member-role {
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .member-department {
          margin: 0;
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .member-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .team-member.active .member-details {
          max-height: 300px;
        }

        .member-description {
          margin: 0 0 1rem;
          font-size: 0.875rem;
          color: var(--gray-700);
          line-height: 1.4;
        }

        .member-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .skill-tag {
          padding: 0.25rem 0.5rem;
          background: var(--light-blue);
          color: var(--primary-blue);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .member-contact {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .member-contact svg {
          width: 14px;
          height: 14px;
        }

                 /* Values Grid */
         .values-grid {
           display: grid;
           grid-template-columns: repeat(2, 1fr);
           gap: 1.5rem;
         }

        .value-item {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(237, 242, 247, 0.8);
          transition: all 0.3s ease;
          position: relative;
        }

        .value-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #48bb78, #38a169);
        }

        .value-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(72, 187, 120, 0.15);
        }

                 .value-icon {
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

                 .value-icon svg {
           width: 20px;
           height: 20px;
         }

        .value-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .value-content p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        /* 애니메이션 차트 */
        .value-chart {
          margin-top: 1rem;
          height: 6px;
          background: rgba(72, 187, 120, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .value-bar {
          height: 100%;
          background: linear-gradient(90deg, #48bb78, #38a169);
          border-radius: 3px;
          transform: scaleX(0);
          transform-origin: left;
          animation: valueFill 2s ease-out forwards;
        }

        @keyframes valueFill {
          to {
            transform: scaleX(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .team-overview,
          .values-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAboutOrganization;