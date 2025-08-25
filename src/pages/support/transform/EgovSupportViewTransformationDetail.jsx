import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import jsonLang from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import "@/css/modern-styles.css";

// ── Base URLs ────────────────────────────────────────────────────────────────
const RAW_GET_BASE  = import.meta.env.VITE_API_BASE      || "http://3.39.231.225:8088";
const RAW_POST_BASE = import.meta.env.VITE_API_POST_BASE || import.meta.env.VITE_API_BASE || "http://3.39.231.225:8088";
const GET_BASE  = (RAW_GET_BASE  || "").replace(/\/+$/, "");
const POST_BASE = (RAW_POST_BASE || "").replace(/\/+$/, "");

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("json", jsonLang);

// 각 탭별 정확도 계산 함수
function getTabAccuracy(detail, tabType) {
  if (!detail) return null;
  
  let reportKey = '';
  switch (tabType) {
    case 'controller':
      reportKey = 'convControllerReport';
      break;
    case 'service':
      reportKey = 'convServiceReport';
      break;
    case 'serviceimpl':
      reportKey = 'convServiceimplReport';
      break;
    case 'vo':
      reportKey = 'convVoReport';
      break;
    default:
      return null;
  }
  
  const reports = detail[reportKey];
  if (!Array.isArray(reports) || reports.length === 0) return null;
  
  const scores = [];
  for (const entry of reports) {
    if (entry && typeof entry === "object") {
      const key = Object.keys(entry)[0];
      const ev = key && entry[key]?.evaluation;
      const s = ev?.S;
      if (typeof s === "number" && isFinite(s)) {
        scores.push(s);
      }
    }
  }
  
  if (scores.length === 0) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// 각 탭별 평가 데이터 추출 함수
function getTabEvaluationData(detail, tabType) {
  if (!detail) return null;
  
  let reportKey = '';
  switch (tabType) {
    case 'controller':
      reportKey = 'convControllerReport';
      break;
    case 'service':
      reportKey = 'convServiceReport';
      break;
    case 'serviceimpl':
      reportKey = 'convServiceimplReport';
      break;
    case 'vo':
      reportKey = 'convVoReport';
      break;
    default:
      return null;
  }
  
  const reports = detail[reportKey];
  if (!Array.isArray(reports) || reports.length === 0) return null;
  
  const evaluationData = [];
  for (const entry of reports) {
    if (entry && typeof entry === "object") {
      const key = Object.keys(entry)[0];
      const ev = key && entry[key]?.evaluation;
      if (ev) {
        // violations 배열에서 missing과 hint 정보 추출
        const violations = ev.violations || [];
        
        evaluationData.push({
          className: key,
          violations: violations.map(violation => ({
            rule: violation.rule || violation.title || 'Unknown rule',
            title: violation.title || violation.rule || 'Unknown violation',
            missing: violation.missing || '',
            hint: violation.hint || ''
          }))
        });
      }
    }
  }
  
  return evaluationData;
}

// 게이지바 컴포넌트
function AccuracyGauge({ accuracy, size = 60, tabType = '' }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  if (accuracy === null || accuracy === undefined) return null;
  
  const targetPercentage = Math.round(accuracy * 100);
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;
  const gradientId = `gradient-${tabType}-${Math.random().toString(36).substr(2, 9)}`;
  
  // 애니메이션 효과
  useEffect(() => {
    if (accuracy !== null && accuracy !== undefined) {
      setIsAnimating(true);
      setAnimatedPercentage(0);
      
      const duration = 1500; // 1.5초
      const steps = 60; // 60프레임
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        // Easing 함수: easeOutQuart
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const newPercentage = Math.round(targetPercentage * easedProgress);
        
        setAnimatedPercentage(newPercentage);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setIsAnimating(false);
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    }
  }, [accuracy, targetPercentage]);
  
  return (
    <div className="accuracy-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* 진행 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: isAnimating ? 'none' : 'stroke-dashoffset 0.3s ease-in-out'
          }}
        />
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        {/* 중앙 텍스트 */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.2}
          fontWeight="bold"
          fill="#374151"
          style={{
            transition: isAnimating ? 'none' : 'all 0.3s ease-in-out'
          }}
        >
          {animatedPercentage}%
        </text>
      </svg>
    </div>
  );
}

