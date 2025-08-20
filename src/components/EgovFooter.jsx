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
          {/* Logo Section */}
          <div className="footer-logo">
            <Link to="/" className="logo-link">
              <img className="logo-desktop" src={logoFooterImg} alt="AIVLE" />
              <img className="logo-mobile" src={logoFooterImgMobile} alt="AIVLE Mobile" />
            </Link>
          </div>

          {/* Info Section */}
          <div className="footer-info">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">GitHub</span>
                <a
                  href="https://github.com/leeyumin-dev/ai_migration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15,3 21,3 21,9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  바로가기
                </a>
              </div>
              
              <div className="contact-item">
                <span className="contact-label">대표전화</span>
                <span className="contact-value">010-4463-5077</span>
              </div>

              <div className="contact-item">
                <span className="contact-label">Notion</span>
                <a
                  href="https://www.notion.so/AI-Code-Migration-2297bde02a66809da989c76132e4cdc5?p=23e7bde02a668016996ac7a4802ebcef&pm=s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15,3 21,3 21,9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  바로가기
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">교육문의</span>
                <span className="contact-value">010-4463-5077</span>
              </div>
            </div>

            {/* Policy Links */}
            <div className="policy-links">
              <a
                href="https://aivle.edu.kt.co.kr/home/main/privateMain"
                target="_blank"
                rel="noopener noreferrer"
                className="policy-link primary"
              >
                AI CODE MIGRATION 개인정보 처리방침
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
          </div>

          {/* Banner Section */}
          <div className="footer-banners">
            <a 
              href="https://www.mois.go.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="banner-link"
            >
              <img className="banner-desktop" src={bannerImg_01} alt="행정안전부" />
              <img className="banner-mobile" src={bannerImgMobile_01} alt="행정안전부 모바일" />
            </a>
            <a 
              href="https://www.nia.or.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="banner-link"
            >
              <img className="banner-desktop" src={bannerImg_02} alt="NIA" />
              <img className="banner-mobile" src={bannerImgMobile_02} alt="NIA 모바일" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>Copyright © 2025 KT AIVLE SCHOOL BIG PROJECT GROUP 10. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style>{`
        /* Modern Footer Styles */
        .modern-footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: #e2e8f0;
          border-top: 1px solid #334155;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 2rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 2rem;
          align-items: start;
          margin-bottom: 2rem;
        }

        /* Logo Section */
        .footer-logo {
          flex-shrink: 0;
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
          height: 60px;
          width: auto;
        }

        .logo-mobile {
          display: none;
        }

        /* Info Section */
        .footer-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .contact-label {
          font-weight: 600;
          color: #cbd5e1;
          min-width: 60px;
        }

        .contact-value {
          color: #e2e8f0;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #60a5fa;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .contact-link:hover {
          color: #93c5fd;
        }

        .contact-link svg {
          width: 14px;
          height: 14px;
        }

        /* Policy Links */
        .policy-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid #475569;
        }

        .policy-link {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s ease;
          font-size: 0.875rem;
        }

        .policy-link:hover {
          color: #60a5fa;
        }

        .policy-link.primary {
          font-weight: 600;
          color: #e2e8f0;
        }

        .separator {
          color: #64748b;
        }

        /* Banner Section */
        .footer-banners {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-shrink: 0;
        }

        .banner-link {
          display: block;
          transition: opacity 0.2s ease;
        }

        .banner-link:hover {
          opacity: 0.8;
        }

        .banner-desktop {
          display: block;
          height: 40px;
          width: auto;
        }

        .banner-mobile {
          display: none;
        }

        /* Footer Bottom */
        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid #475569;
        }

        .copyright {
          text-align: center;
        }

        .copyright p {
          margin: 0;
          color: #94a3b8;
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
            gap: 1.5rem;
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