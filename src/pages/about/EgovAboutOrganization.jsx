import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import URL from "@/constants/url";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/team.css";

/**
 * ✅ 팀 데이터 (필요에 맞게 수정)
 */
const TEAM = [
  { id: 1, name: "Member 1", role: "PM · Tech Lead", photo: "/src/assets/images/member1.jpg", bio: "프로젝트 총괄·아키텍처 설계" },
  { id: 2, name: "Member 2", role: "Backend · Spring", photo: "/src/assets/images/member2.jpg", bio: "도메인/DB 설계, API 개발" },
  { id: 3, name: "Member 3", role: "Frontend · React", photo: "/src/assets/images/member3.jpg", bio: "UI/UX, 접근성, 대시보드" },
  { id: 4, name: "Member 4", role: "AI/LLM Engineer", photo: "/src/assets/images/member4.jpg", bio: "RAG/에이전트, 파이프라인" },
  { id: 5, name: "Member 5", role: "DevOps · Cloud", photo: "/src/assets/images/member5.jpg", bio: "배포 자동화, 모니터링" },
  { id: 6, name: "Member 6", role: "Data · MLOps", photo: "/src/assets/images/member6.jpg", bio: "데이터 파이프라인, 피처링" },
  { id: 7, name: "Member 7", role: "Security · QA", photo: "/src/assets/images/member7.jpg", bio: "취약점 점검, 테스트 전략" },
  { id: 8, name: "Member 8", role: "Product · UX", photo: "/src/assets/images/member8.jpg", bio: "요구사항, 고객 피드백" },
];

// Utility: derive skills/tags from member data when missing
const deriveChips = (m) => {
  if (Array.isArray(m.skills) && m.skills.length) return m.skills.slice(0, 8);
  const pool = [m.role, m.bio].filter(Boolean).join(' ');
  const raw = pool.split(/[·•/|, ]+/).map(s => s.trim()).filter(Boolean);
  return Array.from(new Set(raw)).slice(0, 8);
};

/* ===================== Utils / Hooks ===================== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-item');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ===================== UI Parts ===================== */
function TeamCard({ member, onClick, style }) {
  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const nx = mx / rect.width;
    const ny = my / rect.height;

    // expose normalized cursor to CSS
    card.style.setProperty('--mx', nx.toString());
    card.style.setProperty('--my', ny.toString());

    // tilt + subtle scale
    const rx = (0.5 - ny) * 10; // deg
    const ry = (nx - 0.5) * 10; // deg
    card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
    card.style.setProperty('--scale', '1.02');
  };

  const onMouseEnter = (e) => {
    e.currentTarget.classList.add('is-hovering');
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    card.classList.remove('is-hovering');
    card.style.setProperty('--mx', '0.5');
    card.style.setProperty('--my', '0.5');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--scale', '1');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(member);
    }
  };

  return (
    <article
      className="team-card reveal-item"
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(member)}
      role="button"
      tabIndex={0}
      aria-label={`${member.name} 상세 보기`}
      onKeyDown={onKeyDown}
    >
      <div className="team-card__hairline" aria-hidden />
      <div className="team-card__glow" aria-hidden />
      <div className="team-card__media">
        <img
          src={member.photo}
          alt={`${member.name} 프로필 사진`}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/assets/images/team/placeholder.jpg'; }}
        />
        <span className="team-card__badge" title={member.role}>{member.role}</span>
        {/* dynamic sheen following cursor */}
        <div className="team-card__sheen" aria-hidden />
      </div>
      <div className="team-card__body">
        <h4 className="team-card__name">{member.name}</h4>
      </div>
    </article>
  );
}

