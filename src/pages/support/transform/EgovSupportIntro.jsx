import { Link } from "react-router-dom";
import EgovLeftNavTransform from "@/components/leftmenu/EgovLeftNavTransform";
import "@/css/modern-styles.css";
import "@/css/visual-effects.css";

function EgovSupportIntro() {
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
            <span className="breadcrumb-current">기능 소개</span>
          </div>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNavTransform />

          {/* Main Content */}
          <main className="modern-content">
            {/* Hero Section */}
            <section className="content-hero">
              <div className="hero-content">
                <div className="hero-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                    <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                    <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                  </svg>
                </div>
                <h1 className="hero-title">AI 변환기</h1>
                <p className="hero-description">전자정부표준프레임워크로 코드를 자동 변환하는 AI 도구입니다</p>
              </div>
            </section>

            {/* Content Section */}
            <section className="content-section">
              <div className="info-card">
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h2 className="card-title">기능 소개</h2>
                </div>
                <div className="card-content">
                  <p className="card-text">
                    AI 변환기는 사용자가 업로드한 코드를 <strong>전자정부표준프레임워크(eGovFrame)</strong> 구조에 맞춰 자동으로 변환해주는 도구입니다.
                  </p>

              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "24px",
                  marginTop: "20px",
                  lineHeight: "1.8",
                  fontSize: "15px",
                  color: "#333"
                }}
              >
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <strong>자동 프레임워크 전환</strong><br />
                    기존의 일반 Spring, FastAPI, Flask 등의 코드 구조를 전자정부프레임워크 구조에 맞춰 재구성합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>기능 인식 및 모듈 매핑</strong><br />
                    업로드된 코드에서 REST API, DB 연동, 서비스 로직 등을 인식하여 eGovFrame 모듈로 자동 매핑합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>보안 템플릿 적용</strong><br />
                    보안에 취약한 코드 패턴을 탐지하고, eGovFrame 보안 코딩 가이드를 기반으로 수정 제안을 반영합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>테스트 코드 변환 지원</strong><br />
                    단위 테스트 코드를 함께 변환하거나, JUnit 기반으로 변환된 테스트 코드를 제공합니다.
                  </li>
                  <li style={{ marginTop: "16px" }}>
                    <strong>결과 다운로드</strong><br />
                    변환된 결과물은 .zip 파일로 압축되어 제공되며, 다운로드 및 이력 확인이 가능합니다.
                  </li>
                </ul>
              </div>

              <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
                ※ 변환 품질을 높이기 위해 정확한 코드 업로드와 기능 명세 입력을 권장합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSupportIntro;