export default function EgovSupportViewTransformationDetail() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ── 데이터 로드: jobId만으로 상세 조회 (백엔드에 맞춤) ────────────────
  useEffect(() => {
    // location.state에서 jobId를 먼저 확인
    let jobId = location.state?.jobId;
    
    // location.state에 없으면 URL 파라미터에서 확인
    if (!jobId) {
      const urlParams = new URLSearchParams(location.search);
      jobId = urlParams.get('jobId');
    }
    
    if (!jobId) {
      setLoading(false);
      setErr("Job ID가 없습니다. 올바른 경로로 접근해주세요.");
      return;
    }
    setLoading(true);
    setErr("");

    fetch(`${GET_BASE}/agents/records/detail/${jobId}`)
      .then((r) => r.json())
      .then((d) => setDetail(d))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [location.state?.jobId, location.search]);

  // 리포트 탭에서 JSON 보기용 (필요시)
  const reportText = useMemo(() => {
    const whole = {
      controllers: detail?.convControllerReport ?? [],
      services: detail?.convServiceReport ?? [],
      serviceimpls: detail?.convServiceimplReport ?? [],
      vos: detail?.convVoReport ?? [],
    };
    return JSON.stringify(whole, null, 2);
  }, [detail]);

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
            <span className="breadcrumb-current">작업 상세</span>
          </div>
        </nav>

        <div className="modern-layout">
          <EgovLeftNavTransform />
          
          <main className="modern-content" id="contents">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h1 className="hero-title">작업 상세</h1>
                <p className="hero-description">
                  Job {detail?.jobId ?? location.state?.jobId} 변환 작업의 상세 정보와 결과를 확인할 수 있습니다.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section className="content-section modern-card">
              <div className="card-content">
                {/* Tab Navigation */}
                <div className="tab-navigation">
                  {["overview","controller","service","serviceimpl","vo","reports","reports_json"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      disabled={!detail || !!err}
                      className={`tab-button ${tab === t ? "active" : ""} ${!detail || !!err ? "disabled" : ""}`}
                    >
                      <span className="tab-icon">
                        {getTabIcon(t)}
                      </span>
                      {labelOf(t)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {loading && (
                    <div className="loading-state">
                      <div className="loading-spinner"></div>
                      <span>불러오는 중...</span>
                    </div>
                  )}
                  
                  {err && (
                    <div className="error-state">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <div className="error-content">
                        <span>에러: {err}</span>
                        <Link to={URL.SUPPORT_TRANSFORM_VIEW_TRANSFORMAITON} className="back-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15,18 9,12 15,6"></polyline>
                          </svg>
                          변환 이력으로 돌아가기
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {!loading && !err && detail && (
                    <>
                      {tab === "overview" && <Overview data={detail} />}
                      {tab === "controller" && <PathList title="Controller 변환본" list={detail?.s3ConvControllerPath} detail={detail} />}
                      {tab === "service" && <PathList title="Service 변환본" list={detail?.s3ConvServicePath} detail={detail} />}
                      {tab === "serviceimpl" && <PathList title="ServiceImpl 변환본" list={detail?.s3ConvServiceimplPath} detail={detail} />}
                      {tab === "vo" && <PathList title="VO 변환본" list={detail?.s3ConvVoPath} detail={detail} />}

                      {tab === "reports" && (
                        <div className="reports-container">
                          <ReportGroup title="Controller 리포트" items={detail?.convControllerReport} />
                          <ReportGroup title="Service 리포트" items={detail?.convServiceReport} />
                          <ReportGroup title="ServiceImpl 리포트" items={detail?.convServiceimplReport} />
                          <ReportGroup title="VO 리포트" items={detail?.convVoReport} />
                        </div>
                      )}

                      {tab === "reports_json" && (
                        <div className="json-report-container">
                          <div className="json-header">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                            <h4>리포트 (원본 JSON)</h4>
                          </div>
                          <div className="json-content">
                            <SyntaxHighlighter language="json" style={github} wrapLongLines>
                              {reportText}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        /* Modern Page Styles - Consistent with other pages */
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
          gap: 1.5rem;
        }

        .content-hero {
          text-align: center;
          padding: 2rem 0;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .hero-icon svg {
          width: 24px;
          height: 24px;
        }

        .hero-title {
          margin: 0 0 0.75rem;
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--gray-900);
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          margin: 0;
          font-size: 1rem;
          color: var(--gray-600);
          line-height: 1.6;
        }

        .content-section {
          background: white;
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .card-content {
          padding: 1.5rem;
        }

        /* Tab Navigation */
        .tab-navigation {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-600);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-button:hover:not(.disabled) {
          background: var(--light-blue);
          color: var(--primary-blue);
          border-color: var(--primary-blue);
        }

        .tab-button.active {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        .tab-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tab-icon svg {
          width: 14px;
          height: 14px;
        }

        /* Tab Content */
        .tab-content {
          min-height: 300px;
        }

        /* Loading and Error States */
        .loading-state,
        .error-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem;
          color: var(--gray-600);
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid var(--gray-300);
          border-top: 2px solid var(--primary-blue);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-state svg {
          width: 24px;
          height: 24px;
          color: #dc2626;
        }

        .error-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .back-btn:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
        }

        .back-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Overview Styles */
        .overview-container {
          padding: 1rem 0;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .overview-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--gray-50);
          border-radius: 8px;
          border: 1px solid var(--gray-200);
        }

        .overview-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .overview-icon svg {
          width: 16px;
          height: 16px;
        }

        .overview-content {
          flex: 1;
        }

        .overview-label {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-bottom: 0.25rem;
        }

        .overview-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        /* Path List Styles */
        .path-list-layout {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: start;
        }

        .path-list-main {
          flex: 1;
        }

        .path-list-sidebar {
          width: 280px;
          position: sticky;
          top: 2rem;
        }

        .accuracy-card {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          text-align: center;
        }

        .accuracy-header {
          margin-bottom: 1.5rem;
        }

        .accuracy-header h4 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .accuracy-header p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .accuracy-gauge-large {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .accuracy-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
        }

        .score-label {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .empty-path-list {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem;
          color: var(--gray-500);
        }

        .empty-path-list svg {
          width: 24px;
          height: 24px;
        }

        .path-list-container {
          padding: 1rem 0;
        }

        .path-list-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .path-list-header svg {
          width: 18px;
          height: 18px;
          color: var(--primary-blue);
        }

        .path-list-header h4 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .path-list-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* File Item Styles */
        .file-item-card {
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          overflow: hidden;
        }

        .file-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: white;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .file-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .file-icon svg {
          width: 14px;
          height: 14px;
        }

        .file-name {
          font-weight: 600;
          color: var(--gray-900);
        }

        .file-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid var(--gray-300);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--gray-700);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover:not(:disabled) {
          background: var(--light-blue);
          color: var(--primary-blue);
          border-color: var(--primary-blue);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn svg {
          width: 14px;
          height: 14px;
        }

        .btn-spinner {
          width: 14px;
          height: 14px;
          border: 1px solid var(--gray-400);
          border-top: 1px solid var(--primary-blue);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .file-preview {
          border-top: 1px solid var(--gray-200);
        }

        .preview-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--gray-100);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
        }

        .preview-header svg {
          width: 14px;
          height: 14px;
        }

        .preview-content {
          max-height: 400px;
          overflow: auto;
        }

        .file-path {
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          color: var(--gray-500);
          background: var(--gray-100);
          border-top: 1px solid var(--gray-200);
          font-family: monospace;
        }

        /* Report Styles */
        .reports-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .report-group {
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          overflow: hidden;
        }

        .report-group-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: white;
          border-bottom: 1px solid var(--gray-200);
        }

        .report-group-header svg {
          width: 16px;
          height: 16px;
          color: var(--primary-blue);
        }

        .report-group-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .empty-report {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          color: var(--gray-500);
        }

        .empty-report svg {
          width: 20px;
          height: 20px;
        }

        .report-items {
          padding: 1rem;
        }

        .report-item {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .report-item:last-child {
          margin-bottom: 0;
        }

        .report-item-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .report-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .report-icon svg {
          width: 12px;
          height: 12px;
        }

        .report-name {
          font-weight: 600;
          color: var(--gray-900);
        }

        .report-section {
          margin-bottom: 1rem;
        }

        .report-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .report-line {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .line-label {
          font-weight: 600;
          color: var(--gray-700);
          min-width: 80px;
        }

        .line-value {
          color: var(--gray-600);
          flex: 1;
        }

        .report-json {
          background: var(--gray-50);
          border-radius: 6px;
          overflow: hidden;
        }

        /* JSON Report Styles */
        .json-report-container {
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          overflow: hidden;
        }

        .json-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: white;
          border-bottom: 1px solid var(--gray-200);
        }

        .json-header svg {
          width: 16px;
          height: 16px;
          color: var(--primary-blue);
        }

        .json-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .json-content {
          max-height: 600px;
          overflow: auto;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .path-list-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .path-list-sidebar {
            width: 100%;
            position: static;
          }

          .tab-navigation {
            flex-direction: column;
            align-items: stretch;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }

          .content-hero {
            padding: 1.5rem 0;
          }

          .hero-title {
            font-size: 1.625rem;
          }

          .card-content {
            padding: 1rem;
          }

          .file-item-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .file-actions {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

          .tab-button {
            justify-content: center;
          }

          .overview-item {
            flex-direction: column;
            text-align: center;
          }
        }

        /* Accuracy Gauge Styles */
        .accuracy-gauge {
          display: inline-block;
          position: relative;
        }

        .accuracy-gauge svg {
          display: block;
        }

        .accuracy-gauge circle {
          transition: stroke-dashoffset 0.8s ease-in-out;
        }

        .accuracy-gauge text {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          transition: all 0.3s ease-in-out;
        }

        /* Evaluation Card Styles */
        .evaluation-card {
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          margin-top: 1rem;
        }

        .evaluation-header {
          margin-bottom: 1rem;
          text-align: center;
        }

        .evaluation-header h4 {
          margin: 0 0 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .evaluation-header p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .evaluation-empty {
          text-align: center;
          padding: 1rem;
          color: var(--gray-500);
          font-size: 0.875rem;
        }

                 .evaluation-data-list {
           display: flex;
           flex-direction: column;
           gap: 0.75rem;
         }

         .evaluation-item {
           background: white;
           border: 1px solid var(--gray-200);
           border-radius: 8px;
           padding: 1rem;
           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
         }

         .evaluation-class-name {
           font-weight: 600;
           color: var(--gray-900);
           margin-bottom: 0.75rem;
           font-size: 0.875rem;
           padding-bottom: 0.5rem;
           border-bottom: 1px solid var(--gray-100);
         }

                   .evaluation-list-container {
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid var(--gray-200);
            border-radius: 8px;
            background: white;
          }

          .evaluation-list-container::-webkit-scrollbar {
            width: 8px;
          }

          .evaluation-list-container::-webkit-scrollbar-track {
            background: var(--gray-100);
            border-radius: 4px;
          }

          .evaluation-list-container::-webkit-scrollbar-thumb {
            background: var(--gray-300);
            border-radius: 4px;
            transition: background 0.2s ease;
          }

          .evaluation-list-container::-webkit-scrollbar-thumb:hover {
            background: var(--gray-400);
          }

          .evaluation-list {
            margin: 0;
            padding: 0.75rem;
            font-size: 0.8rem;
            color: var(--gray-700);
            line-height: 1.6;
          }

          .evaluation-list li {
            margin-bottom: 0.75rem;
            padding: 0.75rem 1rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 8px;
            border: 1px solid var(--gray-200);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            position: relative;
            transition: all 0.2s ease;
          }

          .evaluation-list li:hover {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-color: var(--primary-blue);
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .evaluation-list li:last-child {
            margin-bottom: 0;
          }

                     .evaluation-list li::before {
             content: "";
             position: absolute;
             left: 0;
             top: 0;
             bottom: 0;
             width: 4px;
             background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
             border-radius: 8px 0 0 8px;
           }

           .violation-item {
             margin-bottom: 1rem;
             padding: 1rem;
             background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
             border: 1px solid #fecaca;
             border-radius: 8px;
             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
             position: relative;
             transition: all 0.2s ease;
           }

           .violation-item:hover {
             background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
             border-color: #f87171;
             transform: translateY(-1px);
             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
           }

           .violation-item:last-child {
             margin-bottom: 0;
           }

           .violation-item::before {
             content: "";
             position: absolute;
             left: 0;
             top: 0;
             bottom: 0;
             width: 4px;
             background: linear-gradient(135deg, #ef4444, #dc2626);
             border-radius: 8px 0 0 8px;
           }

           .violation-rule {
             margin-bottom: 0.75rem;
             font-size: 0.85rem;
             color: #991b1b;
             line-height: 1.5;
           }

           .violation-hint {
             font-size: 0.85rem;
             color: #7c2d12;
             line-height: 1.5;
             padding-top: 0.75rem;
             border-top: 1px solid #fecaca;
           }

           .violation-rule strong,
           .violation-hint strong {
             color: #dc2626;
             font-weight: 600;
           }

                     .evaluation-success {
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 0.75rem;
             padding: 1rem 1.25rem;
             background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
             border: 1px solid #bbf7d0;
             border-radius: 8px;
             color: #166534;
             font-size: 0.85rem;
             font-weight: 500;
             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
             text-align: center;
             white-space: nowrap;
             flex-wrap: nowrap;
           }

           .evaluation-success svg {
             width: 18px;
             height: 18px;
             color: #16a34a;
             flex-shrink: 0;
           }
      `}</style>
    </div>
  );
}

// 평가 데이터 표시 컴포넌트
function EvaluationDataList({ evaluationData }) {
  if (!evaluationData || evaluationData.length === 0) {
    return (
      <div className="evaluation-empty">
        <span>평가 데이터가 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="evaluation-data-list">
      {evaluationData.map((data, index) => (
        <div key={index} className="evaluation-item">
          {data.violations.length > 0 ? (
            <div className="evaluation-list-container">
              {data.violations.map((violation, idx) => (
                <div key={idx} className="violation-item">
                  <div className="violation-rule">
                    <strong>규칙 미준수:</strong> {violation.missing}
                  </div>
                  {violation.hint && (
                    <div className="violation-hint">
                      <strong>추천 수정 사항:</strong> {violation.hint}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="evaluation-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
              <span>✓ 위반 사항이 없습니다.</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Helper Components ───────────────────────── */

function getTabIcon(key) {
  switch (key) {
    case "overview":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3zM9 9h6v6H9z"></path>
        </svg>
      );
    case "controller":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <circle cx="12" cy="16" r="1"></circle>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      );
    case "service":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M1 12h6m6 0h6"></path>
        </svg>
      );
    case "serviceimpl":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
        </svg>
      );
    case "vo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      );
    case "reports":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      );
    case "reports_json":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <path d="M10 12a2 2 0 0 0 2 2c1 0 2-1 2-2s-1-2-2-2-2 1-2 2z"></path>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      );
  }
}

function labelOf(key) {
  switch (key) {
    case "overview": return "개요";
    case "controller": return "Controller";
    case "service": return "Service";
    case "serviceimpl": return "ServiceImpl";
    case "vo": return "VO";
    case "reports": return "변환 리포트";
    case "reports_json": return "리포트(JSON)";
    default: return key;
  }
}

function Overview({ data }) {
  const rows = [
    ["Job ID", data.jobId, "briefcase"],
    ["User ID", data.userId, "user"],
    ["입력 언어", data.inputLanguage ?? "-", "code"],
    ["원본 ZIP", data.s3OriginPath ?? "-", "archive"],
    ["저장 시각", data.savedAt ?? "-", "clock"],
  ];
  
  return (
    <div className="overview-container">
      <div className="overview-grid">
        {rows.map(([label, value, iconType]) => (
          <div key={label} className="overview-item">
            <div className="overview-icon">
              {getOverviewIcon(iconType)}
            </div>
            <div className="overview-content">
              <div className="overview-label">{label}</div>
              <div className="overview-value">{String(value)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getOverviewIcon(type) {
  switch (type) {
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16,18 22,12 16,6"></polyline>
          <polyline points="8,6 2,12 8,18"></polyline>
        </svg>
      );
    case "archive":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="21,8 21,21 3,21 3,8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12,6 12,12 16,14"></polyline>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      );
  }
}

/**
 * S3 경로 목록을 표시하고, 각 항목에 대해
 *  - 다운로드(새 탭)
 *  - 미리보기(텍스트 로드 → 코드 하이라이트)
 */
function PathList({ title, list, detail }) {
  const arr = Array.isArray(list) ? list : [];
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  
  // 탭 타입에 따른 정확도 계산
  const getTabTypeFromTitle = (title) => {
    if (title.includes('Controller')) return 'controller';
    if (title.includes('Service') && !title.includes('Impl')) return 'service';
    if (title.includes('ServiceImpl')) return 'serviceimpl';
    if (title.includes('VO')) return 'vo';
    return null;
  };
  
  const tabType = getTabTypeFromTitle(title);
  const accuracy = tabType ? getTabAccuracy(detail, tabType) : null;
  const evaluationData = tabType ? getTabEvaluationData(detail, tabType) : null;
  
  // 점수 애니메이션 효과
  useEffect(() => {
    if (accuracy !== null && accuracy !== undefined) {
      setIsScoreAnimating(true);
      setAnimatedScore(0);
      
      const targetScore = Math.round(accuracy * 100);
      const duration = 1500; // 1.5초
      const steps = 60; // 60프레임
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        // Easing 함수: easeOutQuart
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const newScore = Math.round(targetScore * easedProgress);
        
        setAnimatedScore(newScore);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setIsScoreAnimating(false);
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    }
  }, [accuracy]);
  
  if (!arr.length) {
    return (
      <div className="path-list-layout">
        <div className="path-list-main">
          <div className="empty-path-list">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            <span>{title}가 없습니다.</span>
          </div>
        </div>
        {accuracy !== null && (
          <div className="path-list-sidebar">
            <div className="accuracy-card">
              <div className="accuracy-header">
                <h4>변환 정확도</h4>
                <p>AI 변환 품질 평가</p>
              </div>
              <div className="accuracy-gauge-large">
                <AccuracyGauge accuracy={accuracy} size={120} tabType={tabType} />
              </div>
              <div className="accuracy-score">
                <span 
                  className="score-value"
                  style={{
                    transition: isScoreAnimating ? 'none' : 'all 0.3s ease-in-out'
                  }}
                >
                  {animatedScore}%
                </span>
                <span className="score-label">정확도</span>
              </div>
            </div>
            
            {evaluationData && (
              <div className="evaluation-card">
                <div className="evaluation-header">
                  <h4>위반사항</h4>
                  <p>변환 품질 분석 결과</p>
                </div>
                <EvaluationDataList evaluationData={evaluationData} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="path-list-layout">
      <div className="path-list-main">
        <div className="path-list-container">
          <div className="path-list-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <h4>{title}</h4>
          </div>
          <div className="path-list-grid">
            {arr.map((s3Path, idx) => (
              <FileItem key={idx} s3Path={s3Path} detail={detail} />
            ))}
          </div>
        </div>
      </div>
              {accuracy !== null && (
          <div className="path-list-sidebar">
            <div className="accuracy-card">
              <div className="accuracy-header">
                <h4>변환 정확도</h4>
                <p>AI 변환 품질 평가</p>
              </div>
              <div className="accuracy-gauge-large">
                <AccuracyGauge accuracy={accuracy} size={120} tabType={tabType} />
              </div>
              <div className="accuracy-score">
                <span 
                  className="score-value"
                  style={{
                    transition: isScoreAnimating ? 'none' : 'all 0.3s ease-in-out'
                  }}
                >
                  {animatedScore}%
                </span>
                <span className="score-label">정확도</span>
              </div>
            </div>
            
            {evaluationData && (
              <div className="evaluation-card">
                <div className="evaluation-header">
                  <h4>위반사항</h4>
                  <p>변환 품질 분석 결과</p>
                </div>
                <EvaluationDataList evaluationData={evaluationData} />
              </div>
            )}
          </div>
        )}
    </div>
  );
}

function FileItem({ s3Path, detail }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileName = s3Path.split("/").pop() || s3Path;

  // 미리보기
  const handlePreview = useCallback(async () => {
    if (preview != null) {
      setPreview(null);
      return;
    }
    setLoading(true);
    try {
      const url = `${GET_BASE}/agents/view/${s3Path}`;
      const resp = await fetch(url, { headers: { Accept: "text/plain" } });
      if (!resp.ok) throw new Error(`미리보기 실패 (${resp.status})`);
      const text = await resp.text();
      setPreview(text);
    } catch (e) {
      console.error("Error fetching preview:", e);
      alert(String(e));
    } finally {
      setLoading(false);
    }
  }, [detail?.jobId, detail?.userId, s3Path, preview]);

  const handleDownload = useCallback(async () => {
    try {
      console.log(s3Path);
      const res = await fetch(`${GET_BASE}/agents/download/${s3Path}`, { method: "GET" });
      if (!res.ok) throw new Error(`다운로드 URL 요청 실패 (${res.status})`);
      const data = await res.json();             // { path: "https://..." }
      const presigned = data?.path || data?.url || data?.presignedUrl;
      if (!presigned) throw new Error("다운로드 URL이 비어 있습니다.");

      // a[download]로 즉시 다운로드 트리거 (파일명은 서버 Content-Disposition 헤더에 따름)
      const a = document.createElement("a");
      a.href = presigned;
      a.download = ""; // same-origin일 때만 이름 반영, cross-origin은 서버 헤더 적용
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error("Error downloading file:", e);
      alert(String(e));
    }
  }, [s3Path]);

  return (
    <div className="file-item-card">
      <div className="file-item-header">
        <div className="file-info">
          <div className="file-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div className="file-name">{fileName}</div>
        </div>
        <div className="file-actions">
          <button 
            onClick={handlePreview} 
            className="action-btn preview-btn" 
            disabled={loading}
          >
            {loading ? (
              <div className="btn-spinner"></div>
            ) : preview != null ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
            {loading ? "불러오는 중..." : preview != null ? "닫기" : "미리보기"}
          </button>
          <button 
            onClick={handleDownload} 
            className="action-btn download-btn" 
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            다운로드
          </button>
        </div>
      </div>

      {preview != null && (
        <div className="file-preview">
          <div className="preview-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16,18 22,12 16,6"></polyline>
              <polyline points="8,6 2,12 8,18"></polyline>
            </svg>
            <span>코드 미리보기</span>
          </div>
          <div className="preview-content">
            <SyntaxHighlighter language={guessLang(fileName)} style={github} wrapLongLines showLineNumbers>
              {preview}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      <div className="file-path">{s3Path}</div>
    </div>
  );
}

/**
 * 리포트 그룹: [{ "ClassName": { ... } }, ... ] 형태를 카드로 정리
 */
function ReportGroup({ title, items }) {
  const arr = Array.isArray(items) ? items : [];
  
  return (
    <div className="report-group">
      <div className="report-group-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <h4>{title}</h4>
      </div>
      
      {arr.length === 0 ? (
        <div className="empty-report">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <span>리포트가 없습니다.</span>
        </div>
      ) : (
        <div className="report-items">
          {arr.map((obj, i) => {
            const [name, content] = firstEntry(obj);
            // content가 {변경 사항, 추가 사항, 요약} 또는 nested 구조일 수 있으므로 방어적으로 처리
            const conv = content?.conversion ?? content;
            const gen  = content?.generation;

            return (
              <div key={i} className="report-item">
                <div className="report-item-header">
                  <div className="report-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16,18 22,12 16,6"></polyline>
                      <polyline points="8,6 2,12 8,18"></polyline>
                    </svg>
                  </div>
                  <div className="report-name">{name}</div>
                </div>

                {conv && (
                  <div className="report-section">
                    <div className="section-title">변환</div>
                    {"변경 사항" in conv && <Line label="변경 사항" value={conv["변경 사항"]} />}
                    {"추가 사항" in conv && <Line label="추가 사항" value={conv["추가 사항"]} />}
                    {"요약" in conv && <Line label="요약" value={conv["요약"]} />}
                  </div>
                )}

                {gen && (
                  <div className="report-section">
                    <div className="section-title">생성</div>
                    {"변경 사항" in gen && <Line label="변경 사항" value={gen["변경 사항"]} />}
                    {"추가 사항" in gen && <Line label="추가 사항" value={gen["추가 사항"]} />}
                    {"요약" in gen && <Line label="요약" value={gen["요약"]} />}
                  </div>
                )}

                {!conv && !gen && typeof content === "object" && (
                  <div className="report-json">
                    <SyntaxHighlighter language="json" style={github} wrapLongLines>
                      {JSON.stringify(content, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div className="report-line">
      <span className="line-label">{label}:</span>
      <span className="line-value">{String(value)}</span>
    </div>
  );
}

function firstEntry(obj) {
  if (!obj || typeof obj !== "object") return [("-", obj)];
  const k = Object.keys(obj)[0];
  return [k ?? "-", obj?.[k]];
}

// 파일 확장자로 언어 유추
function guessLang(file) {
  const lower = file.toLowerCase();
  if (lower.endsWith(".java")) return "java";
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".xml")) return "xml";
  if (lower.endsWith(".yml") || lower.endsWith(".yaml")) return "yaml";
  if (lower.endsWith(".md")) return "markdown";
  return "java"; // 기본: 자바
}

// 파일 상단(컴포넌트 밖)에 유틸 추가
function detectGroupByPath(p) {
  const lower = (p || "").toLowerCase();
  if (lower.includes("/controller/"))    return "controller";
  if (lower.includes("/serviceimpl/") || lower.includes("/serviceimpl/")) return "serviceimpl";
  if (lower.includes("/service/"))       return "service";
  if (lower.includes("/vo/"))            return "vo";
  // 못 찾으면 기본값
  return "controller";
}