function TeamModal({ member, onClose }) {
  const dialogRef = useRef(null);
  const prevFocusRef = useRef(null);

  // Focus trap + ESC close + body scroll lock
  useEffect(() => {
    if (!member) return;

    prevFocusRef.current = document.activeElement;

    const closeOnEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEsc);
    document.body.classList.add('no-scroll');

    // Focus the first focusable in dialog
    const focusables = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables && focusables[0]?.focus();

    // Trap focus within modal
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      const list = Array.from(dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) || []);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    dialogRef.current?.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', closeOnEsc);
      dialogRef.current?.removeEventListener('keydown', handleTab);
      document.body.classList.remove('no-scroll');
      if (prevFocusRef.current instanceof HTMLElement) prevFocusRef.current.focus();
    };
  }, [member, onClose]);

  if (!member) return null;

  const closeByBackdrop = (e) => {
    const target = e.target;
    if (target.classList.contains('team-modal') || target.classList.contains('team-modal__backdrop')) onClose();
  };

  const titleId = 'team-modal-title';
  const descId = 'team-modal-desc';

  // Role-based accent palette (per member)
  const ACCENTS = [
    ['#7c3aed', '#06b6d4'],
    ['#22d3ee', '#a78bfa'],
    ['#10b981', '#f59e0b'],
    ['#ef4444', '#06b6d4'],
    ['#14b8a6', '#eab308'],
    ['#8b5cf6', '#ec4899'],
    ['#0ea5e9', '#f43f5e'],
    ['#f59e0b', '#22d3ee'],
  ];
  const [acc1, acc2] = ACCENTS[(member.id - 1) % ACCENTS.length];

  return (
    <div
      className="team-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseDown={closeByBackdrop}
    >
      <div className="team-modal__backdrop" />
      <div className="team-modal__dialog" ref={dialogRef} style={{ '--acc1': acc1, '--acc2': acc2 }}>
        <div className="team-modal__aura" aria-hidden />
        <button className="team-modal__close" onClick={onClose} aria-label="닫기">✕</button>

        <div className="team-modal__media">
          <img src={member.photo} alt="" onError={(e) => { e.currentTarget.src = '/assets/images/team/placeholder.jpg'; }} />
        </div>

        <div className="team-modal__body">
          <h4 id={titleId} className="team-modal__title gradient-text">{member.name}</h4>
          <span className="team-modal__role">{member.role}</span>
          <div className="team-modal__divider" aria-hidden />
          <p id={descId} className="team-modal__bio">{member.bio || '팀원 소개가 준비 중입니다.'}</p>
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  useReveal(); // ▶︎ 스르륵 등장 애니메이션
  const [selected, setSelected] = useState(null);

  return (
    <section className="team-section" aria-labelledby="team-title">
      <header className="team-header reveal-item">
        <div className="team-eyebrow">OUR TEAM</div>
        <h3 id="team-title">함께 만드는 8인의 프로젝트 팀</h3>
        <p className="team-sub">AI · 프론트엔드 · 백엔드 · 클라우드 · 보안까지 전 분야를 아우르는 멀티 스쿼드</p>
      </header>

      <div className="team-grid" role="list">
        {TEAM.map((m, idx) => (
          <TeamCard key={m.id} member={m} onClick={setSelected} style={{ '--delay': `${idx * 40}ms` }} />
        ))}
      </div>

      <TeamModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function TeamShowcase() {
  return (
    <section className="bg-white dark:bg-gray-900">

    </section>
  );
}

function EgovAboutOrganization() {
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
            <span className="breadcrumb-current">조직소개</span>
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h1 className="hero-title">조직소개</h1>
                <p className="hero-description">
                  표준프레임워크 개발과 운영을 담당하는 전문가 팀을 소개합니다.
                </p>
              </div>
            </section>

            {/* Organization Overview Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h2>조직 구성</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="organization-description">
                  <p>
                    오픈커뮤니티의 초기 정착을 위해 표준프레임워크 개발 참여자와 국내 주요 오픈커뮤니티의 
                    운영자·전문가를 리딩 그룹(PMC, 커미터)으로 구성하고, 지속적인 확대·발전을 위해 
                    프로젝트 활동에 적극적으로 참여하는 커뮤니티 회의사결정 체계를 수립합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="content-section modern-card">
              <div className="card-content">
                <TeamSection />
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
          background: linear-gradient(135deg, #8B5CF6, #A855F7);
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
          background: linear-gradient(135deg, #8B5CF6, #A855F7);
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
            rgba(139, 92, 246, 0.05) 0%, 
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
          color: #8B5CF6;
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

        /* Organization Description */
        .organization-description p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--gray-700);
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
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

export default EgovAboutOrganization;