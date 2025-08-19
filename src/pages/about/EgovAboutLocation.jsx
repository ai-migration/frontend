import { Link } from "react-router-dom";

import URL from "@/constants/url";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

import mapImg from "/assets/images/map.png";
import qrImg from "/assets/images/qrcode.png";

function EgovAboutLocation() {
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
            <span className="breadcrumb-current">찾아오시는길</span>
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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h1 className="hero-title">찾아오시는길</h1>
                <p className="hero-description">
                  표준프레임워크센터 위치 안내 및 교통편 정보를 제공합니다.
                </p>
              </div>
            </section>

            {/* Map Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  <h2>위치 지도</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="map-container">
                  <a
                    href="https://naver.me/FHYuP0ok"
                    target="_blank"
                    rel="noreferrer"
                    className="map-link"
                  >
                    <img src={mapImg} alt="표준프레임워크센터 위치 지도" className="map-image" />
                    <div className="map-overlay">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      <span>네이버 지도에서 보기</span>
                    </div>
                  </a>
                </div>
              </div>
            </section>

            {/* Address and QR Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <h2>주소 정보</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="address-grid">
                  <div className="address-section">
                    <div className="address-header">
                      <div className="address-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
                          <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
                          <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"></path>
                        </svg>
                      </div>
                      <h3>표준프레임워크센터 주소</h3>
                    </div>
                    <div className="address-details">
                      <div className="address-item">
                        <div className="address-label">도로명주소</div>
                        <div className="address-value">04513 서울특별시 중구 세종대로 39 대한서울상공회의소 7층</div>
                      </div>
                      <div className="address-item">
                        <div className="address-label">지번주소</div>
                        <div className="address-value">04513 서울특별시 중구 남대문로4가 45 대한서울상공회의소 7층</div>
                      </div>
                    </div>
                  </div>

                  <div className="qr-section">
                    <div className="qr-header">
                      <div className="qr-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="5" height="5"></rect>
                          <rect x="16" y="3" width="5" height="5"></rect>
                          <rect x="3" y="16" width="5" height="5"></rect>
                          <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                          <path d="M21 21v.01"></path>
                          <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                          <path d="M3 12h.01"></path>
                          <path d="M12 3h.01"></path>
                          <path d="M12 16v.01"></path>
                          <path d="M16 12h1"></path>
                          <path d="M21 12v.01"></path>
                          <path d="M12 21v-1"></path>
                        </svg>
                      </div>
                      <h3>QR코드로 위치알아보기</h3>
                    </div>
                    <div className="qr-content">
                      <p>
                        스마트폰에서 QR코드 리더를 이용해 사진·지도 등 
                        다양한 정보를 확인하세요.
                      </p>
                      <div className="qr-image-container">
                        <img src={qrImg} alt="QR 코드" className="qr-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Transportation and Contact Section */}
            <section className="content-section modern-card">
              <div className="card-header">
                <div className="header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h2>교통편 및 연락처</h2>
                </div>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div className="transportation-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18l-3 9H6l-3-9z"></path>
                          <path d="M8 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                          <path d="M16 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                        </svg>
                      </div>
                      <h4>지하철 이용안내</h4>
                    </div>
                    <div className="transportation-details">
                      <div className="transport-item">
                        <div className="line-badge line-2">2호선</div>
                        <div className="transport-info">
                          <span className="station">시청역</span>
                          <span className="exit">9번 출구</span>
                          <span className="distance">도보 5분</span>
                        </div>
                      </div>
                      <div className="transport-item">
                        <div className="line-badge line-1">1호선</div>
                        <div className="transport-info">
                          <span className="station">서울역</span>
                          <span className="exit">3번 출구</span>
                          <span className="distance">도보 5분</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contact-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <h4>연락처</h4>
                    </div>
                    <div className="contact-details">
                      <div className="contact-item">
                        <div className="contact-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </div>
                        <div className="contact-info">
                          <span className="contact-label">전화</span>
                          <span className="contact-value">0000-0000</span>
                        </div>
                      </div>
                      <div className="contact-item">
                        <div className="contact-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </div>
                        <div className="contact-info">
                          <span className="contact-label">이메일</span>
                          <span className="contact-value">egovframeexample@gmail.com</span>
                        </div>
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
          background: linear-gradient(135deg, #10B981, #059669);
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
          background: linear-gradient(135deg, #10B981, #059669);
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
            rgba(16, 185, 129, 0.05) 0%, 
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
          color: #10B981;
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

        /* Map Styles */
        .map-container {
          position: relative;
          border-radius: var(--border-radius-xl);
          overflow: hidden;
          border: 1px solid var(--gray-200);
        }

        .map-link {
          display: block;
          position: relative;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .map-link:hover .map-overlay {
          opacity: 1;
        }

        .map-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(16, 185, 129, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: white;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .map-overlay svg {
          width: 32px;
          height: 32px;
        }

        .map-overlay span {
          font-weight: 600;
          font-size: 1.125rem;
        }

        /* Address Grid */
        .address-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .address-section,
        .qr-section {
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
        }

        .address-header,
        .qr-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .address-icon,
        .qr-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: var(--border-radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .address-icon svg,
        .qr-icon svg {
          width: 16px;
          height: 16px;
        }

        .address-header h3,
        .qr-header h3 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .address-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .address-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background: white;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .address-label {
          font-weight: 600;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .address-value {
          color: var(--gray-900);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .qr-content p {
          margin: 0 0 1.5rem;
          color: var(--gray-700);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .qr-image-container {
          display: flex;
          justify-content: center;
          padding: 1rem;
          background: white;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .qr-image {
          width: 120px;
          height: 120px;
          border-radius: var(--border-radius-md);
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .transportation-section,
        .contact-section {
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-xl);
          border: 1px solid var(--gray-200);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .section-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: var(--border-radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .section-icon svg {
          width: 16px;
          height: 16px;
        }

        .section-header h4 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .transportation-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transport-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .line-badge {
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          font-size: 0.8rem;
          color: white;
          flex-shrink: 0;
        }

        .line-badge.line-1 {
          background: #263C96;
        }

        .line-badge.line-2 {
          background: #00A84D;
        }

        .transport-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .station {
          font-weight: 600;
          color: var(--gray-900);
        }

        .exit,
        .distance {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .contact-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .contact-icon svg {
          width: 16px;
          height: 16px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-label {
          font-weight: 600;
          color: var(--gray-700);
          font-size: 0.875rem;
        }

        .contact-value {
          color: var(--gray-900);
          font-size: 0.95rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .modern-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .address-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
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

          .address-section,
          .qr-section,
          .transportation-section,
          .contact-section {
            padding: 1rem;
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

          .transport-item,
          .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovAboutLocation;
