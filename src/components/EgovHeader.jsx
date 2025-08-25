// src/components/layout/EgovHeader.jsx
import { Link as HLink, NavLink as HNavLink, useNavigate as useHNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import * as EgovNet2 from "@/api/egovFetch";
import URL2 from "@/constants/url";
import "@/css/header.css";
import "@/css/modern-styles.css";
import logoImg from "/assets/images/logo_bigp.png";
import logoImgMobile from "/assets/images/logo_bigp.png";
import { getSessionItem as getSI, setSessionItem as setSI } from "@/utils/storage";

// Removed chatIconPng import - using SVG icon instead

import {
  useEffect as useEffect2,
  useMemo as useMemo2,
  useRef as useRef2,
  useState as useState2,
  useCallback as useCallback2,
} from "react";

export default function EgovHeader() {
  // --- Session / user ---
  const sessionToken = getSI("jToken");
  const sessionUser = getSI("loginUser");
  const sessionUserId = sessionUser?.id;
  const sessionUserName = sessionUser?.name;
  const sessionUserSe = sessionUser?.userSe;

  // --- Router ---
  const navigate = useHNavigate();

  // --- UI state ---
  const [isMenuOpen, setIsMenuOpen] = useState2(false);
  const [isHovering, setIsHovering] = useState2(false);
  const [scrolled, setScrolled] = useState2(false);
  const [scrollPct, setScrollPct] = useState2(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState2(false);
  const [mousePos, setMousePos] = useState2({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState2(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState2(false);
  const [lastScrollY, setLastScrollY] = useState2(0);

  // === Chat (전역 FAB + 드로어) ===
  const [isChatOpen, setIsChatOpen] = useState2(false);
  const [unread, setUnread] = useState2(0);
  const [messages, setMessages] = useState2([
    { 
      id: "m0", 
      role: "bot", 
      text: "안녕하세요! 🤖 AI 도우미입니다. 무엇을 도와드릴까요?",
      actions: [],
      citations: []
    },
  ]);
  const [pending, setPending] = useState2(false);
  const [input, setInput] = useState2("");

  // --- Refs ---
  const headerRef = useRef2(null);
  const webMenuRef = useRef2(null);
  const btnAllMenuRef = useRef2(null);
  const hoverTimerRef = useRef2(null);

  const chatRef = useRef2(null);
  const chatListRef = useRef2(null);
  const chatBtnRef = useRef2(null);
  const inputRef = useRef2(null);
  const firstTrapRef = useRef2(null);   // 포커스 트랩 sentinel
  const lastTrapRef = useRef2(null);    // 포커스 트랩 sentinel
  const previouslyFocusedRef = useRef2(null);

  // A11y: 버튼 title 동기화
  const menuBtnTitle = useMemo2(() => (isMenuOpen ? "전체메뉴 닫기" : "전체메뉴 열기"), [isMenuOpen]);
  const chatBtnTitle = useMemo2(() => (isChatOpen ? "챗봇 닫기" : "챗봇 열기"), [isChatOpen]);

  // --- Handlers ---
  const logInHandler = useCallback2(() => {
    navigate(URL2.LOGIN);
    setIsMenuOpen(false);
    document.querySelector(".all_menu.Mobile")?.classList.add("closed");
  }, [navigate]);

  const logOutHandler = useCallback2(() => {
    const requestOptions = { headers: { "Content-type": "application/json", Authorization: sessionToken }, credentials: "include" };
    EgovNet2.requestFetch("/users/logout", requestOptions, () => {
      setSI("loginUser", { id: "" });
      setSI("jToken", null);
      alert("로그아웃되었습니다!");
      navigate(URL2.MAIN);
      setIsMenuOpen(false);
      document.querySelector(".all_menu.Mobile")?.classList.add("closed");
    });
  }, [navigate, sessionToken]);

  const toggleAllMenu = useCallback2(() => setIsMenuOpen((prev) => !prev), []);

  // Hover로 열기/닫기 (지연 닫힘)
  const openAllMenuByHover = useCallback2(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovering(true);
    setIsMenuOpen(true);
  }, []);

  const closeAllMenuByHover = useCallback2(() => {
    setIsHovering(false);
    hoverTimerRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  }, []);

  // === Chat handlers ===
  const toggleChat = useCallback2(() => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      previouslyFocusedRef.current = document.activeElement;
      setTimeout(() => firstTrapRef.current?.focus(), 100);
    } else {
      previouslyFocusedRef.current?.focus();
    }
  }, [isChatOpen]);

  // 액션 버튼 클릭 핸들러
  const handleActionClick = useCallback2((action) => {
    console.log("액션 클릭:", action);
    // URL이 내부 경로인 경우 navigate 사용
    if (action.url.startsWith('/')) {
      navigate(action.url);
    } else {
      // 외부 URL인 경우 새 탭에서 열기
      window.open(action.url, '_blank');
    }
  }, [navigate]);

  const sendMessage = useCallback2(async () => {
    if (!input.trim() || pending) return;

    const userMessage = { 
      id: `m${Date.now()}`, 
      role: "user", 
      text: input,
      actions: [],
      citations: []
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    try {
      // ✅ FastAPI 챗봇 API 호출
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          user: {
            id: "user",
            name: "사용자",
            role: "user"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // ✅ API 응답에서 reply, actions, citations 추출
      const botMessage = { 
        id: `m${Date.now() + 1}`, 
        role: "bot", 
        text: data.reply || "죄송합니다. 응답을 받지 못했습니다.",
        actions: data.actions || [],
        citations: data.citations || []
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error("챗봇 API 호출 오류:", error);
      const errorMessage = { 
        id: `m${Date.now() + 1}`, 
        role: "bot", 
        text: "죄송합니다. 서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
        actions: [],
        citations: []
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setPending(false);
    }
  }, [input, pending]);

  // === Scroll effects ===
  useEffect2(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrolled(scrollTop > 50);
      setScrollPct(Math.min(scrollPercent, 100));
      
      // Header hide/show logic
      const scrollThreshold = 100; // 스크롤 임계값
      const scrollDelta = scrollTop - lastScrollY;
      
      if (scrollTop > scrollThreshold) {
        if (scrollDelta > 10) {
          // 아래로 스크롤 - 헤더 숨기기
          setIsHeaderHidden(true);
        } else if (scrollDelta < -10) {
          // 위로 스크롤 - 헤더 보이기
          setIsHeaderHidden(false);
        }
      } else {
        // 상단에 가까우면 항상 보이기
        setIsHeaderHidden(false);
      }
      
      setLastScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // === Mouse tracking for parallax ===
  useEffect2(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // === Load state ===
  useEffect2(() => {
    setIsLoaded(true);
  }, []);

  // === Chat keyboard shortcuts ===
  useEffect2(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isChatOpen) {
        toggleChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChatOpen, toggleChat]);

  // === Chat auto-scroll ===
  useEffect2(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  // === Focus trap for chat ===
  useEffect2(() => {
    if (!isChatOpen) return;

    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        const focusableElements = chatRef.current?.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isChatOpen]);

  // === Chat portal ===
  const chatPortal = createPortal(
    <div
      ref={chatRef}
      className={`chat-drawer ${isChatOpen ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div className="chat-header">
        <h2 id="chat-title">AI 도우미</h2>
        <button
          ref={chatBtnRef}
          onClick={toggleChat}
          className="chat-close-btn"
          aria-label="챗봇 닫기"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div ref={chatListRef} className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.role}`}>
            <div className="message-content">{msg.text}</div>
            
            {/* 액션 버튼들 (봇 메시지에만 표시) */}
            {msg.role === "bot" && msg.actions && msg.actions.length > 0 && (
              <div className="message-actions">
                {msg.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    className="action-btn"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Citations 정보 (봇 메시지에만 표시) */}
            {msg.role === "bot" && msg.citations && msg.citations.length > 0 && (
              <div className="message-citations">
                <div className="citations-title">📚 참조 문서:</div>
                {msg.citations.map((citation, index) => (
                  <div key={index} className="citation-item">
                    <strong>{citation.source}</strong>: {citation.snippet}...
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {pending && (
          <div className="chat-message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력하세요..."
          disabled={pending}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || pending}
          className="send-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9"></polygon>
          </svg>
        </button>
      </div>

      {/* Focus trap sentinels */}
      <button ref={firstTrapRef} className="focus-trap" tabIndex={0} />
      <button ref={lastTrapRef} className="focus-trap" tabIndex={0} />
    </div>,
    document.body
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`modern-header ${scrolled ? "is-scrolled" : ""} ${isMobileMenuOpen ? "mobile-menu-open" : ""} ${isHeaderHidden ? "header-hidden" : ""}`}
        data-state={isMenuOpen ? "open" : "closed"}
      >


        {/* 상단 스크롤 진행바 */}
        <div className="scroll-progress" aria-hidden style={{ transform: `scaleX(${scrollPct / 100})` }} />

        <div className="header-container">
          {/* 로고 영역 */}
          <div className="logo-section">
            <h1 className="logo">
              <HLink to={URL2.MAIN} className="logo-link" aria-label="홈으로 이동">
                <div className="logo-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea"/>
                        <stop offset="50%" stopColor="#764ba2"/>
                        <stop offset="100%" stopColor="#f093fb"/>
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <rect width="40" height="40" rx="12" fill="url(#logoGradient)" filter="url(#glow)"/>
                    <g fill="white" fillOpacity="0.9">
                      <circle cx="12" cy="15" r="2"/>
                      <circle cx="20" cy="15" r="2"/>
                      <circle cx="28" cy="15" r="2"/>
                      <path d="M8 25h24v3H8z" rx="1.5"/>
                      <path d="M10 20h20v2H10z" rx="1"/>
                    </g>
                    <rect width="40" height="40" rx="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="logo-text">
                  <span className="logo-title">AI CODE MIGRATION</span>
                  <span className="logo-subtitle">전자정부 경량환경</span>
                </div>
              </HLink>
            </h1>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav
            className="desktop-nav"
            role="navigation"
            aria-label="주요 메뉴"
            onMouseEnter={openAllMenuByHover}
            onMouseLeave={closeAllMenuByHover}
          >
            <ul className="nav-list">
              <li className="nav-item">
                <HNavLink to={URL2.ABOUT} className="nav-link">
                  사이트소개
                </HNavLink>
              </li>
              <li className="nav-item">
                <HNavLink to={URL2.SUPPORT_TRANSFORM_INTRO} className="nav-link">
                  AI 변환기
                </HNavLink>
              </li>
              <li className="nav-item">
                <HNavLink to={URL2.SUPPORT_SECURITY_INTRO} className="nav-link">
                  AI 보안기
                </HNavLink>
              </li>
              <li className="nav-item">
                <HNavLink to={URL2.SUPPORT_GUIDE_EGOVFRAMEWORK} className="nav-link">
                  고객지원
                </HNavLink>
              </li>
              {sessionUserSe === "ADM" && (
                <li className="nav-item">
                  <HNavLink to={URL2.ADMIN} className="nav-link">
                    사이트관리
                  </HNavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* 사용자 정보 및 액션 버튼 */}
          <div className="header-actions">
            <div className="user-section">
              {sessionUserId ? (
                <div className="user-info">
                  <div className="user-avatar">
                    <span>{sessionUserName?.charAt(0)}</span>
                  </div>
                  <div className="user-details">
                    <span className="user-name">{sessionUserName}</span>
                    <span className="user-role">{sessionUserSe}</span>
                  </div>
                  <div className="user-actions">
                    {sessionUserSe === "USER" && (
                      <HNavLink to={URL2.MYPAGE} className="action-btn secondary">
                        마이페이지
                      </HNavLink>
                    )}
                    <button onClick={logOutHandler} className="action-btn primary">
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button onClick={logInHandler} className="action-btn secondary">
                    로그인
                  </button>
                  <HNavLink to={URL2.SIGNUP} className="action-btn primary">
                    회원가입
                  </HNavLink>
                </div>
              )}
            </div>

            {/* 모바일 메뉴 토글 */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="모바일 메뉴"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>


          </div>

          {/* 전체메뉴 드롭다운 */}
          <div 
            className={`all-menu-dropdown ${isMenuOpen ? "open" : ""}`}
            onMouseEnter={openAllMenuByHover}
            onMouseLeave={closeAllMenuByHover}
          >
            <div className="all-menu-container">
              <div className="all-menu-content">
                <div className="menu-section">
                  <h3>사이트소개</h3>
                  <ul>
                    <li><HLink to={URL2.ABOUT}>소개</HLink></li>
                    <li><HLink to={URL2.ABOUT_HISTORY}>연혁</HLink></li>
                    <li><HLink to={URL2.ABOUT_ORGANIZATION}>조직도</HLink></li>
                    <li><HLink to={URL2.ABOUT_LOCATION}>찾아오시는 길</HLink></li>
                  </ul>
                </div>
                
                <div className="menu-section">
                  <h3>AI 변환기</h3>
                  <ul>
                    <li><HLink to={URL2.SUPPORT_TRANSFORM_INTRO}>소개</HLink></li>
                    <li><HLink to={URL2.SUPPORT_TRANSFORMATION}>변환</HLink></li>
                    <li><HLink to={URL2.SUPPORT_VIEW_TRANSFORMATION}>변환 이력</HLink></li>
                    <li><HLink to={URL2.SUPPORT_VIEW_TEST}>테스트 이력</HLink></li>
                  </ul>
                </div>
                
                <div className="menu-section">
                  <h3>AI 보안기</h3>
                  <ul>
                    <li><HLink to={URL2.SUPPORT_SECURITY_INTRO}>소개</HLink></li>
                    <li><HLink to={URL2.SUPPORT_SECURITY_SCAN}>보안 검사</HLink></li>
                    <li><HLink to={URL2.SUPPORT_SECURITY_DETECT}>취약점 탐지</HLink></li>
                    <li><HLink to={URL2.SUPPORT_SECURITY_REPORT}>보고서</HLink></li>
                  </ul>
                </div>
                
                <div className="menu-section">
                  <h3>고객지원</h3>
                  <ul>
                    <li><HLink to={URL2.SUPPORT_GUIDE_EGOVFRAMEWORK}>가이드</HLink></li>
                    <li><HLink to={URL2.SUPPORT_GUIDE_CHATBOT}>챗봇</HLink></li>
                    <li><HLink to={URL2.SUPPORT_QNA}>Q&A</HLink></li>
                    <li><HLink to={URL2.SUPPORT_DOWNLOAD}>다운로드</HLink></li>
                  </ul>
                </div>
                
                {sessionUserSe === "ADM" && (
                  <div className="menu-section">
                    <h3>사이트관리</h3>
                    <ul>
                      <li><HLink to={URL2.ADMIN}>관리자 메뉴</HLink></li>
                      <li><HLink to={URL2.ADMIN_NOTICE}>공지사항 관리</HLink></li>
                      <li><HLink to={URL2.ADMIN_FAQ}>FAQ 관리</HLink></li>
                      <li><HLink to={URL2.ADMIN_MEMBER}>회원 관리</HLink></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* 모바일 메뉴 */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li>
                <HNavLink to={URL2.ABOUT} onClick={() => setIsMobileMenuOpen(false)}>
                  사이트소개
                </HNavLink>
              </li>
              <li>
                <HNavLink to={URL2.SUPPORT_TRANSFORM_INTRO} onClick={() => setIsMobileMenuOpen(false)}>
                  AI 변환기
                </HNavLink>
              </li>
              <li>
                <HNavLink to={URL2.SUPPORT_SECURITY_INTRO} onClick={() => setIsMobileMenuOpen(false)}>
                  AI 보안기
                </HNavLink>
              </li>
              <li>
                <HNavLink to={URL2.SUPPORT_GUIDE_EGOVFRAMEWORK} onClick={() => setIsMobileMenuOpen(false)}>
                  고객지원
                </HNavLink>
              </li>
              {sessionUserSe === "ADM" && (
                <li>
                  <HNavLink to={URL2.ADMIN} onClick={() => setIsMobileMenuOpen(false)}>
                    사이트관리
                  </HNavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Chat Portal */}
      {chatPortal}

      <style>{`


        /* Modern Header Styles */
        .modern-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          transform: translateY(0);
        }

        .modern-header.header-hidden {
          transform: translateY(-100%);
        }



        .modern-header.is-scrolled {
          background: rgba(255, 255, 255, 0.99);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }



        /* Scroll Progress */
        .scroll-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform-origin: left;
          z-index: 1001;
        }

        /* Header Container */
        .header-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          gap: 2rem;
          position: relative;
        }

        /* Logo Section */
        .logo-section {
          flex-shrink: 0;
          min-width: 280px;
        }

        .logo {
          margin: 0;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
        }

        .logo-link:hover {
          transform: translateY(-2px);
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        }

        .logo-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        .logo-text {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          min-width: 200px;
        }

        .logo-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #374151;
          line-height: 1.2;
          white-space: nowrap;
        }

        .logo-subtitle {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 3rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: #667eea;
        }

        .nav-link.active {
          color: #667eea;
          font-weight: 600;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* 전체메뉴 드롭다운 */
        .all-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1001;
          max-width: 1200px;
          margin: 0 auto;
        }

        .all-menu-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .all-menu-container {
          padding: 2rem;
        }

        .all-menu-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .menu-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #667eea;
        }

        .menu-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .menu-section li {
          margin-bottom: 0.75rem;
        }

        .menu-section a {
          display: block;
          padding: 0.5rem 0;
          color: #6b7280;
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          border-radius: 4px;
          padding-left: 0.5rem;
        }

        .menu-section a:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.08);
          transform: translateX(4px);
        }

        /* 메뉴 섹션 애니메이션 */
        .menu-section {
          animation: fadeInUp 0.3s ease-out;
        }

        .menu-section:nth-child(1) { animation-delay: 0.1s; }
        .menu-section:nth-child(2) { animation-delay: 0.2s; }
        .menu-section:nth-child(3) { animation-delay: 0.3s; }
        .menu-section:nth-child(4) { animation-delay: 0.4s; }
        .menu-section:nth-child(5) { animation-delay: 0.5s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
        }

        .user-role {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .user-actions {
          display: flex;
          gap: 0.5rem;
        }

        .auth-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.8);
          color: #667eea;
          border: 2px solid #667eea;
        }

        .action-btn.secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 3px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle span {
          width: 20px;
          height: 2px;
          background: #374151;
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        .mobile-menu-toggle:hover span {
          background: #667eea;
        }



        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.99);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav {
          padding: 1.5rem;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-list a {
          display: block;
          padding: 1rem 1.5rem;
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-nav-list a:hover {
          background: rgba(102, 126, 234, 0.08);
          color: #667eea;
        }

        /* Chat Drawer */
        .chat-drawer {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: white;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          transition: right 0.3s ease;
          z-index: 2000;
        }

        .chat-drawer.open {
          right: 0;
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .chat-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .chat-close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .chat-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .chat-close-btn svg {
          width: 20px;
          height: 20px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-message {
          display: flex;
          gap: 0.5rem;
        }

        .chat-message.user {
          justify-content: flex-end;
        }

        .chat-message.bot {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .chat-message.user .message-content {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .chat-message.bot .message-content {
          background: #f3f4f6;
          color: #374151;
        }

        .typing-indicator {
          display: flex;
          gap: 0.25rem;
          align-items: center;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9ca3af;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .chat-input {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .chat-input input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .chat-input input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-btn svg {
          width: 16px;
          height: 16px;
        }

        .focus-trap {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* 액션 버튼 스타일 */
        .message-actions {
          margin-top: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          border-radius: 1rem;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        /* Citations 스타일 */
        .message-citations {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #666;
          font-style: italic;
        }

        .citations-title {
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .citation-item {
          padding: 0.25rem 0.5rem;
          background: rgba(0,0,0,0.05);
          border-radius: 0.25rem;
          margin-bottom: 0.125rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .all-menu-dropdown {
            display: none;
          }

          .header-container {
            padding: 0 1rem;
          }

          .logo-section {
            min-width: 200px;
          }

          .logo-title {
            font-size: 1rem;
          }

          .logo-subtitle {
            font-size: 0.7rem;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .header-container {
            padding: 0 1rem;
          }

          .user-info {
            display: none;
          }

          .auth-buttons {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            height: 70px;
          }

          .logo-text {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.3rem;
          }

          .logo-title {
            font-size: 0.9rem;
          }

          .logo-subtitle {
            font-size: 0.6rem;
          }

          .chat-drawer {
            width: 100%;
            right: -100%;
          }


        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 0.5rem;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
          }

          .logo-title {
            font-size: 0.8rem;
          }

          .logo-subtitle {
            font-size: 0.5rem;
          }

          .logo-text {
            min-width: 150px;
            flex-direction: row;
            align-items: center;
            gap: 0.2rem;
          }
        }
      `}</style>
    </>
  );
}
