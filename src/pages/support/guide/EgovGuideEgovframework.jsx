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

            {/* Content Section */}
            <section className="content-section modern-card">
              <div className="card-content">
                <p className="text-lg text-gray-700">
                  전자정부프레임워크는 대한민국의 공공기관에서 사용하는 표준 개발 프레임워크입니다.
                  효율적이고 안전한 전자정부 서비스 개발을 위한 다양한 기능과 도구를 제공합니다.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
export default EgovGuideEgovframework;