import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import EgovSignupAgree from "@/pages/signup/EgovSignupAgree";
import EgovSignupForm from "@/pages/signup/EgovSignupForm";

import URL from "@/constants/url";

function EgovSignup(props) {
  console.group("EgovSignup");
  console.log("[Start] EgovSignup ------------------------------");
  console.log("EgovSignup [props] : ", props);

  console.log("------------------------------EgovSignup [End]");
  console.groupEnd("EgovSignup");

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
            <span className="breadcrumb-current">회원가입</span>
          </div>
        </nav>

        <div className="modern-layout">
          <Outlet />
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

        .breadcrumb-home {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-md);
          transition: all 0.2s ease;
        }

        .breadcrumb-home:hover {
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
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: calc(100vh - 200px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modern-page-wrapper {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EgovSignup;
