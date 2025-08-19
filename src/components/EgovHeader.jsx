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
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => { if (!isHovering) setIsMenuOpen(false); }, 180);
  }, [isHovering]);

  const handleMenuMouseEnter = useCallback2(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovering(true);
    setIsMenuOpen(true);
  }, []);
  const handleMenuMouseLeave = useCallback2(() => {
    setIsHovering(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setIsMenuOpen(false), 120);
  }, []);

  // 바깥 클릭 시 닫기 (전체메뉴)
  useEffect2(() => {
    const onClickOutside = (e) => {
      if (!isMenuOpen) return;
      const headerEl = headerRef.current;
      if (headerEl && !headerEl.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isMenuOpen]);

  // ESC로 닫기 (전체메뉴 + 챗봇)
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
      setScrolled(y > 4);
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 버튼 aria 업데이트
  useEffect2(() => { if (btnAllMenuRef.current) btnAllMenuRef.current.title = menuBtnTitle; }, [menuBtnTitle]);

  // 클래스 동기화 (.closed / .active)
  useEffect2(() => {
    const menuEl = webMenuRef.current;
    const btnEl = btnAllMenuRef.current;
    if (menuEl) menuEl.classList.toggle("closed", !isMenuOpen);
    if (btnEl) btnEl.classList.toggle("active", isMenuOpen);
  }, [isMenuOpen]);

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

  // Chat 열릴 때 포커스/미읽음/포커스 트랩 준비
  useEffect2(() => {
    if (isChatOpen) {
      setUnread(0);
      previouslyFocusedRef.current = document.activeElement;
      setTimeout(() => {
        inputRef.current?.focus();
        chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: "smooth" });
      }, 10);
    } else {
      // 닫히면 포커스 복구
      previouslyFocusedRef.current?.focus?.();
    }
  }, [isChatOpen]);

  // 메시지 자동 스크롤
  useEffect2(() => {
    if (!chatListRef.current) return;
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages.length]);

  // 포커스 트랩: Tab 순환
  const trapKeyDown = useCallback2((e) => {
    if (!isChatOpen || e.key !== "Tab") return;
    const focusables = chatRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [isChatOpen]);

  // === Chat Action UI =====================
  const getActionTheme = (url = "") => {
    if (/\/support\/transform/i.test(url)) return "t-transform";
    if (/\/support\/security/i.test(url)) return "t-security";
    if (/\/support\/guide/i.test(url) || /egov/i.test(url)) return "t-guide";
    if (/\/inform/i.test(url)) return "t-inform";
    if (/download/i.test(url)) return "t-download";
    return "t-default";
  };

  const Icon = ({ theme }) => {
    if (theme === "t-transform")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 7h10l-2-2 1.4-1.4L18.8 8l-6.4 4.4L11 11l2-2H3zM21 17H11l2 2-1.4 1.4L5.2 16l6.4-4.4L13 13l-2 2h10z" />
        </svg>
      );
    if (theme === "t-security")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l7 3v6c0 5-3.6 9.7-7 11-3.4-1.3-7-6-7-11V5l7-3zm0 4l-4 1.7V11c0 3.5 2.2 7.1 4 8 1.8-.9 4-4.5 4-8V7.7L12 6z" />
        </svg>
      );
    if (theme === "t-guide")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 4h9a4 4 0 014 4v12H8a4 4 0 01-4-4V4zm9 2H6v10a2 2 0 002 2h9V8a2 2 0 00-2-2zM8 6h1a3 3 0 013 3v1H8V6z" />
        </svg>
      );
    if (theme === "t-download")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3v10l3-3 1.4 1.4-5.4 5.4-5.4-5.4L7 10l3 3V3h2zm-7 16h14v2H5v-2z" />
        </svg>
      );
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5h4v2h-6V7h2z" />
      </svg>
    );
  };

  const ChatActionBar = ({ actions = [] }) => {
    if (!Array.isArray(actions) || actions.length === 0) return null;
    return (
      <div className="modern-action-bar" role="list" aria-label="빠른 이동">
        <div className="action-bar-title">
          <span className="action-icon">🔗</span>
          관련 페이지로 이동
        </div>
        <div className="action-buttons">
          {actions.map((a, idx) => {
            const theme = getActionTheme(a.url);
            const external = /^https?:\/\//i.test(a.url);
            if (external) {
              return (
                <a
                  key={idx}
                  className={`action-chip ${theme}`}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  role="listitem"
                  aria-label={`${a.label} (새 창)`}
                  onClick={closeChat}
                >
                  <Icon theme={theme} />
                  <span className="chip-label">{a.label}</span>
                  <svg className="external-icon" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15,3 21,3 21,9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              );
            }
            return (
              <button
                key={idx}
                type="button"
                className={`action-chip ${theme}`}
                role="listitem"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(a.url);
                  closeChat();
                }}
              >
                <Icon theme={theme} />
                <span className="chip-label">{a.label}</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // === Chat: 전송 (Agent / RAG 연동) ===
  const sendMessage = useCallback2(
    async (e) => {
      e?.preventDefault?.();
      const text = input.trim();
      if (!text || pending) return;

      const myMsg = { id: `m-${Date.now()}`, role: "me", text };
      setMessages((prev) => [...prev, myMsg]);
      setInput("");
      setPending(true);

      try {
        // ✅ 실제 백엔드 연동
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s 타임아웃

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            user: { id: sessionUserId, name: sessionUserName, role: sessionUserSe },
          }),
          credentials: "include",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const reply = data?.reply ?? "응답을 받았지만 내용이 비어 있어요.";
        const actions = Array.isArray(data?.actions) ? data.actions : [];
        const citations = Array.isArray(data?.citations) ? data.citations : [];

        const botMsg = { id: `b-${Date.now()}`, role: "bot", text: reply, actions, citations };
        setMessages((prev) => [...prev, botMsg]);
      } catch {
        // ❗ 폴백 (연결 오류)
        const botMsg = {
          id: `b-${Date.now()}`,
          role: "bot",
          text: "잠시 후 다시 시도해주세요. (연결 오류)",
          actions: [
            { label: "변환 하기", url: "/support/transform/transformation" },
            { label: "AI 보안 검사", url: "/support/security/scan" },
            { label: "전자정부프레임워크 가이드", url: "/support/guide/egovframework" },
          ],
        };
        setMessages((prev) => [...prev, botMsg]);
      } finally {
        setPending(false);
        if (!isChatOpen) setUnread((n) => n + 1);
      }
    },
    [input, pending, isChatOpen, sessionUserId, sessionUserName, sessionUserSe]
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`modern-header ${scrolled ? "is-scrolled" : ""} ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
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
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="url(#logoGradient)"/>
                    <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z" fill="white"/>
                    <defs>
                      <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0000FF"/>
                        <stop offset="1" stopColor="#4169E1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="logo-text">
                  <span className="logo-title">AI CODE MIGRATION</span>
                  <span className="logo-subtitle">KT AIVLE AI</span>
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
                  <span>사이트소개</span>
                  <div className="nav-indicator"></div>
                </HNavLink>
              </li>
              <li className="nav-item">
                <HNavLink to={URL2.SUPPORT_TRANSFORM_INTRO} className="nav-link">
                  <span>AI 변환기</span>
                  <div className="nav-indicator"></div>
                </HNavLink>
              </li>
              <li className="nav-item">
                <HNavLink to={URL2.SUPPORT_SECURITY_INTRO} className="nav-link">
                  <span>AI 보안기</span>
                  <div className="nav-indicator"></div>
                </HNavLink>
              </li>
              <li className="nav-item">
                <HNavLink to={URL2.SUPPORT_GUIDE_EGOVFRAMEWORK} className="nav-link">
                  <span>고객지원</span>
                  <div className="nav-indicator"></div>
                </HNavLink>
              </li>
              {sessionUserSe === "ADM" && (
                <li className="nav-item">
                  <HNavLink to={URL2.ADMIN} className="nav-link">
                    <span>사이트관리</span>
                    <div className="nav-indicator"></div>
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
              aria-expanded={isMobileMenuOpen}
              aria-label="모바일 메뉴 토글"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* 데스크톱 전체메뉴 버튼 */}
            <button
              ref={btnAllMenuRef}
              type="button"
              className="all-menu-btn"
              title={menuBtnTitle}
              aria-expanded={isMenuOpen}
              aria-controls="allmenu-web"
              onClick={toggleAllMenu}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span>전체메뉴</span>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
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
        </div>

        {/* All Menu (WEB) - Modern Mega Menu */}
        <div
          id="allmenu-web"
          ref={webMenuRef}
          className={`mega-menu ${isMenuOpen ? "open" : "closed"}`}
          aria-hidden={!isMenuOpen}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="mega-menu-content">
            <div className="mega-menu-grid">
              <div className="mega-menu-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9,22 9,12 15,12 15,22"></polyline>
                    </svg>
                  </div>
                  <h3>사이트소개</h3>
                </div>
                <ul className="section-links">
                  <li><HNavLink to={URL2.ABOUT_SITE}>소개</HNavLink></li>
                  <li><HNavLink to={URL2.ABOUT_HISTORY}>연혁</HNavLink></li>
                  <li><HNavLink to={URL2.ABOUT_ORGANIZATION}>조직소개</HNavLink></li>
                  <li><HNavLink to={URL2.ABOUT_LOCATION}>찾아오시는 길</HNavLink></li>
                </ul>
              </div>

              <div className="mega-menu-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="7.5,4.21 12,6.81 16.5,4.21"></polyline>
                      <polyline points="7.5,19.79 7.5,14.6 3,12"></polyline>
                      <polyline points="21,12 16.5,14.6 16.5,19.79"></polyline>
                    </svg>
                  </div>
                  <h3>AI 변환기</h3>
                </div>
                <ul className="section-links">
                  <li><HNavLink to="/support/transform/intro">기능 소개</HNavLink></li>
                  <li><HNavLink to="/support/transform/transformation">변환 하기</HNavLink></li>
                  <li><HNavLink to="/support/transform/view_transform">변환 이력 조회</HNavLink></li>
                  <li><HNavLink to="/support/transform/view_test">테스트 이력 조회</HNavLink></li>
                  <li><HNavLink to="/support/transform/download">다운로드</HNavLink></li>
                </ul>
              </div>

              <div className="mega-menu-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3>AI 보안기</h3>
                </div>
                <ul className="section-links">
                  <li><HNavLink to="/support/security/intro">기능 소개</HNavLink></li>
                  <li><HNavLink to="/support/security/scan">AI 보안 검사</HNavLink></li>
                  <li><HNavLink to="/support/security/vulnerability">보안 취약점탐지</HNavLink></li>
                  <li><HNavLink to="/support/security/report">보안 점검결과</HNavLink></li>
                  <li><HNavLink to="/support/security/report_detail">다운로드</HNavLink></li>
                </ul>
              </div>

              <div className="mega-menu-section">
                <div className="section-header">
                  <div className="section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6-6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h3>고객지원</h3>
                </div>
                <ul className="section-links">
                  <li><HNavLink to="/support/guide/egovframework">전자정부프레임워크 가이드</HNavLink></li>
                  <li><HNavLink to="/intro">정보마당</HNavLink></li>
                  <li><HNavLink to="/inform">알림마당</HNavLink></li>
                </ul>
              </div>

              {sessionUserSe === "ADM" && (
                <div className="mega-menu-section admin-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <h3>사이트관리</h3>
                  </div>
                  <ul className="section-links">
                    <li><HNavLink to={URL2.ADMIN_NOTICE}>공지사항 관리</HNavLink></li>
                    <li><HNavLink to={URL2.ADMIN_FAQ}>FAQ 관리</HNavLink></li>
                    <li><HNavLink to={URL2.ADMIN_QNA}>Q&A 관리</HNavLink></li>
                    <li><HNavLink to={URL2.ADMIN_MEMBERS}>회원 관리</HNavLink></li>
                    <li><HNavLink to={URL2.ADMIN_MANAGER}>관리자 관리</HNavLink></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* === 전역 Floating Chat Button (FAB) === */}
      {createPortal(
        <button
          ref={chatBtnRef}
          type="button"
          className={`modern-chat-fab ${isChatOpen ? "active" : ""}`}
          title={chatBtnTitle}
          aria-label={chatBtnTitle}
          aria-expanded={isChatOpen}
          aria-controls="ai-chat-panel"
          onClick={() => {
            previouslyFocusedRef.current = chatBtnRef.current;
            toggleChat();
          }}
        >
          <div className="fab-icon-container">
            <svg className="fab-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="12" r="1" fill="currentColor"/>
              <circle cx="15" cy="12" r="1" fill="currentColor"/>
              <circle cx="12" cy="9" r="1" fill="currentColor"/>
            </svg>
            <div className="fab-pulse-ring"></div>
            <div className="fab-pulse-ring-2"></div>
          </div>
          {unread > 0 && <span className="modern-badge">{unread > 99 ? "99+" : unread}</span>}
        </button>,
        document.body
      )}

      {/* === Chat Panel: Portal + Focus Trap === */}
      {createPortal(
        <section
          id="ai-chat-panel"
          ref={chatRef}
          className={`modern-chat-panel ${isChatOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="AI 챗봇"
          onKeyDown={trapKeyDown}
        >
          {/* focus trap sentinels */}
          

          <header className="modern-chat-head">
            <div className="chat-head-left">
              <div className="chat-head-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div className="icon-glow"></div>
              </div>
              <div className="chat-title-section">
                <strong>전자정부 AI 도우미</strong>
                <span className="chat-status" aria-live="polite">
                  <span className="status-dot"></span>
                  온라인
                </span>
              </div>
            </div>
            <div className="chat-head-right">
              <button className="modern-chat-close-btn" onClick={() => { closeChat(); previouslyFocusedRef.current?.focus?.(); }} aria-label="챗봇 닫기">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          <div className="modern-chat-body" ref={chatListRef}>
            {messages.map((m) => (
              <div key={m.id} className={`modern-chat-msg ${m.role}`}>
                <div className="chat-message-container">
                  {/* 답변 텍스트 */}
                  <div className="modern-bubble">{m.text}</div>
                  
                  {/* 네비게이션 버튼들 (봇 메시지에만 표시) */}
                  {m.role === "bot" && <ChatActionBar actions={m.actions} />}
                  
                  {/* 참고 근거 (봇 메시지에만 표시) */}
                  {m.role === "bot" && Array.isArray(m.citations) && m.citations.length > 0 && (
                    <div className="modern-citations">
                      <details className="citations-details">
                        <summary className="citations-summary">
                          <span className="citations-icon">📚</span>
                          참고 근거 ({m.citations.length}개)
                          <span className="citations-toggle">▼</span>
                        </summary>
                        <div className="citations-content">
                          {m.citations.map((c, i) => (
                            <div key={i} className="citation-item">
                              <div className="citation-source">{c.source}</div>
                              <div className="citation-snippet">{c.snippet}</div>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {pending && (
              <div className="modern-chat-msg bot">
                <div className="modern-bubble typing">
                  <div className="typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="modern-chat-input" onSubmit={sendMessage}>
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                placeholder="전자정부 서비스에 대해 궁금한 점을 물어보세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="메시지 입력"
              />
              <button type="submit" disabled={pending || !input.trim()} aria-label="전송" className="send-button">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                </svg>
              </button>
            </div>
          </form>

          
        </section>,
        document.body
      )}
    </>
  );
}
