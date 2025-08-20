import { Link } from "react-router-dom";

import logoFooterImg from "/assets/images/logo_footer_ai.png";
import logoFooterImgMobile from "/assets/images/logo_footer_m.png";
import bannerImg_01 from "/assets/images/banner_w_01.png";
import bannerImgMobile_01 from "/assets/images/banner_m_01.png";
import bannerImg_02 from "/assets/images/banner_w_02.png";
import bannerImgMobile_02 from "/assets/images/banner_m_02.png";

function EgovFooter() {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Logo and Mission Section */}
          <div className="footer-brand">
            <Link to="/" className="logo-link">
              <img className="logo-desktop" src={logoFooterImg} alt="AIVLE" />
              <img className="logo-mobile" src={logoFooterImgMobile} alt="AIVLE Mobile" />
            </Link>
            <div className="mission-statement">
              <h3>AI CODE MIGRATION</h3>
              <p>전자정부표준프레임워크 기반 코드 자동 변환 서비스</p>
              <p className="mission-desc">디지털 혁신을 통한 공공서비스 품질 향상</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <div className="link-group">
              <h4>서비스</h4>
              <ul>
                <li><Link to="/support/transform/intro">AI 변환기</Link></li>
                <li><Link to="/support/transform/view_transform/detail">변환 이력</Link></li>
                <li><Link to="/support/guide">사용자 가이드</Link></li>
                <li><Link to="/support/qna">문의사항</Link></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>정보</h4>
              <ul>
                <li><Link to="/about/site">프로젝트 소개</Link></li>
                <li><Link to="/about/history">개발 연혁</Link></li>
                <li><Link to="/about/organization">조직도</Link></li>
                <li><Link to="/about/location">오시는 길</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact and Partners */}
          <div className="footer-contact">
            <div className="contact-section">
              <h4>연락처</h4>
              <div className="contact-details">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>010-4463-5077</span>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>education@aivle.kt.co.kr</span>
                </div>
              </div>
              
              <div className="external-links">
                <a href="https://github.com/leeyumin-dev/ai_migration" target="_blank" rel="noopener noreferrer" className="external-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </a>
                <a href="https://www.notion.so/AI-Code-Migration-2297bde02a66809da989c76132e4cdc5" target="_blank" rel="noopener noreferrer" className="external-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  Notion
                </a>
              </div>
            </div>

            {/* Government Partners */}
            <div className="partners-section">
              <h4>협력기관</h4>
              <div className="partner-logos">
                <a href="https://www.mois.go.kr" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <img className="banner-desktop" src={bannerImg_01} alt="행정안전부" />
                  <img className="banner-mobile" src={bannerImgMobile_01} alt="행정안전부 모바일" />
                </a>
                <a href="https://www.nia.or.kr" target="_blank" rel="noopener noreferrer" className="partner-link">
                  <img className="banner-desktop" src={bannerImg_02} alt="NIA" />
                  <img className="banner-mobile" src={bannerImgMobile_02} alt="NIA 모바일" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Policy */}
        <div className="footer-bottom">
          <div className="policy-links">
            <a
              href="https://aivle.edu.kt.co.kr/home/main/privateMain"
              target="_blank"
              rel="noopener noreferrer"
              className="policy-link primary"
            >
              개인정보 처리방침
            </a>
            <span className="separator">|</span>
            <a
              href="https://aivle.edu.kt.co.kr/home/main/policySvcMain"
              target="_blank"
              rel="noopener noreferrer"
              className="policy-link"
            >
              이용약관
            </a>
          </div>
          <div className="copyright">
            <p>Copyright © 2025 KT AIVLE SCHOOL BIG PROJECT GROUP 10. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style>{`
        /* Modern Footer Styles */
        .modern-footer {
          background: #ffffff;
          color: #374151;
          border-top: 1px solid #e5e7eb;
          margin-top: auto;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
        }

        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 2rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        /* Brand Section */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .logo-link {
          display: block;
          transition: opacity 0.2s ease;
        }

        .logo-link:hover {
          opacity: 0.8;
        }

        .logo-desktop {
          display: block;
          height: 50px;
          width: auto;
        }

        .logo-mobile {
          display: none;
        }

        .mission-statement h3 {
          margin: 0 0 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          letter-spacing: -0.025em;
        }

        .mission-statement p {
          margin: 0 0 0.5rem;
          color: #4b5563;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .mission-desc {
          font-weight: 600;
          color: #2563eb !important;
        }

        /* Links Section */
        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .link-group {
          flex: 1;
        }

        .link-group h4 {
          margin: 0 0 1rem;
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .link-group ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .link-group li {
          margin-bottom: 0.5rem;
        }

        .link-group a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .link-group a:hover {
          color: #2563eb;
        }

        /* Contact Section */
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-section h4,
        .partners-section h4 {
          margin: 0 0 1rem;
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .contact-item svg {
          width: 16px;
          height: 16px;
          color: #2563eb;
          flex-shrink: 0;
        }

        .contact-item span {
          color: #374151;
          font-size: 0.875rem;
        }

        .external-links {
          display: flex;
          gap: 1rem;
        }

        .external-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          color: #475569;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .external-link:hover {
          background: #2563eb;
          border-color: #2563eb;
          color: white;
          transform: translateY(-1px);
        }

        .external-link svg {
          width: 14px;
          height: 14px;
        }

        /* Partners Section */
        .partner-logos {
          display: flex;
          gap: 1rem;
        }

        .partner-link {
          display: block;
          padding: 0.75rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .partner-link:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .banner-desktop {
          display: block;
          height: 35px;
          width: auto;
          transition: all 0.3s ease;
        }

        .partner-link:hover .banner-desktop {
          transform: scale(1.05);
        }

        .banner-mobile {
          display: none;
        }

        /* Footer Bottom */
        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .policy-links {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .policy-link {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.2s ease;
          font-size: 0.875rem;
        }

        .policy-link:hover {
          color: #2563eb;
        }

        .policy-link.primary {
          font-weight: 600;
          color: #374151;
        }

        .separator {
          color: #9ca3af;
        }

        .copyright p {
          margin: 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
          }

          .contact-info {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }

          .footer-banners {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 1.5rem;
          }

          .logo-desktop,
          .banner-desktop {
            display: none;
          }

          .logo-mobile,
          .banner-mobile {
            display: block;
          }

          .logo-mobile {
            height: 50px;
            width: auto;
          }

          .banner-mobile {
            height: 35px;
            width: auto;
            transition: all 0.3s ease;
          }

          .contact-info {
            grid-template-columns: 1fr;
          }

          .contact-item {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            text-align: center;
          }

          .contact-label {
            min-width: auto;
            font-size: 0.875rem;
          }

          .policy-links {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }

          .separator {
            display: none;
          }

          .footer-banners {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .footer-container {
            padding: 1rem;
          }

          .footer-main {
            gap: 1rem;
          }

          .contact-link {
            font-size: 0.875rem;
          }

          .policy-link {
            font-size: 0.8rem;
          }

          .copyright p {
            font-size: 0.8rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </footer>
  );
}

export default EgovFooter;