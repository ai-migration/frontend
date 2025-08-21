import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import URL from "@/constants/url";

function GlobalNoticeIcon() {
  const [isVisible, setIsVisible] = useState(false);
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    // Show the icon after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Link 
        to={URL.INFORM_NOTICE} 
        className={`global-notice-icon ${isVisible ? 'visible' : ''}`}
        aria-label="공지사항"
        title="공지사항"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
        {noticeCount > 0 && <span className="notice-badge">{noticeCount}</span>}
      </Link>

      <style>{`
        .global-notice-icon {
          position: fixed;
          right: 30px;
          bottom: 8rem;
          z-index: 999;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(100px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .global-notice-icon.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .global-notice-icon:hover {
          background: linear-gradient(135deg, #5a67d8, #6b46c1);
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
        }

        .global-notice-icon svg {
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .notice-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff4757;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .global-notice-icon {
            right: 20px;
            bottom: 7rem;
            width: 50px;
            height: 50px;
          }
          
          .global-notice-icon svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </>
  );
}

export default GlobalNoticeIcon;
