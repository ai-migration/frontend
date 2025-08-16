// src/components/layout/EgovHeader.jsx
import { Link as HLink, NavLink as HNavLink, useNavigate as useHNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import * as EgovNet2 from "@/api/egovFetch";
import URL2 from "@/constants/url";
import logoImg from "/assets/images/logo_bigp.png";
import logoImgMobile from "/assets/images/logo_bigp.png";
import { getSessionItem as getSI, setSessionItem as setSI } from "@/utils/storage";

import chatIconPng from "/src/assets/images/due.jpg";

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
  const [scrolled, setScrolled] = useState2(false);
  const [scrollPct, setScrollPct] = useState2(0);

  // === Chat (전역 FAB + 드로어) ===
  const [isChatOpen, setIsChatOpen] = useState2(false);
  const [unread, setUnread] = useState2(0);
  const [messages, setMessages] = useState2([
    { id: "m0", role: "bot", text: "안녕하세요! 🤖 AI 도우미입니다. 무엇을 도와드릴까요?" },
  ]);
  const [pending, setPending] = useState2(false);
  const [input, setInput] = useState2("");

  // --- Refs ---
  const headerRef = useRef2(null);
  const mobileMenuRef = useRef2(null);
  const chatRef = useRef2(null);
  const chatListRef = useRef2(null);
  const chatBtnRef = useRef2(null);
  const inputRef = useRef2(null);
  const previouslyFocusedRef = useRef2(null);

  // A11y: 버튼 title 동기화
  const menuBtnTitle = useMemo2(() => (isMenuOpen ? "메뉴 닫기" : "메뉴 열기"), [isMenuOpen]);
  const chatBtnTitle = useMemo2(() => (isChatOpen ? "챗봇 닫기" : "챗봇 열기"), [isChatOpen]);

  // --- Handlers ---
  const logInHandler = useCallback2(() => {
    navigate(URL2.LOGIN);
    setIsMenuOpen(false);
  }, [navigate]);

  const logOutHandler = useCallback2(() => {
    const requestOptions = { headers: { "Content-type": "application/json", Authorization: sessionToken }, credentials: "include" };
    EgovNet2.requestFetch("/users/logout", requestOptions, () => {
      setSI("loginUser", { id: "" });
      setSI("jToken", null);
      alert("로그아웃되었습니다!");
      navigate(URL2.MAIN);
      setIsMenuOpen(false);
    });
  }, [navigate, sessionToken]);

  const toggleMobileMenu = useCallback2(() => setIsMenuOpen((prev) => !prev), []);

  // 바깥 클릭 시 모바일 메뉴 닫기
  useEffect2(() => {
    const onClickOutside = (e) => {
      if (!isMenuOpen) return;
      const headerEl = headerRef.current;
      if (headerEl && !headerEl.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isMenuOpen]);

  // ESC로 닫기 (모바일 메뉴 + 챗봇)
  useEffect2(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        if (isChatOpen) {
          setIsChatOpen(false);
          previouslyFocusedRef.current?.focus?.();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isChatOpen]);

  // 스크롤 상태 (헤더 음영/축소 + 진행바)
  useEffect2(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // === Chat: 열기/닫기 & 바깥 클릭 닫기 ===
  const toggleChat = useCallback2(() => setIsChatOpen((v) => !v), []);
  const closeChat = useCallback2(() => setIsChatOpen(false), []);

  useEffect2(() => {
    const onClickOutside = (e) => {
      if (!isChatOpen) return;
      const panel = chatRef.current;
      const btn = chatBtnRef.current;
      if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
        setIsChatOpen(false);
        previouslyFocusedRef.current?.focus?.();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isChatOpen]);

  // Chat 열릴 때 포커스/미읽음 처리
  useEffect2(() => {
    if (isChatOpen) {
      setUnread(0);
      previouslyFocusedRef.current = document.activeElement;
      setTimeout(() => {
        inputRef.current?.focus();
        chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: "smooth" });
      }, 10);
    } else {
      previouslyFocusedRef.current?.focus?.();
    }
  }, [isChatOpen]);

  // 메시지 자동 스크롤
  useEffect2(() => {
    if (!chatListRef.current) return;
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages.length]);

  // Chat message handler
  const sendMessage = useCallback2(async (e) => {
    e.preventDefault();
    if (!input.trim() || pending) return;

    const userMsg = { id: `u${Date.now()}`, role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPending(true);

    try {
      // Simulate bot response
      setTimeout(() => {
        const botMsg = {
          id: `b${Date.now()}`,
          role: "bot",
          text: "감사합니다! 더 도움이 필요하시면 언제든 말씀해 주세요.",
          actions: [
            { label: "사이트 소개", url: URL2.ABOUT },
            { label: "AI 변환기", url: URL2.SUPPORT_TRANSFORM_INTRO },
            { label: "고객지원", url: URL2.SUPPORT_GUIDE_EGOVFRAMEWORK }
          ]
        };
        setMessages((prev) => [...prev, botMsg]);
        setPending(false);
      }, 1000);
    } catch (error) {
      console.error("Chat error:", error);
      setPending(false);
    }
  }, [input, pending]);

  // Navigation items
  const navigationItems = [
    { to: URL2.ABOUT, label: "사이트소개", children: [
      { to: URL2.ABOUT_SITE, label: "소개" },
      { to: URL2.ABOUT_HISTORY, label: "연혁" },
      { to: URL2.ABOUT_ORGANIZATION, label: "조직소개" },
      { to: URL2.ABOUT_LOCATION, label: "찾아오시는 길" }
    ]},
    { to: URL2.SUPPORT_TRANSFORM_INTRO, label: "AI 변환기", children: [
      { to: "/support/transform/intro", label: "기능 소개" },
      { to: "/support/transform/transformation", label: "변환 하기" },
      { to: "/support/transform/view_transform", label: "변환 이력 조회" },
      { to: "/support/transform/download", label: "다운로드" }
    ]},
    { to: URL2.SUPPORT_SECURITY_INTRO, label: "AI 보안기", children: [
      { to: "/support/security/intro", label: "기능 소개" },
      { to: "/support/security/scan", label: "AI 보안 검사" },
      { to: "/support/security/vulnerability", label: "보안 취약점탐지" },
      { to: "/support/security/report", label: "보안 점검결과" }
    ]},
    { to: URL2.SUPPORT_GUIDE_EGOVFRAMEWORK, label: "고객지원", children: [
      { to: "/support/guide/egovframework", label: "전자정부프레임워크 가이드" },
      { to: "/intro", label: "정보마당" },
      { to: "/inform", label: "알림마당" }
    ]}
  ];

  // Add admin menu if user is admin
  if (sessionUserSe === "ADM") {
    navigationItems.push({
      to: URL2.ADMIN,
      label: "사이트관리",
      children: [
        { to: URL2.ADMIN_NOTICE, label: "공지사항 관리" },
        { to: URL2.ADMIN_FAQ, label: "FAQ 관리" },
        { to: URL2.ADMIN_MEMBERS, label: "회원 관리" },
        { to: URL2.ADMIN_MANAGER, label: "관리자 관리" }
      ]
    });
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: `${scrollPct}%`, 
          height: '3px', 
          background: 'var(--primary-blue)', 
          zIndex: 'var(--z-tooltip)',
          transition: 'width 0.1s ease'
        }} 
      />

      {/* Header */}
      <header 
        ref={headerRef} 
        className={`header ${scrolled ? 'scrolled' : ''}`}
        role="banner"
      >
        <div className="inner">
          {/* Logo */}
          <h1 className="logo">
            <HLink to={URL2.MAIN} aria-label="홈으로 이동">
              <img 
                src={logoImg} 
                alt="전자정부 표준프레임워크" 
                className="pc" 
              />
              <img 
                src={logoImgMobile} 
                alt="전자정부 표준프레임워크" 
                className="m" 
              />
            </HLink>
          </h1>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav" role="navigation" aria-label="주요 메뉴">
            <ul>
              {navigationItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <HNavLink 
                    to={item.to} 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  >
                    {item.label}
                  </HNavLink>
                  {item.children && (
                    <div className="sub-menu">
                      <ul>
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <HNavLink 
                              to={child.to}
                              className={({ isActive }) => isActive ? 'sub-link active' : 'sub-link'}
                            >
                              {child.label}
                            </HNavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User Area & Mobile Menu Toggle */}
          <div className="header-actions">
            {/* User Info */}
            <div className="user-info" aria-live="polite">
              {sessionUserId ? (
                <div className="user-logged-in">
                  <span className="user-name">{sessionUserName}</span>
                  <div className="user-actions">
                    {sessionUserSe === "USER" && (
                      <HNavLink 
                        to={URL2.MYPAGE} 
                        className={({ isActive }) => isActive ? 'btn btn-outline active' : 'btn btn-outline'}
                      >
                        마이페이지
                      </HNavLink>
                    )}
                    <button onClick={logOutHandler} className="btn btn-outline">
                      로그아웃
                    </button>
                  </div>
                </div>
              ) : (
                <div className="user-actions">
                  <button onClick={logInHandler} className="btn btn-outline">
                    로그인
                  </button>
                  <HNavLink 
                    to={URL2.SIGNUP} 
                    className="btn btn-primary"
                  >
                    회원가입
                  </HNavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
              aria-label={menuBtnTitle}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav 
          id="mobile-nav"
          ref={mobileMenuRef}
          className={`nav mobile-nav ${isMenuOpen ? 'open' : ''}`}
          role="navigation" 
          aria-label="모바일 메뉴"
          aria-hidden={!isMenuOpen}
        >
          <div className="mobile-nav-content">
            {/* Mobile User Section */}
            <div className="mobile-user-section">
              {sessionUserId ? (
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    👤
                  </div>
                  <div className="user-details">
                    <span className="user-name">{sessionUserName}</span>
                    <span className="user-role">{sessionUserSe}</span>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <button onClick={logInHandler} className="btn btn-primary">
                    로그인
                  </button>
                  <HNavLink to={URL2.SIGNUP} className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>
                    회원가입
                  </HNavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Items */}
            <ul className="mobile-nav-list">
              {navigationItems.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  <HNavLink 
                    to={item.to} 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </HNavLink>
                  {item.children && (
                    <ul className="mobile-sub-menu">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <HNavLink 
                            to={child.to}
                            className="mobile-sub-link"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </HNavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile User Actions */}
            {sessionUserId && (
              <div className="mobile-user-actions">
                {sessionUserSe === "USER" && (
                  <HNavLink 
                    to={URL2.MYPAGE} 
                    className="btn btn-outline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    마이페이지
                  </HNavLink>
                )}
                <button onClick={logOutHandler} className="btn btn-outline">
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Overlay */}
        {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />}
      </header>

      {/* === 전역 Floating Chat Button (FAB) === */}
      {createPortal(
        <button
          ref={chatBtnRef}
          type="button"
          className={`chat-fab ${isChatOpen ? "active" : ""}`}
          title={chatBtnTitle}
          aria-label={chatBtnTitle}
          aria-expanded={isChatOpen}
          aria-controls="ai-chat-panel"
          onClick={() => {
            previouslyFocusedRef.current = chatBtnRef.current;
            toggleChat();
          }}
        >
          <img src={chatIconPng} alt="AI 챗봇" />
          {unread > 0 && <span className="badge">{unread > 99 ? "99+" : unread}</span>}
        </button>,
        document.body
      )}

      {/* === Chat Panel === */}
      {createPortal(
        <section
          id="ai-chat-panel"
          ref={chatRef}
          className={`chat-panel ${isChatOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="AI 챗봇"
        >
          <header className="chat-header">
            <div className="chat-title">
              <span className="chat-icon">🤖</span>
              <strong>AI 도우미</strong>
              <span className="chat-status">● 온라인</span>
            </div>
            <button 
              className="chat-close" 
              onClick={() => { 
                closeChat(); 
                previouslyFocusedRef.current?.focus?.(); 
              }} 
              aria-label="챗봇 닫기"
            >
              ✕
            </button>
          </header>

          <div className="chat-body" ref={chatListRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chat-message ${m.role}`}>
                <div className="message-bubble">{m.text}</div>
                {m.role === "bot" && m.actions && (
                  <div className="action-buttons">
                    {m.actions.map((action, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="action-btn"
                        onClick={() => {
                          navigate(action.url);
                          closeChat();
                        }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {pending && (
              <div className="chat-message bot">
                <div className="message-bubble typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>

          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              placeholder="메시지를 입력하세요…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="메시지 입력"
              className="chat-input"
            />
            <button 
              type="submit" 
              disabled={pending || !input.trim()} 
              aria-label="전송"
              className="chat-send-btn"
            >
              📤
            </button>
          </form>
        </section>,
        document.body
      )}
    </>
  );
}
